import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ThreePointScroller from './src/Component/ThreePointScroller';

// Get device width and height
const { width, height } = Dimensions.get('window');

const App = () => {
  // Define data payloads for both questions
  const dataPayload = [
    {
      label: 'next week',
      key: 'next week',
    },
    {
      label: 'tomorrow',
      key: 'tomorrow',
    },
    {
      label: 'in a few weeks',
      key: 'in a few weeks',
    },
  ];

  const dataPayload2 = [
    {
      label: 'Today',
      key: 'Today',
    },
    {
      label: 'about a week',
      key: 'about a week',
    },
    {
      label: 'in a few days',
      key: 'in a few days',
    },
  ];

  // States to manage selected location and current positions for both questions
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(dataPayload[1].key);
  const [currentPosition2, setCurrentPosition2] = useState(dataPayload2[1].key);

  // Handler for position change in the first question
  const handlePositionChange = (newPosition) => {
    setCurrentPosition(newPosition);
  };

  // Handler for position change in the second question
  const handlePositionChange2 = (newPosition) => {
    setCurrentPosition2(newPosition);
  };

  // Handler for location selection
  const handleLocationSelect = (data, details) => {
    setSelectedLocation(details);
    console.log("selectedLocation", selectedLocation.formatted_address);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Stop</Text>
      <Text style={styles.description}>Where are you heading after Bend, OR?</Text>

      {/* Google Places Autocomplete */}
      <GooglePlacesAutocomplete
        onPress={(data, details) => handleLocationSelect(data, details)}
        placeholder="Search for a location"
        minLength={2}
        autoFocus={false}
        returnKeyType={'search'}
        listViewDisplayed="auto"
        fetchDetails={true}
        enablePoweredByContainer={false}
        query={{
          key: 'AIzaSyD5Jt2e9ocVmXovnsOsdmtdhPRkP8m9IhQ', // Replace with your Google API key
          language: 'en',
          types: '(regions)',
          components: 'country:CA', // Limit results to Canada
        }}
        renderRow={(rowData) => {
          const title = rowData.structured_formatting.main_text;
          const address = rowData.structured_formatting.secondary_text;
          return (
            <View style={styles.listView}>
              <Image source={require('./assets/location.png')} style={styles.listItemImage} />
              <Text style={styles.listText}>{title + ' ' + address}</Text>
            </View>
          );
        }}
        styles={autoCompleteStyles}
      ></GooglePlacesAutocomplete>

      {selectedLocation != null && (
        <View style={styles.container2}>
          {/* First Question */}
          <View>
            <Text style={styles.description}>When will you arrive in {selectedLocation.formatted_address}?</Text>
            <ThreePointScroller onChange={handlePositionChange} dataPayload={dataPayload} />
          </View>

          {/* Second Question */}
          <View>
            <Text style={styles.description}>How long will you stay?</Text>
            <ThreePointScroller onChange={handlePositionChange2} dataPayload={dataPayload2} />
          </View>

          {/* Display selected positions */}
          <Text style={styles.heading}>Question 1 : {currentPosition}</Text>
          <Text style={styles.heading}>Question 2 : {currentPosition2}</Text>
        </View>
      )}

      {/* Add to Route Button */}
      <Pressable style={styles.routeButton}>
        <Text style={{ textAlign: 'center' }}>Add to Route</Text>
      </Pressable>
    </View>
  );
};

const autoCompleteStyles = {
  container: {
    width: width - 50,
    borderRadius: 8
  },
  textInputContainer: {
    backgroundColor: '#374551',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: width - 50,
    borderRadius: 8
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 48,
    color: '#99ABC7',
    fontSize: 16,
    backgroundColor: '#1A1F2E',
    borderWidth: 1,
    borderColor: '#99ABC7',
    borderRadius: 8,
    width: width - 50,
    placeholderTextColor: 'white', // Set the placeholder text color to white
  },
  listView: {
    backgroundColor: '#374551',
  },
  predefinedPlacesDescription: {
    color: 'white',
  },
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#374551',
    padding: 16,
    paddingTop: 60,
  },
  container2: {
    // marginTop: -400,
    width: width - 30,
    position: 'absolute',
    marginLeft: 15,
    top: 200

  },
  heading: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginBottom: 16,
    fontWeight: '400',
    marginTop: 7,
  },
  listView: {
    backgroundColor: '#374551',
    height: 65,
    margin: 0,
    marginBottom: -16,
    marginTop: -14,
    marginLeft: -13,
    width: width - 50,
    paddingLeft: 35
  },
  listText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 65
  },
  listItemImage: {
    height: 24,
    width: 24,
    position: 'absolute',
    top: 19
  },
  locationInput: {
    backgroundColor: '#1A1F2E',
    color: 'white',
    height: 48,
    fontSize: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  suggestionList: {
    backgroundColor: '#374551',
    marginTop: 40,
    marginBottom: -100,
    paddingLeft: 20,
  },
  suggestionItem: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  routeButton: {
    textAlign: 'center',
    height: 55,
    width: width - 50,
    backgroundColor: '#36ECDA',
    borderRadius: 10,
    justifyContent: 'center',
    margin: 10
  }
});

export default App;
