import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { theme } from '../theme';

export default function WelcomeSplashScreen({ navigation }) {
  useEffect(() => {
    // Automatically transition to the dashboard after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Dashboard');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

      {/* Decorative Accent Bar */}
      <View style={styles.topAccentBar} />

      <View style={styles.content}>
        {/* Official DAGITAB Brand Logo Container */}
        <View style={styles.logoWrapper}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* App Title and Branding */}
        <Text style={styles.appName}>DAGITAB</Text>
        <View style={styles.taglineBadge}>
          <Text style={styles.taglineText}>Smart Soil • Smarter Tomorrow</Text>
        </View>
        <Text style={styles.subtext}>
          Igniting the Future of Smart Agriculture
        </Text>

        {/* Tech Stack Indicator */}
        <View style={styles.techPill}>
          <Text style={styles.techText}>ESP32-S3 • Arduino Uno • Smart Telemetry</Text>
        </View>

        {/* Loading Spinner */}
        <View style={styles.loaderArea}>
          <ActivityIndicator size="small" color={theme.colors.accent} />
          <Text style={styles.loaderText}>Connecting to Soil Telemetry...</Text>
        </View>

        {/* Manual Enter Button */}
        <TouchableOpacity
          style={styles.enterButton}
          onPress={() => navigation.replace('Dashboard')}
          activeOpacity={0.85}
        >
          <Text style={styles.enterButtonText}>Open DAGITAB Dashboard →</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerNote}>Sample Data Simulation Mode • Ready for IoT Pairing</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 24,
  },
  topAccentBar: {
    width: 60,
    height: 4,
    backgroundColor: theme.colors.accent,
    borderRadius: 2,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  logoWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  logoImage: {
    width: 118,
    height: 118,
  },
  appName: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 3,
    textAlign: 'center',
  },
  taglineBadge: {
    backgroundColor: 'rgba(132, 204, 22, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.accent,
    marginTop: 8,
    marginBottom: 6,
  },
  taglineText: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.accent,
    letterSpacing: 0.8,
  },
  subtext: {
    fontSize: 13,
    color: '#D1FAE5',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
    fontWeight: '600',
  },
  techPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 24,
  },
  techText: {
    fontSize: 11,
    color: '#ECFCCB',
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  loaderArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  loaderText: {
    color: '#F0FDF4',
    fontSize: 12.5,
    fontWeight: '600',
  },
  enterButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  enterButtonText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  footerNote: {
    color: '#A7F3D0',
    fontSize: 11,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
