import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, useColorScheme } from "react-native";
import { globalStyles, Colors } from "../styles/globalStyles";
import CustomInput from "../components/CustomInput";
import { MailIcon, ArrowLeftIcon } from "../components/common/Icons";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken, Settings } from 'react-native-fbsdk-next';

const LoginScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [phoneNumber, setPhoneNumber] = useState('');

    // Separate loading states for each button
    const [phoneLoading, setPhoneLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [fbLoading, setFbLoading] = useState(false);

    useEffect(() => {
        Settings.initializeSDK();
    }, []);

    const onGoogleButtonPress = async () => {
        setGoogleLoading(true);
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Updated for latest @react-native-google-signin versions
            const signInResult = await GoogleSignin.signIn();
            const idToken = signInResult.data?.idToken || signInResult.idToken;

            if (!idToken) {
                throw new Error('Google Sign-In failed: idToken is missing.');
            }

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
        } catch (error) {
            if (error.code !== 'ASYNC_OP_IN_PROGRESS') {
                Alert.alert('Google Error', error.message);
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    const onFacebookButtonPress = async () => {
        setFbLoading(true);
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                setFbLoading(false); // Fix: Turn off loading if cancelled
                return;
            }

            const data = await AccessToken.getCurrentAccessToken();
            if (!data) throw new Error("Failed to get Facebook Access Token");

            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
            await auth().signInWithCredential(facebookCredential);
        } catch (error) {
            Alert.alert("Facebook Error", error.message);
        } finally {
            setFbLoading(false);
        }
    };

    const handlePhoneLogin = async () => {
        const cleaned = phoneNumber.replace(/[^0-9]/g, '');
        if (cleaned.length < 10) {
            Alert.alert("Error", "Please enter a valid 10-digit phone number");
            return;
        }

        setPhoneLoading(true);
        try {
            const confirmation = await auth().signInWithPhoneNumber(`+91${cleaned}`);
            navigation.navigate('OTPScreen', { confirmation, phoneNumber: cleaned });
        } catch (error) {
            Alert.alert("Phone Error", error.message);
        } finally {
            setPhoneLoading(false);
        }
    };

    // Helper to determine if any login is in progress
    const anyLoading = phoneLoading || googleLoading || fbLoading;

    useEffect(() => {
        // Initialize Facebook
        Settings.initializeSDK();

        // Configure Google
        GoogleSignin.configure({
            webClientId: '549390113266-1mdktbnsqcjnga0b55gak1agq4lq2q6s.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }, []);

    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <ScrollView contentContainerStyle={globalStyles.container}>
                <View style={globalStyles.header}>
                    <TouchableOpacity onPress={() => navigation.canGoBack() && navigation.goBack()}>
                        <ArrowLeftIcon />
                    </TouchableOpacity>
                </View>

                <Text style={globalStyles.title}>Welcome to TripGlide</Text>
                <Text style={globalStyles.subtitle}>Sign in to start your adventure</Text>

                <View style={globalStyles.form}>
                    <CustomInput
                        icon={<MailIcon />}
                        placeholder="Phone Number (e.g. 9876543210)"
                        value={phoneNumber}
                        setValue={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
                        keyboardType="phone-pad"
                        style={{ color: isDarkMode ? '#fff' : '#000' }} // Dark mode fix
                    />

                    <TouchableOpacity
                        style={[styles.phoneBtn, anyLoading && { opacity: 0.7 }]}
                        onPress={handlePhoneLogin}
                        disabled={anyLoading}
                    >
                        {phoneLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.phoneBtnText}>Get OTP</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.divider} />
                    </View>

                    <TouchableOpacity
                        style={[styles.googleBtn, anyLoading && { opacity: 0.7 }]}
                        onPress={onGoogleButtonPress}
                        disabled={anyLoading}
                    >
                        {googleLoading ? (
                            <ActivityIndicator color="#000" />
                        ) : (
                            <Text style={styles.googleText}>Continue with Google</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.facebookBtn, anyLoading && { opacity: 0.7 }]}
                        onPress={onFacebookButtonPress}
                        disabled={anyLoading}
                    >
                        {fbLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.facebookText}>Continue with Facebook</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    phoneBtn: { backgroundColor: Colors.primary, height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    phoneBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
    divider: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
    dividerText: { marginHorizontal: 10, color: '#9CA3AF', fontSize: 12 },
    googleBtn: { height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd' },
    googleText: { color: '#000', fontWeight: '600' },
    facebookBtn: { height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1877F2', marginTop: 12 },
    facebookText: { color: '#fff', fontWeight: '600' }
});

export default LoginScreen;