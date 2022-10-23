import * as React from 'react';
import MapView, { Circle, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { hasStartedLocationUpdatesAsync } from 'expo-location';
import * as Location from 'expo-location';
//import { Search } from "../screens/search";

function Map({ navigation}) {
    //Used for the red pin
  const [pin, setPin] = React.useState({
      latitude: -36.98552070152305, 
      longitude: 174.84990686604613,
  });

  React.useEffect(() => {
    //Used to ask for permission to access current location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);

      //Used for current location
      setPin({
        latitude: location.coords.latitude, 
        longitude: location.coords.longitude,
      });
    })();
    }, []);

  return (
    <View style={styles.container}>
      <MapView
      style={styles.map}
      //Used for the area to be taken to in the map
      initialRegion={{
        latitude: -36.98552070152305, 
        longitude: 174.84990686604613,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
      showsUserLocation={true}
      >
        <Marker
        //Used for the current location pin 
          coordinate={pin}
          title="You Are Here"
          draggable={true}
          onDragStart={(e) => {
            //Able to drag the pin
          console.log("Drag Start", e.nativeEvent.coordinate);
        }}
        onDragEnd={(e) => {
          console.log("Drag End", e.nativeEvent.coordinate);

          setPin({
            latitude: e.nativeEvent.coordinate.latitude, 
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
        >
        </Marker>

        <Circle center={pin}
        //Used for radius
        radius={2500}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    //Map view
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});

export default Map;