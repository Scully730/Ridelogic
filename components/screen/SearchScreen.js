import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchPlaces, fetchSchedule } from '../../server/controllers/ScheduleController';
import { SafeAreaView, StyleSheet } from 'react-native';
import GetLocationScreen from './UserSettings';
import LocationSettingsView from './LocationSettingsView';

const SearchScreen = () => {
  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false); // Loading state for places
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false); // Loading state for schedule
  const [userDefinedAddress, setUserDefinedAddress] = useState(''); // Loading state for schedule
  
  useEffect(() => {
    const loadPlaces = async () => {
      setIsLoadingPlaces(true); // Start loading places
      const placesList = await fetchPlaces();
      if (placesList['places'])setPlaces(placesList['places']);
      setIsLoadingPlaces(false); // End loading places
    };
    loadPlaces();
  }, []);

  useEffect(() => {
    if(userDefinedAddress) setUserLocation(userDefinedAddress)
  }, [userDefinedAddress]);

  const handleSearch = async () => {
    setIsLoadingSchedule(true); // Start loading schedule
    const times = await fetchSchedule(userLocation, destination);
    setSchedule(times['times']);
    setIsLoadingSchedule(false); // End loading schedule
  };

  const handleLocationChange = (text) => {
    setUserLocation(text);
    filterSuggestions(text);
  };

  const handleDestinationChange = (text) => {
    setDestination(text);
    filterSuggestions(text);
  };

  const filterSuggestions = (query) => {
    const filtered = places.filter(place =>
      place.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSelectSuggestion = (suggestion, type) => {
    if (type === 'userLocation') {
      setUserLocation(suggestion);
    } else {
      setDestination(suggestion);
    }
    setSuggestions([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
      <Text style={styles.title}>RideLogic</Text>
      <Text style={styles.subtitle}>Golden Arrow Bus Service</Text>
      <Text style={styles.description}>
        Welcome back! Type in your location and destination, and we will help you get your bus times and routes.
      </Text>

      <LocationSettingsView setUserDefinedAddress={setUserDefinedAddress}/>
{/* <GetLocationScreen setPinLocation={()=>{}}/> */}
      
        {/* User Location Input */}
        <TextInput
          value={userLocation}
          onChangeText={handleLocationChange}
          placeholder="Enter Location"
          style={styles.input}
        />
        {isLoadingPlaces ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : suggestions.length > 0 ? (
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelectSuggestion(item, "userLocation")}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.noDataText}>No suggestions available</Text>
        )}

        {/* Destination Input */}
        <TextInput
          value={destination}
          onChangeText={handleDestinationChange}
          placeholder="Enter Destination"
          style={styles.input}
        />
        {isLoadingPlaces ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : suggestions.length > 0 ? (
          <FlatList
            data={suggestions || []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelectSuggestion(item, "destination")}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.noDataText}>No suggestions available</Text>
        )}

        {/* Search Button */}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search Schedule</Text>
        </TouchableOpacity>

        {/* Schedule Results */}
        {isLoadingSchedule ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : schedule ? (
          <View>
            <View style={styles.legendContainer}>
            <Text style={styles.legendText}>
              <Text style={styles.greenText}>● Green:</Text> Bus Time
            </Text>
            <Text style={styles.legendText}>
              <Text style={styles.blueText}>● Blue:</Text> Bus Route
            </Text>
          </View>
            <FlatList
            data={schedule}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.scheduleItem}>
                <Text style={styles.scheduleText}>
                  <Text style={styles.routeText}>{item["bus_route"]}</Text> arrives in {item['user_location']} at:
                </Text>
                <Text style={styles.timeText}>{item["times"]?.join("| ")}</Text>
              </View>
            )}
          /></View>
        ) : (
          <Text style={styles.noDataText}>No schedule found</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    margin: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#007bff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  suggestionItem: {
    padding: 12,
    backgroundColor: "#e3f2fd",
    marginBottom: 5,
    borderRadius: 8,
  },
  suggestionText: {
    fontSize: 16,
    color: "#007bff",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 14,
    color: "#6c757d",
    marginVertical: 10,
  },
  searchButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scheduleItem: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  scheduleText: {
    fontSize: 16,
    color: "#333",
  },
  routeText: {
    fontWeight: "bold",
    color: "#007bff",
  },
  timeText: {
    fontSize: 14,
    color: "#28a745",
    marginTop: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fc2803',
    textAlign: 'center',
    backgroundColor: '#c7c3c3',
    marginBottom: 10,
    borderCurve: 'circular',
    borderRadius: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c6fc03',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  legendText: {
    fontSize: 14,
    color: '#444',
    marginHorizontal: 10,
  },
  greenText: {
    color: 'green',
    fontWeight: 'bold',
  },
  blueText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default SearchScreen;
