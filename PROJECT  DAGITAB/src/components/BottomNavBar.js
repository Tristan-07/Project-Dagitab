import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { theme } from '../theme';

export default function BottomNavBar({ navigation, currentRoute }) {
  const handleNav = (screenName, params) => {
    if (currentRoute === screenName) return;
    navigation.navigate(screenName, params);
  };

  return (
    <View style={styles.barContainer}>
      {/* 1. Soil Monitoring */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNav('SoilMonitoring')}
        activeOpacity={0.7}
      >
        <Text style={[styles.navIcon, currentRoute === 'SoilMonitoring' && styles.activeIcon]}>
          🌱
        </Text>
        <Text style={[styles.navLabel, currentRoute === 'SoilMonitoring' && styles.activeLabel]}>
          Soil
        </Text>
      </TouchableOpacity>

      {/* 2. Monitoring History */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNav('MonitoringHistory')}
        activeOpacity={0.7}
      >
        <Text style={[styles.navIcon, currentRoute === 'MonitoringHistory' && styles.activeIcon]}>
          📊
        </Text>
        <Text style={[styles.navLabel, currentRoute === 'MonitoringHistory' && styles.activeLabel]}>
          History
        </Text>
      </TouchableOpacity>

      {/* 3. CENTER HOME BUTTON (Raised & Prominent) */}
      <View style={styles.centerButtonWrapper}>
        <TouchableOpacity
          style={[styles.centerButton, currentRoute === 'Dashboard' && styles.centerButtonActive]}
          onPress={() => handleNav('Dashboard')}
          activeOpacity={0.85}
        >
          <Image
            source={require('../assets/dagitab-emblem.png')}
            style={styles.centerLogo}
            resizeMode="contain"
          />
          <Text style={styles.centerLabel}>HOME</Text>
        </TouchableOpacity>
      </View>

      {/* 4. Soil Analysis & Recommendations */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNav('SoilAnalysis')}
        activeOpacity={0.7}
      >
        <Text style={[styles.navIcon, currentRoute === 'SoilAnalysis' && styles.activeIcon]}>
          🧠
        </Text>
        <Text style={[styles.navLabel, currentRoute === 'SoilAnalysis' && styles.activeLabel]}>
          Analysis
        </Text>
      </TouchableOpacity>

      {/* 5. Device Information */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNav('DeviceInformation')}
        activeOpacity={0.7}
      >
        <Text style={[styles.navIcon, currentRoute === 'DeviceInformation' && styles.activeIcon]}>
          📡
        </Text>
        <Text style={[styles.navLabel, currentRoute === 'DeviceInformation' && styles.activeLabel]}>
          Device
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: '#E2E8F0',
    height: Platform.OS === 'ios' ? 76 : 64,
    paddingBottom: Platform.OS === 'ios' ? 14 : 4,
    paddingHorizontal: 8,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 12,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  navIcon: {
    fontSize: 19,
    marginBottom: 2,
    opacity: 0.65,
  },
  activeIcon: {
    opacity: 1,
    transform: [{ scale: 1.15 }],
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textMuted,
    letterSpacing: 0.2,
  },
  activeLabel: {
    color: theme.colors.primary,
    fontWeight: '800',
  },
  centerButtonWrapper: {
    width: 66,
    alignItems: 'center',
    justifyContent: 'center',
    top: -14,
  },
  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 8,
  },
  centerButtonActive: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.accent,
  },
  centerLogo: {
    width: 26,
    height: 26,
    marginBottom: 1,
  },
  centerLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
