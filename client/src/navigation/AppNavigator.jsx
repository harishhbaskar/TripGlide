import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TripHomeScreen from '../screens/TripHomeScreen';
import TripDetailsScreen from '../screens/TripDetailsScreen';
import BookingScreen from '../screens/BookingScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';   

const Stack = createNativeStackNavigator();

export default function AppNavigator({ authenticated }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authenticated ? (
        <>
          <Stack.Screen name="TripHome" component={TripHomeScreen} />
          <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
          <Stack.Screen name="Booking" component={BookingScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}