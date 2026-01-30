import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, Spacing, Fonts } from '../styles/tripTheme';
import { IP_ADDRESS } from '@env';

const BookingDetailsScreen = ({ navigation }) => {
    const { confirmPayment } = useConfirmPayment();
    const [loading, setLoading] = useState(false);
    const [cardDetails, setCardDetails] = useState(null);

    // Traveler State
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        travelers: '1',
        requests: ''
    });

    const handlePayment = async () => {
        if (!cardDetails?.complete || !form.name || !form.email) {
            Alert.alert("Missing Info", "Please fill in traveler details and card info.");
            return;
        }

        setLoading(true);
        try {
            // 1. Create PaymentIntent on your server
            const response = await fetch(`${IP_ADDRESS}:3000/create-payment-intent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 65900, currency: 'usd' }),
            });
            const data = await response.json();

            if (!data.clientSecret) {
                Alert.alert("Server Error", "Payment session not created.");
                setLoading(false);
                return;
            }

            const clientSecret = data.clientSecret

            // 2. Confirm Payment using Elements (CardField)
            const { paymentIntent, error } = await confirmPayment(clientSecret, {
                paymentMethodType: 'Card',
                billingDetails: {
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                },
            });

            if (error) {
                Alert.alert("Payment Failed", error.message);
            } else if (paymentIntent) {
                Alert.alert("Success!", "Your trip is booked.");
                navigation.navigate('TripHome');
            }
        } catch (e) {
            Alert.alert("Error", "Could not connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Booking Details</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Traveler Info Section */}
                <Text style={styles.sectionLabel}>Traveler Information</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={form.name}
                        onChangeText={(t) => setForm({ ...form, name: t })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        keyboardType="email-address"
                        value={form.email}
                        onChangeText={(t) => setForm({ ...form, email: t })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        value={form.phone}
                        onChangeText={(t) => setForm({ ...form, phone: t })}
                    />
                </View>

                {/* Payment Section */}
                <Text style={styles.sectionLabel}>Payment Method</Text>
                <View style={styles.cardContainer}>
                    <CardField
                        postalCodeEnabled={true}
                        cardStyle={{
                            backgroundColor: '#FFFFFF',
                            textColor: '#000000',
                            cursorColor: Colors.primary,
                            placeholderColor: '#9CA3AF',
                            fontSize: 16,
                        }}
                        style={styles.cardField}
                        onCardChange={(details) => setCardDetails(details)}
                    />
                </View>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryText}>Total to Pay</Text>
                    <Text style={styles.totalPrice}>$659.00</Text>
                </View>

                <TouchableOpacity
                    style={[styles.payBtn, loading && { opacity: 0.7 }]}
                    onPress={handlePayment}
                    disabled={loading}
                >
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.payBtnText}>Confirm & Pay</Text>}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },
    scrollContent: { padding: 20, paddingBottom: 50 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 30 },
    headerTitle: { fontSize: 20, fontFamily: Fonts.bold, color: Colors.textPrimary },
    sectionLabel: { fontSize: 16, fontFamily: Fonts.medium, color: Colors.textPrimary, marginBottom: 15, marginTop: 10 },
    inputGroup: { gap: 12, marginBottom: 30 },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        color: Colors.textPrimary
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 10,
        marginBottom: 30
    },
    cardField: { width: '100%', height: 50 },
    summaryCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.primaryLight,
        borderRadius: 16,
        marginBottom: 30
    },
    summaryText: { fontSize: 16, color: Colors.primary, fontFamily: Fonts.medium },
    totalPrice: { fontSize: 22, color: Colors.primary, fontFamily: Fonts.bold },
    payBtn: {
        backgroundColor: Colors.primary,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: Colors.primary,
        shadowOpacity: 0.3,
        shadowRadius: 10
    },
    payBtnText: { color: '#fff', fontSize: 18, fontFamily: Fonts.bold }
});

export default BookingDetailsScreen;