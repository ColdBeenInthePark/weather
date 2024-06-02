import { StatusBar } from 'expo-status-bar';
import {ScrollView, Text, View, Image } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../assets/styleSheet';
import {useContext, useEffect, useState} from "react";
import getLocation from "../network/getLocation";
import getDate from "../network/getDate";
import {getWeatherInfoWithLocation, getWeatherInfoWithCode} from "../network/getWeatherInfo";
import {getCityCode, getRegionCode} from "../network/getCityCode";
import {getSensibleTemp} from "../network/getPercTemp";
import {renderDate, renderIconPTY, renderIconSKY, renderTemp} from "../render/render";
import {getRecommendClothes} from "../network/dresses";
import {SearchContext} from "../context/SearchContext";
import {LoadingContext} from "../context/LoadingContext";


export default function Home() {
  const [location, setLocation] = useState({ region: "", city: "", district: "", error: false, latitude: null, longitude: null })
  const [date, setDate] = useState({ date: "", dayOfWeek: "", hour: "" })
  const {loading, setLoading} = useContext(LoadingContext)
  const [weatherInformation, setWeatherInformation] = useState()
  const [currentTemp, setCurrentTemp] = useState()
  const [temp, setTemp] = useState({current : null, TMX : null, TMN: null, PTY: null, WSD: null})
  const [percTemp, setPercTemp] = useState()
  const [recommendClothes, setRecommendClothes] = useState({OUTER : null, TOP : null, BOTTOM : null})
  const [weatherByHour, setWeatherByHour] = useState([])
  const [nextTwoDaysWeather, setNextTwoDaysWeather] = useState([])
  const [dayThreeToSeven, setDayThreeToSeven] = useState([])
  const {search} = useContext(SearchContext)


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      setDate(getDate());

      const userLocation = await getLocation(search);
      setLocation(userLocation);

      const getWeatherInformation = await getWeatherInfoWithLocation(1, userLocation.latitude, userLocation.longitude, );
      const getCurrentTemp = await getWeatherInfoWithLocation(0, userLocation.latitude, userLocation.longitude, );

      const cityCode = getCityCode(userLocation.city)
      const regionCode = getRegionCode(userLocation.region)

      process3To10(await getWeatherInfoWithCode(1, cityCode), await getWeatherInfoWithCode(0, regionCode))
      setWeatherInformation(getWeatherInformation)
      setCurrentTemp(getCurrentTemp)
    };

    fetchData();
  }, [search]);

  useEffect(() => {
    if (weatherInformation) { segmentData(weatherInformation) }
  }, [weatherInformation]);

  useEffect(() => {
    if (currentTemp) { bindingCurrentTemp() }
  }, [currentTemp]);


  async function segmentData(weatherInformation) {

    const splitIndex = Math.ceil(weatherInformation.length / 3);
    const firstThird = weatherInformation.slice(0, splitIndex);
    const remainingTwoThirds = weatherInformation.slice(splitIndex);

    await handleFirstSegmentData(firstThird);
    await handleSecondSegmentData(remainingTwoThirds);
  }

  function handleFirstSegmentData(data) {
    let obj = {date: "", TMP: null, PTY: null}
    data.forEach(item => {
      if (item.category === "TMP" && obj.TMP === null) {obj.TMP = item.fcstValue }
      else if (item.category === "PTY" && obj.PTY === null) {obj.PTY = item.fcstValue }
      else if (item.category === "TMN") { setTemp(prevState => ({ ...prevState, TMN: item.fcstValue })); }
      else if (item.category === "TMX") {setTemp(prevState => ({...prevState, TMX: item.fcstValue })); }

      if(obj.TMP !== null && obj.PTY !== null) {
        obj.date = item.fcstTime.slice(0,2) + "시"
        const updatedObj = { ...obj };
        if(parseInt(item.fcstTime) >= parseInt(date.hour)) {
          setWeatherByHour(prevState => [...prevState, updatedObj]);
        }
        obj = { date: "", TMP: null, PTY: null };
      }
    });
  }

  function handleSecondSegmentData(data) {
    let newData = { date : "", SKY: null, POP: null, TMX : null, TMN : null, PTY: null };
    data.forEach(item => {
      if (item.category === "TMN" && newData.TMN === null) { newData.TMN = item.fcstValue }
      else if (item.category === "TMX" && newData.TMX === null) { newData.TMX = item.fcstValue }
      else if (item.category === "SKY" && newData.SKY === null) { newData.SKY = item.fcstValue }
      else if (item.category === "POP" && newData.POP === null) { newData.POP = item.fcstValue }
      else if (item.category === "PTY" && newData.PTY === null) { newData.PTY = item.fcstValue }

      if (newData.TMN !== null && newData.TMX !== null && newData.SKY !== null && newData.POP !== null && newData.PTY !== null) {
        newData.date = item.fcstDate.slice(4,8)
        setNextTwoDaysWeather(prevState => [...prevState, newData]);
        newData = { date: "", SKY: null, TMX : null, TMN : null, POP: null, PTY: null};
      }
    });
  }
  function bindingCurrentTemp() {
    let t1h, wsd, reh;
    currentTemp.forEach(data => {
      if (data.category === "PTY") setTemp(prevState => ({ ...prevState, PTY: data.obsrValue }));
      if (data.category === "T1H") {setTemp(prevState => ({ ...prevState, current: data.obsrValue })); t1h = data.obsrValue}
      if (data.category === "REH") reh = data.obsrValue
      if (data.category === "WSD") wsd = data.obsrValue
    });
    const value = getSensibleTemp(t1h, reh, wsd)
    setPercTemp(value)
    setRecommendClothes(getRecommendClothes(value))
    setLoading(false)
  }

  function process3To10(data1, data2) {
    const localDate = new Date()
    let newData = { date: null, MAX: null, MIN: null, skyAM: null, skyPM: null, popAM: null, popPM: null };
    for (let x = 3; x <= 7; x++) {
      localDate.setDate(localDate.getDate() + x)
      newData.date = "0" + (localDate.getMonth() + 1) + localDate.getDate()
      newData.MAX = data1[0]['taMax' + x]
      newData.MIN = data1[0]['taMin' + x]
      newData.skyAM = data2[0]['wf' + x + 'Am']
      newData.skyPM = data2[0]['wf' + x + 'Pm']
      newData.popAM = data2[0]['rnSt' + x + 'Am']
      newData.popPM = data2[0]['rnSt' + x + 'Pm']
      setDayThreeToSeven(prevState => [...prevState, { ...newData }]);
      localDate.setDate(localDate.getDate() - x)
      newData = { date: null, MAX: null, MIN: null, skyAM: null, skyPM: null, popAM: null, popPM: null };
    }
  }

  return (
    loading ? (
      <Loading/>
    ) : (
      <View style={styles.container}>

        <ScrollView style={styles.scrollViewContent}>
          <View style={styles.day}>
            <Text style={styles.dayTitle}>{date.dayOfWeek}</Text>
            <Text style={styles.date}>{date.date}</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.weather}>
            <View style={styles.weatherIconContainer}>
              <Icon name="weather-sunny" size={90} />
            </View>
            <View style={styles.weatherDetails}>
              <Text style={styles.temperature}>{temp.current}°C</Text>
              <View style={styles.tempRange}>
                <Text style={styles.tempText}>최고 {temp.TMX}°C</Text>
                <Text style={styles.tempText}>최저 {temp.TMN}°C</Text>
              </View>
            </View>
          </View>

          <View style={styles.suggestedAttire}>
            <Text style={{fontSize: 20, fontWeight: 600}}>{location.district} 오늘 이 옷 어때요?</Text>
            <Text style={{color: "#a0a0a0"}}>체감온도 {percTemp}°C에 따른 적절한 옷차림을 추천할게요.</Text>

            <View style={styles.suggestedItem}>
              <Text style={{fontWeight: 600}}>OUTER</Text>
              <Text>{recommendClothes.OUTER}</Text>
            </View>
            <View style={styles.suggestedItem}>
              <Text style={{fontWeight: 600}}>TOP</Text>
              <Text>{recommendClothes.TOP}</Text>
            </View>
            <View style={styles.suggestedItem}>
              <Text style={{fontWeight: 600}}>BOTTOM</Text>
              <Text>{recommendClothes.BOTTOM}</Text>
            </View>
          </View>

          <View style={styles.weatherForecast}>
            <Text style={styles.forecastTitle}>오늘 시간별 날씨에요.</Text>
            <ScrollView horizontal contentContainerStyle={styles.forecastDetails}>
              {weatherByHour.map((item, index) => (
                <View key={index} style={styles.forecastItem}>
                  <Text style={styles.forecastTime}>{item.date}</Text>
                  {renderIconPTY(item.PTY)}
                  <Text style={styles.forecastTemp}>{item.TMP}°C</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.weatherForecast}>
            {nextTwoDaysWeather.map((day, index) => (
              <View key={index} style={styles.weatherForDay}>
                <Text style={styles.forecastTime}>{renderDate(day.date)}</Text>
                {renderIconPTY(day.PTY)}
                <Text style={styles.forecastTemp}>{renderTemp(day.TMX)}°C / {renderTemp(day.TMN)}°C</Text>
              </View>
            ))}

            {dayThreeToSeven.map((day, index) => (
              <View key={index} style={styles.weatherForDay}>
                <Text style={styles.forecastTime}>{renderDate(day.date)}</Text>
                <Text style={styles.forecastTemp}>{renderIconSKY(day.skyAM)} {renderIconSKY(day.skyPM)}</Text>
                <Text style={styles.forecastTemp}>{day.MAX}°C / {day.MIN}°C</Text>
              </View>
            ))}
          </View>

          <StatusBar style="auto" />
        </ScrollView>
      </View>
    )
  );
}

function Loading() {
  return(
    <View style={styles.loading}>
      <Image style={styles.image} source={require('../assets/logo.png')}/>
    </View>
  )
}
