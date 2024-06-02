import {StyleSheet, Dimensions} from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flex: 1,
    paddingBottom: 20,
  },
  navbar: {
    height: windowHeight * 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  day: {
    marginLeft: '5%',
    marginTop: '10%',
  },
  dayTitle: {
    fontWeight: '500',
    fontSize: 30,
  },
  date: {
    fontWeight: '200',
    fontSize: 20,
    marginTop: 5,
  },
  divider: {
    marginTop: '5%',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    width: '90%',
  },
  weather: {
    flexDirection: 'row',
    marginTop: '10%',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  weatherIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  weatherDetails: {
    flex: 2,
    alignItems: 'center',
  },
  temperature: {
    fontSize: 50,
  },
  tempRange: {
    flexDirection: 'row',
  },
  tempText: {
    fontSize: 14,
    marginHorizontal: 5,
  },
  weatherForecast: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: '10%',
    paddingHorizontal: '5%',
    // iOS 그림자 속성
    shadowColor: '#030303',
    shadowOffset: { width: 0, height: 1 }, // height 값을 줄임
    shadowOpacity: 0.1, // 투명도 유지
    shadowRadius: 3,
    // Android 그림자 속성
    elevation: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 10,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  forecastDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  forecastItem: {
    width: 100,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: "#d9d9d9",
    borderLeftWidth: 1,
    borderLeftColor: "#d9d9d9",
  },
  forecastTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  forecastIcon: {
    marginBottom: 5,
  },
  forecastTemp: {
    fontSize: 16,
  },
  suggestedAttire: {
    width: "90%",
    marginLeft: "5%",
    marginTop: "10%",
  },
  suggestedItem : {
    width: "90%",
    marginLeft: "5%",
    padding: 10,

    backgroundColor: "#fff",
    borderRadius: 10, // border-radius 설정
    // iOS 그림자 속성
    shadowColor: '#030303',
    shadowOffset: { width: 0, height: 1 }, // height 값을 줄임
    shadowOpacity: 0.1, // 투명도 유지
    shadowRadius: 3,
    // Android 그림자 속성
    elevation: 5,
    margin: 10,
  },
  weatherForDay : {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#d9d9d9",
    margin: 10,
    alignItems: "center",
    justifyContent: "space-between"
  },
  loading : {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: {
    width : 150,
    height : 150,
  },
  headerButton: {
    marginRight: 15,
  }
});

export default styles;
