import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import SensorCard from '../components/SensorCard';
import BottomNavBar from '../components/BottomNavBar';
import { useDagitab } from '../context/DagitabContext';
import { theme } from '../theme';

export default function DashboardScreen({ navigation }) {
  const {
    sensors,
    deviceInfo,
    isRefreshing,
    refreshSensorData,
    lastRefreshedAt,
  } = useDagitab();

  // Navigation handler to Sensor Details with parameter passing
  const handleSensorPress = (sensor) => {
    navigation.navigate('SensorDetails', {
      sensorId: sensor.sensorId,
      sensorName: sensor.sensorName,
      sensorType: sensor.sensorType,
      currentValue: sensor.currentValue,
      unit: sensor.unit,
      status: sensor.status,
      statusLevel: sensor.statusLevel,
      lastUpdated: sensor.lastUpdated,
      idealRange: sensor.idealRange,
      minThreshold: sensor.minThreshold,
      maxThreshold: sensor.maxThreshold,
      hardwareModel: sensor.hardwareModel,
      pinConnection: sensor.pinConnection,
      controller: sensor.controller,
      description: sensor.description,
      interpretation: sensor.interpretation,
      recommendation: sensor.recommendation,
      historyTrend: sensor.historyTrend,
      icon: sensor.icon,
    });
  };

  return (
    <View style={styles.screenWrapper}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Banner with DAGITAB Identity */}
        <View style={styles.brandBanner}>
          <View style={styles.brandHeader}>
            <View style={styles.logoPill}>
              <Image
                source={require('../assets/dagitab-emblem.png')}
                style={styles.logoPillImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.brandTextGroup}>
              <Text style={styles.brandTitle}>DAGITAB</Text>
              <Text style={styles.brandTagline}>Smart Soil • Smarter Tomorrow</Text>
            </View>
          </View>

          {/* Connection Status & Mode Pill */}
          <View style={styles.statusRow}>
            <View style={styles.connectionBadge}>
              <View style={styles.onlineDot} />
              <Text style={styles.connectionText}>
                {deviceInfo.nodeId} • {deviceInfo.connectionStatus}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.refreshButton}
              onPress={refreshSensorData}
              activeOpacity={0.8}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.refreshButtonText}>🔄 Sync</Text>
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.sampleModeNotice}>
            ℹ️ Running in Sample-Data Telemetry Mode • Ready for ESP32-S3 hardware sync
          </Text>
        </View>

        {/* Welcome & Overview Header */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeGreeting}>Welcome, Agri-Grower 👋</Text>
          <Text style={styles.welcomeSubtext}>
            Real-time IoT soil parameters as of {lastRefreshedAt}. All readings within safe margins.
          </Text>
        </View>

        {/* Quick Overview Summary Banner */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <Text style={styles.overviewEyebrow}>OVERALL SOIL HEALTH INDEX</Text>
            <View style={styles.optimalPill}>
              <Text style={styles.optimalPillText}>● Optimal Growth State</Text>
            </View>
          </View>
          <Text style={styles.overviewHeadline}>Nutrient & Moisture Retention Balanced</Text>
          <Text style={styles.overviewDescription}>
            Moisture is 42% (target 35-55%), temperature is 26.8°C, and pH is 6.5. Root respiration is operating under favorable biological conditions.
          </Text>
          <TouchableOpacity
            style={styles.fullAnalysisLink}
            onPress={() => navigation.navigate('SoilAnalysis')}
            activeOpacity={0.8}
          >
            <Text style={styles.fullAnalysisLinkText}>View Agronomic Analysis & Advice →</Text>
          </TouchableOpacity>
        </View>

        {/* Section Title: Live Monitored Parameters */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Current Soil Parameters</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SoilMonitoring')}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAllText}>Monitoring View →</Text>
          </TouchableOpacity>
        </View>

        {/* 3 Clickable Soil Parameter Cards (Demonstrating Route Parameter Passing) */}
        {sensors.map((sensor) => (
          <SensorCard
            key={sensor.sensorId}
            sensor={sensor}
            onPress={() => handleSensorPress(sensor)}
          />
        ))}

        {/* Quick Feature Navigation Hub */}
        <Text style={styles.sectionTitle}>Application Modules</Text>
        <View style={styles.navGrid}>
          {/* Module 1: Soil Monitoring */}
          <TouchableOpacity
            style={styles.navGridItem}
            onPress={() => navigation.navigate('SoilMonitoring')}
            activeOpacity={0.85}
          >
            <Text style={styles.gridIcon}>🌱</Text>
            <Text style={styles.gridTitle}>Soil Monitoring</Text>
            <Text style={styles.gridDesc}>Dedicated live gauges & parameter cards</Text>
          </TouchableOpacity>

          {/* Module 2: Monitoring History */}
          <TouchableOpacity
            style={styles.navGridItem}
            onPress={() => navigation.navigate('MonitoringHistory')}
            activeOpacity={0.85}
          >
            <Text style={styles.gridIcon}>📊</Text>
            <Text style={styles.gridTitle}>Reading History</Text>
            <Text style={styles.gridDesc}>Time-series log records & field inspections</Text>
          </TouchableOpacity>

          {/* Module 3: Soil Analysis */}
          <TouchableOpacity
            style={styles.navGridItem}
            onPress={() => navigation.navigate('SoilAnalysis')}
            activeOpacity={0.85}
          >
            <Text style={styles.gridIcon}>🧠</Text>
            <Text style={styles.gridTitle}>Soil Analysis</Text>
            <Text style={styles.gridDesc}>Rule-based crop guides & watering advice</Text>
          </TouchableOpacity>

          {/* Module 4: Device Info */}
          <TouchableOpacity
            style={styles.navGridItem}
            onPress={() => navigation.navigate('DeviceInformation')}
            activeOpacity={0.85}
          >
            <Text style={styles.gridIcon}>📡</Text>
            <Text style={styles.gridTitle}>Device Hardware</Text>
            <Text style={styles.gridDesc}>Arduino Uno, ESP32-S3 & sensor specs</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Persistent Bottom Navigation Bar */}
      <BottomNavBar navigation={navigation} currentRoute="Dashboard" />
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  brandBanner: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoPill: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  logoPillImage: {
    width: 36,
    height: 36,
  },
  brandTextGroup: {
    flex: 1,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.2,
  },
  brandTagline: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.accent,
    letterSpacing: 0.4,
    marginTop: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 8,
  },
  connectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.accent,
    marginRight: 6,
  },
  connectionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  refreshButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4.5,
    borderRadius: 6,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  sampleModeNotice: {
    fontSize: 10.5,
    color: '#D1FAE5',
    fontStyle: 'italic',
  },
  welcomeSection: {
    marginBottom: 14,
  },
  welcomeGreeting: {
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.textPrimary,
  },
  welcomeSubtext: {
    fontSize: 12.5,
    color: theme.colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.borderGreen,
    borderLeftWidth: 5,
    borderLeftColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  overviewEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.6,
  },
  optimalPill: {
    backgroundColor: theme.colors.statusOptimalBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.statusOptimalBorder,
  },
  optimalPillText: {
    color: theme.colors.statusOptimal,
    fontSize: 10.5,
    fontWeight: '800',
  },
  overviewHeadline: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  overviewDescription: {
    fontSize: 12.5,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  fullAnalysisLink: {
    paddingVertical: 4,
  },
  fullAnalysisLinkText: {
    color: theme.colors.secondary,
    fontSize: 12.5,
    fontWeight: '800',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.primary,
    letterSpacing: 0.2,
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.secondary,
  },
  navGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  navGridItem: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  gridIcon: {
    fontSize: 26,
    marginBottom: 6,
  },
  gridTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 3,
  },
  gridDesc: {
    fontSize: 11,
    color: theme.colors.textMuted,
    lineHeight: 14,
  },
});
