import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from '@stripe/stripe-react-native';
// Updated to Modular Imports
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth'; 
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AppNavigator from "./src/navigation/AppNavigator";
import { STRIPE_PUBLISH_KEY, WEB_CLIENT_ID } from "@env";

// 1. Configure ONCE outside the component
GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID, // Uses your .env value
});

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 2. Use Modular Auth listener
    const auth = getAuth();
    const subscriber = onAuthStateChanged(auth, (userState) => {
      setUser(userState);
      if (initializing) setInitializing(false);
    });

    return subscriber; // cleanup
  }, [initializing]);

  // Prevent flicker during load
  if (initializing) return null; 

  return (
    <StripeProvider publishableKey={STRIPE_PUBLISH_KEY}>
      <SafeAreaProvider>
        <NavigationContainer>
          {/* Ensure authenticated is passed as a boolean */}
          <AppNavigator authenticated={!!user} />
        </NavigationContainer>
      </SafeAreaProvider>
    </StripeProvider>
  );
}

export default App;