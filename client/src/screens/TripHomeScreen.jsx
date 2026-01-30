import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput ,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { globalStyles } from '../styles/globalStyles';
import { Colors, Spacing, Fonts } from '../styles/tripTheme';
import CategoryTabs from '../components/CategoryTabs';
import StackCarousel from '../components/StackCarousel';
import HeroCard from '../components/HeroCard';

const DATA = [
  { id: '1', city: 'Rio de Janeiro', country: 'Brazil', rating: '5.0', reviews: '143', image: require('../assets/images/mountain.jpg') },
  { id: '2', city: 'Tokyo', country: 'Japan', rating: '4.9', reviews: '210', image: require('../assets/images/sunset.jpg') },
  { id: '3', city: 'Paris', country: 'France', rating: '4.8', reviews: '98', image: require('../assets/images/airport.jpg') },
];

const TripHomeScreen = () => {
    const renderHeroCard = (item) => <HeroCard item={item} />;
    
    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <ScrollView contentContainerStyle={[globalStyles.container, { paddingBottom: 100 }]}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.welcomeText}>Hello, Vanessa</Text>
                        <Text style={styles.subText}>Welcome to TripGlide</Text>
                    </View>
                    <Image
                        source={require('../assets/images/avatar.webp')}
                        style={styles.avatar}
                    />
                </View>

                <View style={styles.searchBox}>
                    <Icon name="search" size={22} color={Colors.textSecondary} />
                    <TextInput
                        placeholder="Search"
                        style={styles.input}
                        placeholderTextColor={Colors.textSecondary}
                    />
                    <View style={styles.filterIcon}>
                        <Icon name="sliders" size={20} color={Colors.white} />
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Select your next trip</Text>
                <CategoryTabs />
                <View style={styles.carouselWrapper}>
                    <StackCarousel
                        data={DATA}
                        renderItem={renderHeroCard}
                    />
                </View>
            </ScrollView>

            <View style={styles.navBar}>
                <View style={styles.activeNavCircle}>
                    <Icon name="home" size={22} color={Colors.black} />
                </View>
                <Icon name="grid" size={24} color={Colors.textSecondary} />
                <Icon name="heart" size={24} color={Colors.textSecondary} />
                <Icon name="user" size={24} color={Colors.textSecondary} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.m,
    },
    welcomeText: { fontSize: 24, fontFamily: Fonts.bold, color: Colors.textPrimary },
    subText: { fontSize: 14, fontFamily: Fonts.regular, color: Colors.textSecondary },
    avatar: { width: 55, height: 55, borderRadius: 27.5 },

    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        height: 60, 
        borderRadius: 35,
        marginTop: Spacing.l,
        marginHorizontal: Spacing.m,
        ...globalStyles.shadow
    },
    input: { flex: 1, fontSize: 16, marginLeft: 10, fontFamily: Fonts.regular },
    filterIcon: { backgroundColor: Colors.black, padding: 10, borderRadius: 20 },

    sectionTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    textAlign: 'left',
    marginTop: Spacing.l,
    marginLeft: Spacing.m,
    color: Colors.textPrimary,
},

    navBar: {
        position: 'absolute',
        bottom: 30, left: 30, right: 30,
        height: 75,
        backgroundColor: Colors.primaryLight,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    activeNavCircle: {
        backgroundColor: Colors.primary,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    carouselWrapper: {
        // marginTop: Spacing.s,
    },

});

export default TripHomeScreen;