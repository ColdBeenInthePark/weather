import * as Location from "expo-location";

async function getLocation(search) {
  let data = { region: "", city: "", district: "", latitude: null, longitude: null, error: false }

    if(search) {
      console.log(search.district)
      let address = await Location.geocodeAsync(`${search.city} ${search.district}`);
      data.latitude = address[0].latitude
      data.longitude = address[0].longitude
    } else {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') { data.error = getError(ERROR.PERMISSION_DENIED); return data }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });

      data.latitude = location.coords.latitude
      data.longitude = location.coords.longitude
    }

    let address = await Location.reverseGeocodeAsync({
      latitude: data.latitude,
      longitude: data.longitude,
    });

    if (address[0].city.includes("시") || address[0].city.includes("군") || address[0].city.includes("도")) {
      if(address[0].city.includes("특별시") || address[0].city.includes("광역시")) data.city = address[0].city.slice(0, -3)
      else data.city = address[0].city.slice(0, -1)
    } else data.city = address[0].city

    data.region = address[0].region
    data.district = address[0].district

  console.log(data)
  return data
}

export default getLocation