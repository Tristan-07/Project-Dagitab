import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import SensorCard from '../components/SensorCard';
import BottomNavBar from '../components/BottomNavBar';
import { useDagitab } from '../context/DagitabContext';
import { theme } from '../theme';

export default function SoilMonitoringScreen({ navigation }) {
  const { sensors, isRefreshing, refreshSensorData, lastRefreshedAt } = useDagitab();

  const handleSelectSensor = (sensor) => {
    // Parameter passing via React Navigation route params
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
        {/* Header Summary Box */}
        <View style={styles.headerBox}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.pageEyebrow}>LIVE TELEMETRY HUB</Text>
              <Text style={styles.heading}>Soil Monitoring</Text>
            </View>
            <TouchableOpacity
              style={styles.refreshBtn}
              onPress={refreshSensorData}
              activeOpacity={0.8}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.refreshBtnText}>🔄 Refresh Data</Text>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.subheading}>
            Real-time multi-probe soil telemetry stream. Select any parameter card to inspect calibrated ranges, controller pinouts, and sensor diagnostics.
          </Text>
          <View style={styles.metaBadge}>
            <Text style={styles.metaBadgeText}>
              ● Active Polling Interval: 15 min • Last: {lastRefreshedAt}
            </Text>
          </View>
        </View>

        {/* Status Callout Banner */}
        <View style={styles.calloutCard}>
          <Image
            source={require('../assets/dagitab-emblem.png')}
            style={styles.calloutEmblem}
            resizeMode="contain"
          />
          <View style={styles.calloutTextCol}>
            <Text style={styles.calloutTitle}>3 Active Probes Reporting</Text>
            <Text style={styles.calloutDesc}>
              Capacitive moisture, Dallas DS18B20 1-wire thermal, and potentiometric glass pH probe. All signals calibrated.
            </Text>
          </View>
        </View>

        {/* Section Heading */}
        <Text style={styles.sectionHeading}>Active Soil Parameters</Text>

        {/* Sensor Parameter Cards */}
        {sensors.map((sensor) => (
          <SensorCard
            key={sensor.sensorId}
            sensor={sensor}
            onPress={() => handleSelectSensor(sensor)}
          />
        ))}

        {/* Quick Shortcut to History or Analysis */}
        <View style={styles.footerActionRow}>
          <TouchableOpacity
            style={styles.actionBtnOutline}
            onPress={() => navigation.navigate('MonitoringHistory')}
            activeOpacity={0.8}
          >
            <Text style={styles.actionBtnOutlineText}>📜 View Reading History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtnFilled}
            onPress={() => navigation.navigate('SoilAnalysis')}
            activeOpacity={0.85}
          >
            <Text style={styles.actionBtnFilledText}>🧠 Agronomic Advice</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Persistent Bottom Navigation Bar */}
      <BottomNavBar navigation={navigation} currentRoute="SoilMonitoring" />
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
  headerBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderLeftWidth: 5,
    borderLeftColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  pageEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.6,
  },
  heading: {
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.primary,
    letterSpacing: 0.2,
  },
  refreshBtn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  refreshBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  subheading: {
    fontSize: 12.5,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: 8,
  },
  metaBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: theme.colors.borderGreen,
  },
  metaBadgeText: {
    color: theme.colors.secondary,
    fontSize: 10.5,
    fontWeight: '700',
  },
  calloutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.borderGreen,
  },
  calloutEmblem: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  calloutTextCol: {
    flex: 1,
  },
  calloutTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 2,
  },
  calloutDesc: {
    fontSize: 11.5,
    color: theme.colors.textSecondary,
    lineHeight: 15,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  footerActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
    marginBottom: 16,
  },
  actionBtnOutline: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: theme.colors.secondary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionBtnOutlineText: {
    color: theme.colors.secondary,
    fontSize: 12,
    fontWeight: '800',
  },
  actionBtnFilled: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionBtnFilledText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});

