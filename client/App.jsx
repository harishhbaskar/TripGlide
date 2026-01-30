import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from '@stripe/stripe-react-native';
import AppNavigator from "./src/navigation/AppNavigator";
import { STRIPE_PUBLISH_KEY } from "@env"

function App() {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISH_KEY}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </StripeProvider>
  );
}
export default App;