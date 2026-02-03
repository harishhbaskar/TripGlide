import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors, Fonts } from '../styles/tripTheme';

const OTPScreen = ({ route, navigation }) => {
    const { confirmation, phoneNumber } = route.params;
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);

    const handleVerify = async () => {
        try {
            await confirmation.confirm(code.join(''));
        } catch (error) {
            Alert.alert("Error", "Invalid code entered.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify {phoneNumber}</Text>
            <View style={styles.otpRow}>
                {code.map((digit, i) => (
                    <TextInput
                        key={i}
                        ref={el => inputs.current[i] = el}
                        style={styles.input}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={text => {
                            let newCode = [...code];
                            newCode[i] = text;
                            setCode(newCode);
                            if (text && i < 5) inputs.current[i + 1].focus();
                        }}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace' && !code[i] && i > 0) {
                                inputs.current[i - 1].focus();
                            }
                        }}
                    />
                ))}
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleVerify}>
                <Text style={styles.btnText}>Verify OTP</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 25, justifyContent: 'center', backgroundColor: '#fff' },
    title: { fontSize: 22, fontFamily: Fonts.bold, marginBottom: 20 },
    otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    input: { width: 45, height: 50, borderBottomWidth: 2, borderColor: Colors.primary, textAlign: 'center', fontSize: 20,color: '#000', },
    btn: { backgroundColor: Colors.primary, padding: 15, borderRadius: 30, alignItems: 'center' },
    btnText: { color: '#fff', fontWeight: 'bold' }
});

export default OTPScreen;