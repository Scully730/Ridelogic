import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const GetLocationScreen = ({setPinLocation}) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (address) setPinLocation(address)
  }, [address]);
  // Request permission to access location
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
  };

  // Get user location and reverse geocode to get address
  const getLocation = async () => {
    setIsLoading(true);
    try {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      // Reverse Geocoding to get address
      let geocode = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (geocode.length > 0) {
        let firstAddress = geocode[0];
        setAddress(`${firstAddress.street}, ${firstAddress.district}, ${firstAddress.city}, ${firstAddress.region}`);
        // setAddress(`${JSON.stringify(firstAddress)}`);
      }
    } catch (error) {
      setErrorMsg('Failed to get location');
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Location</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : location ? (
        <View>
          <Text style={styles.locationText}>📍 {address || 'Fetching address...'}</Text>

          {/* Map View */}
          <MapView
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="You are here"
            />
          </MapView>
        </View>
      ) : (
        <Text style={styles.errorText}>{errorMsg || 'Press the button to get location'}</Text>
      )}

      <Button title="Get My Location" onPress={getLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  map: {
    width: 300,
    height: 300,
    marginVertical: 10,
  },
});

export default GetLocationScreen;
