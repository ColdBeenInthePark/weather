import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from "./page/Home";
import styles from './assets/styleSheet';

const Drawer = createDrawerNavigator();

function NotificationsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Notifications Screen</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return(
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} options={{ headerTitle: '', headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={() => alert('Right button pressed')}>
              <Ionicons name="search" size={25} color="black" />
            </TouchableOpacity>
          ),}} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
