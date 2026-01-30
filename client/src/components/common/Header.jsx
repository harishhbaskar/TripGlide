import React from 'react';
import { View, Text, StyleSheet ,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from '../common/Icons'
import Icon from 'react-native-vector-icons/Feather';
import IconButton from './IconButton';
import { Colors, globalStyles } from '../../styles/globalStyles';

const Header = ({ title, showLogo = false, showBack = false, rightComponent }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            {/* left */}
            <View style={styles.leftContainer}>
                {showBack && (
                    <IconButton
                        icon={<ArrowLeftIcon size={22} color={Colors.textPrimary} />}
                        onPress={() => navigation.goBack()}
                    />
                )}
                {showLogo && (
                    <View style={styles.logoRow}>
                        {/* Placeholder Logo Icon */}
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={styles.logo} 
                            resizeMode="contain"
                        />
                    </View>
                )}
            </View>

            {/*center*/}
            <View style={styles.centerContainer}>
                {title && <Text style={styles.title}>{title}</Text>}
            </View>

            {/*right*/}
            <View style={styles.rightContainer}>
                {rightComponent}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 24, // Spacing between header and content
        //no horizontal spacing , as the wrapper handles it
    },
    leftContainer: {
        flex: 1, // Takes up 1/3 space
        alignItems: 'flex-start',
    },
    centerContainer: {
        flex: 2, // Takes up more space for long titles
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1, // Takes up 1/3 space
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12, // Space between multiple right icons
        alignItems: 'center',
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logo: {
        width: 50, // Adjust this depending on if your logo is wide or square
        height: 32, 
        borderRadius: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary
    }
});

export default Header;