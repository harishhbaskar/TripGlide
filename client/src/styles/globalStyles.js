import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');


export const Colors = {
    primary: '#2D8C5F',
    primaryLight: '#D4EBE2',

    background: '#F3F4F6',

    textPrimary: '#111827',
    textSecondary: '#6B7280',

    border: '#E5E7EB',
    red: '#EF4444',
    white: '#fff',
};

export const Spacing = {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
};

export const Fonts = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
};

export const globalStyles = StyleSheet.create({
    // Parent Container 
    safeArea: {
        width: '100%',
        height: height, 
        backgroundColor: Colors.background,
    },
    // The ScrollView content container
    container: {
        flexGrow: 1,
        padding: 24,
    },
    //shadow
    shadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 5, // Android shadow
    },
    // Typography
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 20,
    },
    // Common sections
    header: {
        marginBottom: 20,
        marginTop: 20,
    },
    form: {
        width: '100%',
    },
});