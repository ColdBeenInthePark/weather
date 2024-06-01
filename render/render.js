import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import styles from "../assets/styleSheet";
import {Text} from "react-native";

const renderIconPTY = (PTY) => {
  if (PTY === "0") return <Icon name="weather-sunny" size={40} style={styles.forecastIcon} />;
  else if (PTY === "1") return <Icon name="weather-pouring" size={40} style={styles.forecastIcon} />;
  else if (PTY === "2") return <Icon name="weather-snowy-rainy" size={40} style={styles.forecastIcon} />;
  else if (PTY === "3") return <Icon name="weather-snowy" size={40} style={styles.forecastIcon} />;
  else return <Icon name="weather-sunny" size={40} style={styles.forecastIcon} />;
};

const renderIconSKY = (SKY) => {
  if(SKY === "맑음") return <Icon name="weather-sunny" size={40} style={styles.forecastIcon} />;
  else if(SKY === "구름많음") return <Icon name="weather-partly-cloudy" size={40} style={styles.forecastIcon} />;
  else if(SKY === "구름많고 비") return <Icon name="weather-rainy" size={40} style={styles.forecastIcon} />;
  else if(SKY === "구름많고 눈") return <Icon name="weather-snowy-heavy" size={40} style={styles.forecastIcon} />;
  else if(SKY === "구름많고 비/눈") return <Icon name="weather-snowy-rainy" size={40} style={styles.forecastIcon} />;
  else if(SKY === "구름많고 소나기") return <Icon name="weather-pouring" size={40} style={styles.forecastIcon} />;
  else if(SKY === "흐림") return <Icon name="weather-cloudy" size={40} style={styles.forecastIcon} />;
  else if(SKY === "흐리고 비") return <Icon name="weather-rainy" size={40} style={styles.forecastIcon} />;
  else if(SKY === "흐리고 눈") return <Icon name="weather-snowy-heavy" size={40} style={styles.forecastIcon} />;
  else if(SKY === "흐리고 비/눈") return <Icon name="weather-snowy-rainy" size={40} style={styles.forecastIcon} />;
  else if(SKY === "흐리고 소나기") return <Icon name="weather-pouring" size={40} style={styles.forecastIcon} />;
  else if(SKY === "소나기") return <Icon name="weather-pouring" size={40} style={styles.forecastIcon} />;
  else return <Icon name="weather-sunny" size={40} style={styles.forecastIcon} />;
}

const renderDate = (date) => {
  let month = parseInt(date.slice(0,2))
  let day = date.slice(2)

  return <Text>{month}월{day}일</Text>
}

const renderTemp = (tmp) => {
  let temp = tmp.slice(0,2)

  return <Text>{temp}</Text>
}

export {renderTemp,renderDate,renderIconSKY,renderIconPTY}