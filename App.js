import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "./page/Home";
import {useState} from "react";
import {SearchContext} from "./context/SearchContext";
import Search from "./page/Search";
import {LoadingContext} from "./context/LoadingContext";

const Drawer = createDrawerNavigator();

export default function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false)
  return (
    <SearchContext.Provider value={{search, setSearch}}>
      <LoadingContext.Provider value={{loading, setLoading}}>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" screenOptions={loading ? { headerShown : false} : {headerShown : true}}>
        <Drawer.Screen name="이옷어때?" component={Home} options={{ headerTitle: '',}}/>
        <Drawer.Screen name="다른지역날씨어때?" component={Search} options={{ headerTitle: '',}}/>
      </Drawer.Navigator>
    </NavigationContainer>
      </LoadingContext.Provider>
    </SearchContext.Provider>
  );
}


