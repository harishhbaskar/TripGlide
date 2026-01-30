import React, { memo } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { Colors,Fonts } from '../styles/tripTheme';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

const HeroCard = memo(({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <ImageBackground
        source={item.image}
        style={styles.image}
        imageStyle={{ borderRadius: 40 }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.85)']}
          style={styles.gradient}
        >
          <TouchableOpacity style={styles.heartButton}>
            <Icon name="heart" size={20} color="#fff" />
          </TouchableOpacity>

          <View>
            <Text style={styles.country}>{item.country}</Text>
            <Text style={styles.city}>{item.city}</Text>

            <View style={styles.statsRow}>
              <Icon name="star" size={14} color="#FFD700" />
              <Text style={styles.rating}> {item.rating}</Text>
              <Text style={styles.reviews}> • {item.reviews}</Text>
            </View>

            <TouchableOpacity
              style={styles.actionBar}
              onPress={() => navigation.navigate('TripDetails')}
            >
              <Text style={styles.seeMore}>See more</Text>
              <View style={styles.arrow}>
                <Icon name="chevron-right" size={20} color="#000" />
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 420,
    borderRadius: 40,
    overflow: 'hidden',
    // Removed elevation and black background to stop the flickering
  },
  image: {
    flex: 1,
    
  },
  gradient: {
    flex: 1,
    padding: 25,
    justifyContent: 'space-between',
  },
  heartButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 10,
    borderRadius: 25,
  },
  country: {
    color: '#fff',
    opacity: 0.8,
    fontFamily: Fonts.regular,
  },
  city: {
    color: '#fff',
    fontSize: 32,
    fontFamily: Fonts.bold,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reviews: {
    color: '#fff',
    opacity: 0.7,
  },
  actionBar: {
    height: 65,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMore: {
    fontWeight: '600',
  },
  arrow: {
    position: 'absolute',
    right: 8,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HeroCard;