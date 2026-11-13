import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import StatusBadge from '../components/StatusBadge';
import InfoCard from '../components/InfoCard';
import { theme } from '../theme';

export default function SensorDetailsScreen({ route, navigation }) {
  // Extract passed route parameters
  const params = route.params || {};

  const {
    sensorId = 'DAG-UNKNOWN',
    sensorName = 'Soil Parameter',
    sensorType = 'Telemetry Probe',
    currentValue = '--',
    unit = '',
    status = 'Optimal',
    statusLevel = 'optimal',
    lastUpdated = 'Recently',
    idealRange = 'Standard agronomic zone',
    hardwareModel = 'DAGITAB Agricultural Sensor Probe',
    pinConnection = 'ESP32-S3 / Arduino Interface',
    controller = 'ESP32-S3 / Arduino Uno',
    description = 'Monitors physiological and chemical root-zone characteristics.',
    interpretation = 'Values indicate standard healthy conditions.',
    recommendation = 'Maintain regular observation and standard watering schedule.',
    historyTrend = [],
    icon = '🌱',
  } = params;

  // Visual accent color based on parameter type
  let accentColor = theme.colors.primary;
  let bgTint = '#F0FDF4';

  if (sensorId === 'DAG-SM-01') {
    accentColor = theme.colors.moisture;
    bgTint = theme.colors.moistureBg;
  } else if (sensorId === 'DAG-ST-02') {
    accentColor = theme.colors.temperature;
    bgTint = theme.colors.temperatureBg;
  } else if (sensorId === 'DAG-PH-03') {
    accentColor = theme.colors.ph;
    bgTint = theme.colors.phBg;
  }

  return (
    <View style={styles.screenWrapper}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Dynamic Header Summary Box based on passed sensor parameter */}
        <View style={styles.headerBox}>
          <View style={styles.titleRow}>
            <View style={styles.headerTitleGroup}>
              <View style={[styles.iconCircle, { backgroundColor: bgTint }]}>
                <Text style={styles.iconEmoji}>{icon}</Text>
              </View>
              <View style={styles.headerTextGroup}>
                <Text style={styles.sensorHeading}>{sensorName}</Text>
                <Text style={styles.sensorSubheading}>{sensorType}</Text>
              </View>
            </View>

            <StatusBadge status={status} level={statusLevel} />
          </View>

          {/* Primary Metric Reading Display */}
          <View style={styles.readingHero}>
            <View style={styles.readingHeroLeft}>
              <Text style={styles.readingNumber}>{currentValue}</Text>
              <Text style={styles.readingUnitLabel}>{unit}</Text>
            </View>
            <View style={styles.readingHeroRight}>
              <Text style={styles.sensorIdLabel}>SENSOR ID</Text>
              <Text style={styles.sensorIdValue}>#{sensorId}</Text>
              <Text style={styles.timestampText}>🕒 {lastUpdated}</Text>
            </View>
          </View>
        </View>

        {/* Dynamic Interpretation & Action Advice */}
        <Text style={styles.sectionHeading}>Agronomic Interpretation & Action</Text>
        <View style={styles.adviceCard}>
          <Text style={styles.adviceLabel}>OBSERVATION ASSESSMENT</Text>
          <Text style={styles.adviceBody}>{interpretation}</Text>
          <View style={styles.divider} />
          <Text style={styles.adviceLabel}>SUGGESTED GROWER ACTION</Text>
          <Text style={[styles.adviceBody, { color: theme.colors.primary, fontWeight: '700' }]}>
            {recommendation}
          </Text>
        </View>

        {/* Dynamic Sensor Specifications Passed from Navigation */}
        <Text style={styles.sectionHeading}>Sensor Telemetry & Hardware Specs</Text>
        <InfoCard label="MONITORED PARAMETER" value={sensorName} highlight />
        <InfoCard label="CURRENT READING" value={`${currentValue} ${unit}`} highlight />
        <InfoCard label="AGRONOMIC IDEAL TARGET" value={idealRange} />
        <InfoCard label="SENSOR HARDWARE MODEL" value={hardwareModel} />
        <InfoCard label="MICROCONTROLLER INTERFACE" value={controller} />
        <InfoCard label="PINOUT & DATA BUS" value={pinConnection} />
        <InfoCard label="PHYSIOLOGICAL PURPOSE" value={description} />

        {/* Recent Sample Trend Points */}
        {historyTrend && historyTrend.length > 0 ? (
          <View style={styles.historyTrendSection}>
            <Text style={styles.sectionHeading}>Recent 24-Hour Telemetry Log</Text>
            <View style={styles.trendTable}>
              {historyTrend.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.trendRow,
                    index === historyTrend.length - 1 && styles.trendRowLast,
                  ]}
                >
                  <Text style={styles.trendTime}>⏰ {item.time}</Text>
                  <Text style={styles.trendValue}>
                    {item.value} {unit}
                  </Text>
                  <Text style={styles.trendStatus}>● {item.status}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {/* Bottom Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.backButtonText}>← Return to Monitoring</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  headerBox: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconEmoji: {
    fontSize: 24,
  },
  headerTextGroup: {
    flex: 1,
  },
  sensorHeading: {
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.textPrimary,
  },
  sensorSubheading: {
    fontSize: 11,
    color: theme.colors.textMuted,
    fontWeight: '600',
    marginTop: 1,
  },
  readingHero: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  readingHeroLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  readingNumber: {
    fontSize: 38,
    fontWeight: '900',
    color: theme.colors.textPrimary,
  },
  readingUnitLabel: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.secondary,
    marginLeft: 6,
  },
  readingHeroRight: {
    alignItems: 'flex-end',
  },
  sensorIdLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
  },
  sensorIdValue: {
    fontSize: 12.5,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 2,
  },
  timestampText: {
    fontSize: 10.5,
    color: theme.colors.textLight,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 10,
    marginTop: 6,
    letterSpacing: 0.3,
  },
  adviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.borderGreen,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.accent,
    marginBottom: 16,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  adviceLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  adviceBody: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 10,
  },
  historyTrendSection: {
    marginTop: 4,
    marginBottom: 14,
  },
  trendTable: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  trendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  trendRowLast: {
    borderBottomWidth: 0,
  },
  trendTime: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  trendValue: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  trendStatus: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.secondary,
  },
  backButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});

