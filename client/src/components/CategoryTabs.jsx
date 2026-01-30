import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Fonts } from '../styles/tripTheme';


const categories = ['Asia', 'Europe', 'South America', 'North America'];

const CategoryTabs = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      {categories.map((cat, index) => {
        const isActive = cat === 'South America'; 
        return (
          <TouchableOpacity key={index} style={[styles.tab, isActive && styles.activeTab]}>
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>{cat}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { marginVertical: Spacing.m, paddingLeft: Spacing.m },
  tab: {
    paddingHorizontal: 22, 
    paddingVertical:11,
    borderRadius: 999,
    backgroundColor: Colors.primaryLight,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: { backgroundColor: Colors.primary},
  tabText: { color: Colors.textSecondary, fontFamily: Fonts.medium, },
  activeTabText: { color: Colors.white },
});

export default CategoryTabs;