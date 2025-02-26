import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Text,
  Clipboard,
  Alert,
} from 'react-native';
import GetLocationScreen from './UserSettings';
import { Ionicons } from '@expo/vector-icons';
import { fetchPlaces } from '../../server/controllers/ScheduleController';

const LocationSettingsView = ({ setUserDefinedAddress }) => {
  const [pinLocation, setPinLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [isVisible, setIsVisible] = useState(false); // Modal visibility state

  // Close modal function
  const closeModal = () => {
    setIsVisible(false);
  };

  // Copy function
  const copyToClipboard = () => {
    if (pinLocation) {
      Clipboard.setString(pinLocation);
      Alert.alert('Copied!', 'Location has been copied to clipboard.');
    } else {
      Alert.alert('No location', 'Please enter a location first.');
    }
  };

  useEffect(() => {
    if (pinLocation && places.length > 0) {
      const address = places.find((place) =>
        pinLocation.toLowerCase().includes(place.toLowerCase())
      );
      setUserDefinedAddress(address);
    }
  }, [pinLocation, places]);

  useEffect(() => {
    const loadPlaces = async () => {
      const placesList = await fetchPlaces();
      if (placesList['places']) setPlaces(placesList['places']);
    };
    loadPlaces();
  }, []);

  return (
    <View>
      {/* Open Modal Button */}
      <TouchableOpacity style={styles.openButton} onPress={() => setIsVisible(true)}>
        <Text style={styles.openButtonText}>What's my location?</Text>
      </TouchableOpacity>

      {/* Modal for Location Settings */}
      <Modal visible={isVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Set Your Location</Text>

            {/* Location Picker */}
            <GetLocationScreen setPinLocation={setPinLocation} />

            {/* Input Field */}
            <TextInput
              style={styles.input}
              value={pinLocation ? pinLocation : ''}
              placeholder="Enter location..."
              onChangeText={setPinLocation}
            />

            {/* Copy Button */}
            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
              <Ionicons name="copy" size={20} color="white" />
              <Text style={styles.copyText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  openButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  copyText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default LocationSettingsView;
