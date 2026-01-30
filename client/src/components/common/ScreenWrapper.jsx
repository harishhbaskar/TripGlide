import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles ,Colors, Spacing } from '../../styles/globalStyles';

const ScreenWrapper = ({ children, style, noPadding = false }) => {
  return (
    <SafeAreaView style={globalStyles.safeArea}>

      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={[
        styles.container, 
        noPadding ? { padding: 0 } : { padding: Spacing.l }, 
        style
      ]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});

export default ScreenWrapper;