import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';

import * as Location from 'expo-location';
import bigBrother from './assets/BigBrother.jpg'
import { withRouter } from 'react-router';

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [detailedLocation, setDetailedLocation] = useState('');


  const askLocationPermissions = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    // lat = location.coords.latitude;
    // lon = location.coords.longitude;
    // getDetailedLocation(lat, lon);
  }

  let lat = '';
  let lon = '';

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = location
    lat = text.coords.latitude;
    lon = text.coords.longitude;
  }

  const getDetailedLocation = async (latitude, longitude) => {
  if(lat !== ''){
    let newLocation = await fetch(`https:us1.locationiq.com/v1/search.php?key=pk.ec7dd268e7db863b8ee3de2dc5489245&q=${latitude},${longitude}&format=json`);
    let data = await newLocation.json();
    let array = data[0].display_name.split(',');
    array.shift();
    array.shift();
    setDetailedLocation(array.join());
  }
}

  useEffect(() => {
    getDetailedLocation(lat, lon);
  }, [lat]);


return (
  <View style={styles.container}>
    <Button
    color='red'
    onPress={askLocationPermissions}
    title="Click to Enter the Evil Empire"
    />
    <Image source={bigBrother} style={styles.media}/>
    <Text style={styles.text}>Big Brother is Watching...</Text>
    <Text style={styles.text}>{detailedLocation}</Text>
    <StatusBar style="auto" />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    borderWidth: 5,
    borderColor: "red",
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'red',
    fontSize: 28,
  },
  media:{
    width: 500,
    flex: 2,
    marginTop:5,
  },
});