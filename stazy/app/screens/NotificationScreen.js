import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const NotificationScreen = () => {
  const [activeTab, setActiveTab] = useState('offers');

  const EmptyState = ({ type }) => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateIconContainer}>
        <Ionicons 
          name={type === 'offers' ? 'gift-outline' : 'person-circle-outline'} 
          size={64} 
          color="#007AFF" 
        />
      </View>
      <Text style={styles.emptyStateTitle}>You're all caught up!</Text>
      <Text style={styles.emptyStateSubtitle}>
        {type === 'offers' 
          ? 'No new offers or updates at the moment. Check back later for exciting deals and news.'
          : 'No new account notifications. Your account is up to date and secure.'
        }
      </Text>
    </View>
  );

  const TabButton = ({ title, isActive, onPress }) => (
    <TouchableOpacity 
      style={[styles.tabButton, isActive && styles.activeTab]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View style={styles.mainHeader}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabContainer}>
        <View style={styles.tabBar}>
          <TabButton
            title="Offers & Updates"
            isActive={activeTab === 'offers'}
            onPress={() => setActiveTab('offers')}
          />
          <TabButton
            title="Account"
            isActive={activeTab === 'account'}
            onPress={() => setActiveTab('account')}
          />
        </View>
        
        {/* Tab Indicator */}
        <View style={styles.tabIndicatorContainer}>
          <View 
            style={[
              styles.tabIndicator, 
              { 
                left: activeTab === 'offers' ? 0 : '50%',
              }
            ]} 
          />
        </View>
      </View>
            </View>
      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'offers' ? (
          <EmptyState type="offers" />
        ) : (
          <EmptyState type="account" />
        )}
      </ScrollView>

      {/* Bottom decoration */}
      <View style={styles.bottomDecoration}>
        <View style={styles.decorationDot} />
        <View style={styles.decorationDot} />
        <View style={styles.decorationDot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  tabContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
  },
  activeTab: {
    backgroundColor: '#007AFF',

  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C757D',
  },
  activeTabText: {
    color: 'white',
  },
  tabIndicatorContainer: {
    position: 'relative',
    height: 4,
    marginTop: 16,
  },

  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyStateIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#E3F2FD',
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  bottomDecoration: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    gap: 8,
  },
  decorationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    opacity: 0.3,
  },
});

export default NotificationScreen;