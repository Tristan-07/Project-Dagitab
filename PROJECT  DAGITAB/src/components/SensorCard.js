import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import StatusBadge from './StatusBadge';
import { theme } from '../theme';

export default function SensorCard({ sensor, onPress }) {
  if (!sensor) return null;

  // Visual accent color based on sensor type
  let accentColor = theme.colors.primary;
  let bgTint = '#F0FDF4';

  if (sensor.sensorId === 'DAG-SM-01') {
    accentColor = theme.colors.moisture;
    bgTint = theme.colors.moistureBg;
  } else if (sensor.sensorId === 'DAG-ST-02') {
    accentColor = theme.colors.temperature;
    bgTint = theme.colors.temperatureBg;
  } else if (sensor.sensorId === 'DAG-PH-03') {
    accentColor = theme.colors.ph;
    bgTint = theme.colors.phBg;
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`Open details for ${sensor.sensorName}`}
    >
      {/* Top Row: Icon + Name + Status */}
      <View style={styles.topRow}>
        <View style={styles.nameSection}>
          <View style={[styles.iconContainer, { backgroundColor: bgTint }]}>
            <Text style={styles.icon}>{sensor.icon || '🌱'}</Text>
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.sensorName}>{sensor.sensorName}</Text>
            <Text style={styles.sensorType}>{sensor.sensorType}</Text>
          </View>
        </View>

        <StatusBadge status={sensor.status} level={sensor.statusLevel} />
      </View>

      {/* Middle Row: Large Value + Unit */}
      <View style={styles.readingRow}>
        <View style={styles.valueGroup}>
          <Text style={[styles.readingValue, { color: theme.colors.textPrimary }]}>
            {sensor.currentValue}
          </Text>
          <Text style={styles.readingUnit}>{sensor.unit}</Text>
        </View>

        <View style={styles.rangeInfo}>
          <Text style={styles.rangeLabel}>IDEAL TARGET</Text>
          <Text style={styles.rangeValue}>{sensor.idealRange}</Text>
        </View>
      </View>

      {/* Mini Progress / Level Bar */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressBar,
            {
              backgroundColor: accentColor,
              width:
                sensor.unit === '%'
                  ? `${Math.min(100, Math.max(10, sensor.currentValue))}%`
                  : sensor.unit === '°C'
                  ? `${Math.min(100, Math.max(15, (sensor.currentValue / 40) * 100))}%`
                  : `${Math.min(100, Math.max(20, (sensor.currentValue / 14) * 100))}%`,
            },
          ]}
        />
      </View>

      {/* Bottom Footer: Click affordance & Timestamp */}
      <View style={styles.footerRow}>
        <Text style={styles.updatedText}>🕒 {sensor.lastUpdated}</Text>
        <Text style={[styles.viewDetailsText, { color: theme.colors.secondary }]}>
          Details →
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  nameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  icon: {
    fontSize: 22,
  },
  titleWrapper: {
    flex: 1,
  },
  sensorName: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    letterSpacing: 0.2,
  },
  sensorType: {
    fontSize: 11,
    color: theme.colors.textMuted,
    fontWeight: '500',
    marginTop: 1,
  },
  readingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  valueGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  readingValue: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  readingUnit: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  rangeInfo: {
    alignItems: 'flex-end',
  },
  rangeLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  rangeValue: {
    fontSize: 12.5,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 8,
  },
  updatedText: {
    fontSize: 10.5,
    color: theme.colors.textLight,
    fontWeight: '500',
  },
  viewDetailsText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});

