import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { EyeIcon, EyeOffIcon } from './common/Icons'
import { Colors } from '../styles/globalStyles';

const CustomInput = ({ icon, placeholder, isPassword ,value , setValue}) => {
  
  const [secureText, setSecureText] = useState(isPassword);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconPlaceholder}>{icon}</View>
      
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={secureText}
        value={value}
        onChangeText={setValue}
      />

      
      {isPassword && (
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          {secureText ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 16,
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconPlaceholder: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333',
  },
  eyeIcon: {
    fontSize: 18,
    padding: 4,
  },
});

export default CustomInput;