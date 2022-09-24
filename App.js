import * as React from 'react';
import MapView, { Circle, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { hasStartedLocationUpdatesAsync } from 'expo-location';
import * as Location from 'expo-location';

export default function App() {
  const [pin, setPin] = React.useState({
      latitude: -36.98552070152305, 
      longitude: 174.84990686604613,
  });

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);

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
      initialRegion={{
        latitude: -36.98552070152305, 
        longitude: 174.84990686604613,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
      showsUserLocation={true}
      >
        <Marker 
          coordinate={pin}
          title="You Are Here"
          draggable={true}
          onDragStart={(e) => {
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})