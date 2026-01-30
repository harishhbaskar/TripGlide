import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, globalStyles, Spacing } from '../../styles/globalStyles';

const Card = ({ children, style }) => {
  return (
    <View style={[styles.card, globalStyles.shadow, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,           
    padding: Spacing.m,         
    marginBottom: Spacing.m,    
    overflow: 'hidden',     // Ensures child content doesn't bleed out
  },
});

export default Card;