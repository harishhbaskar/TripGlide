import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TripHomeScreen from '../screens/TripHomeScreen';
import TripDetailsScreen from '../screens/TripDetailsScreen';
import BookingScreen from '../screens/BookingScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TripHome" component={TripHomeScreen} />
      <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
    </Stack.Navigator>
  );
}