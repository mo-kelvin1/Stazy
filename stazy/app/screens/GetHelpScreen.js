import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ContactItem = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.contactItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon} size={24} color="#007AFF" />
    </View>
    <View style={styles.contactInfo}>
      <Text style={styles.contactTitle}>{title}</Text>
      <Text style={styles.contactSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#007AFF" />
  </TouchableOpacity>
);

const GetHelpScreen = () => {
  const handleEmailPress = () => {
    const emailUrl = 'mailto:stazyapp@gmail.com?subject=Help Request&body=Hello, I need help with...';
    Linking.openURL(emailUrl).catch(err => console.error('Error opening email:', err));
  };

  const handlePhonePress = (phoneNumber) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch(err => console.error('Error opening phone:', err));
  };

  const handleWhatsAppPress = (phoneNumber) => {
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber.replace(/\+/g, '')}&text=Hello, I need help with the app`;
    Linking.openURL(whatsappUrl).catch(() => {
      const webWhatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=Hello, I need help with the app`;
      Linking.openURL(webWhatsappUrl);
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#007AFF', '#1E40AF']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 4}}
      >
        <View style={styles.headerContent}>
          <View style={styles.helpIconContainer}>
            <Ionicons name="help-circle" size={48} color="white" />
          </View>
          <Text style={styles.headerTitle}>Get Help</Text>
          <Text style={styles.headerSubtitle}>
            We're here to help you 24/7. Choose your preferred way to reach us.
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.sectionDescription}>
            Our support team is ready to assist you with any questions or issues.
          </Text>
        </View>

        <View style={styles.contactContainer}>
          <ContactItem
            icon="mail"
            title="Email Support"
            subtitle="stazyapp@gmail.com"
            onPress={handleEmailPress}
          />

          <ContactItem
            icon="call"
            title="Phone Support"
            subtitle="+233 257 464 983"
            onPress={() => handlePhonePress('+233257464983')}
          />

          <ContactItem
            icon="call"
            title="Alternative Phone"
            subtitle="+233 509 651 902"
            onPress={() => handlePhonePress('+233509651902')}
          />

          <ContactItem
            icon="logo-whatsapp"
            title="WhatsApp Support"
            subtitle="+233 257 464 983"
            onPress={() => handleWhatsAppPress('+233257464983')}
          />
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Ionicons name="time" size={24} color="#007AFF" style={styles.infoIcon} />
            <View>
              <Text style={styles.infoTitle}>Response Time</Text>
              <Text style={styles.infoText}>We typically respond within 2-4 hours</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="shield-checkmark" size={24} color="#007AFF" style={styles.infoIcon} />
            <View>
              <Text style={styles.infoTitle}>Support Hours</Text>
              <Text style={styles.infoText}>Monday - Sunday, 8:00 AM - 10:00 PM</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Having trouble? Our team is dedicated to providing you with the best support experience.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  helpIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 22,
  },
  contactContainer: {
    marginBottom: 30,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  infoSection: {
    marginBottom: 30,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoIcon: {
    marginRight: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#64748B',
  },
  footer: {
    backgroundColor: '#EFF6FF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#007AFF',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default GetHelpScreen;