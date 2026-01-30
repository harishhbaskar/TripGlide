import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, Spacing, Fonts } from '../styles/tripTheme';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');


const TripDetailsScreen = ({ navigation }) => {

    
    return (
        <View style={styles.container}>
            
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/mountain.jpg')}
                    style={styles.headerImage}
                />
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color={Colors.black} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.heartBtn}>
                    <Icon name="heart" size={20} color={Colors.black} />
                </TouchableOpacity>
            </View>

            
            <View style={styles.contentCard}>
                <View style={styles.handle} />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                    <View style={styles.titleRow}>
                        <Text style={styles.cityTitle}>Rio de Janeiro</Text>
                        <View style={styles.ratingBox}>
                            <Icon name="star" size={14} color="#FFD700" />
                            <Text style={styles.ratingText}>5.0</Text>
                        </View>
                    </View>

                    <View style={styles.locationRow}>
                        <Icon name="map-pin" size={14} color={Colors.primary} />
                        <Text style={styles.countryText}>Brazil</Text>
                        <Text style={styles.reviewsText}>143 reviews</Text>
                    </View>

                    <Text style={styles.description}>
                        Rio de Janeiro, often simply called Rio, is one of Brazil's most iconic cities, renowned for...
                        <Text style={styles.readMore}> Read more</Text>
                    </Text>

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Upcoming tours</Text>
                        <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
                    </View>

                    
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TourCard
                            image={require('../assets/images/sunset.jpg')}
                            title="Iconic Brazil"
                            price="$659/person"
                            rating="4.6"
                            onPress={() => navigation.navigate('Booking')} 
                        />
                        <TourCard
                            image={require('../assets/images/airport.jpg')}
                            title="Beach Paradise"
                            price="$450/person"
                            rating="4.8"
                        />
                    </ScrollView>
                </ScrollView>
            </View>
        </View>
    );
};

const TourCard = ({ image, title, price, rating, onPress }) => (
    <TouchableOpacity style={styles.tourCard} onPress={onPress} activeOpacity={0.9}>
        <Image source={image} style={styles.tourImg} />
        <TouchableOpacity style={styles.tourHeart}><Icon name="heart" size={16} color={Colors.black} /></TouchableOpacity>
        <View style={styles.tourInfo}>
            <Text style={styles.tourTitle}>{title}</Text>
            <Text style={styles.tourPrice}>8 days • from {price}</Text>
            <View style={styles.tourFooter}>
                <Icon name="star" size={12} color="#FFD700" />
                <Text style={styles.tourRating}>{rating} (56 reviews)</Text>
                <View style={styles.goBtn}><Icon name="arrow-right" size={16} color="#fff" /></View>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    imageContainer: { height: 350, width: '100%' },
    headerImage: { width: '100%', height: '100%' },
    backBtn: { position: 'absolute', top: 50, left: 20, backgroundColor: '#fff', padding: 10, borderRadius: 25 },
    heartBtn: { position: 'absolute', top: 50, right: 20, backgroundColor: '#fff', padding: 10, borderRadius: 25 },
    contentCard: { flex: 1, marginTop: -30, backgroundColor: '#fff', borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 25 },
    handle: { width: 40, height: 4, backgroundColor: '#E5E7EB', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cityTitle: { fontSize: 28, fontFamily: Fonts.bold, color: Colors.textPrimary },
    ratingBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', padding: 8, borderRadius: 12 },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, gap: 5 },
    countryText: { fontSize: 14, color: Colors.textSecondary },
    reviewsText: { fontSize: 14, color: Colors.textSecondary, textDecorationLine: 'underline', marginLeft: 10 },
    description: { fontSize: 15, color: Colors.textSecondary, lineHeight: 22, marginTop: 10 },
    readMore: { color: Colors.textPrimary, fontWeight: 'bold' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 15 },
    sectionTitle: { fontSize: 20, fontFamily: Fonts.bold },
    seeAll: { color: Colors.textSecondary },
    tourCard: { width: 260, marginRight: 20, backgroundColor: '#fff', borderRadius: 30, padding: 10, borderWidth: 1, borderColor: '#F3F4F6' },
    tourImg: { width: '100%', height: 160, borderRadius: 25 },
    tourHeart: { position: 'absolute', top: 20, right: 20, backgroundColor: '#fff', padding: 8, borderRadius: 20 },
    tourTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
    tourPrice: { fontSize: 12, color: Colors.textSecondary, marginVertical: 4 },
    tourFooter: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    goBtn: { backgroundColor: Colors.primary, padding: 10, borderRadius: 20, marginLeft: 'auto' }
});

export default TripDetailsScreen;