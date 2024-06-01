
import { API_KEY } from "@env"
import axios from "axios";
import {dfs_xy_conv} from "./dfs_xy_conv";
async function getWeatherInfoWithLocation(flag, latitude, longitude) {
  let localDateTime = new Date();

  const dateFlag = flag ? new Date(localDateTime.setDate(localDateTime.getDate() - 1)) : localDateTime
  const weatherflag = flag ? "getVilageFcst" : "getUltraSrtNcst"
  let timeFlag = flag ? "2300" : ""
  if(localDateTime.getHours() - 1 >= 10 && !flag ) timeFlag = (localDateTime.getHours() - 1) + "00"
  else if(localDateTime.getHours() - 1 < 10 && !flag ) timeFlag = "0" + (localDateTime.getHours() - 1) + "00"

  let formattedDate = dateFlag.toISOString().slice(0, 10).replace(/-/g, '');

  const toXY = dfs_xy_conv("toXY",latitude,longitude)

  const URL = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/${weatherflag}?serviceKey=${API_KEY}&pageNo=1&numOfRows=870&dataType=JSON&base_date=${formattedDate}&base_time=${timeFlag}&nx=${toXY.x}&ny=${toXY.y}`
  const result = await axios.get(URL)

  return result.data.response.body.items.item
}

async function getWeatherInfoWithCode(flag, cityCode) {
  const localDateTime = new Date()
  let formattedDate = localDateTime.toISOString().slice(0, 10).replace(/-/g, '') + "0600"
  const type = flag ? "getMidTa" : "getMidLandFcst"
  const url = `https://apis.data.go.kr/1360000/MidFcstInfoService/${type}?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&dataType=JSON&regId=${cityCode}&tmFc=${formattedDate}`

  const result = await axios.get(url)
  return result.data.response.body.items.item
}

export {getWeatherInfoWithLocation, getWeatherInfoWithCode}