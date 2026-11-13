import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import StatusBadge from '../components/StatusBadge';
import BottomNavBar from '../components/BottomNavBar';
import { useDagitab } from '../context/DagitabContext';
import { theme } from '../theme';

export default function MonitoringHistoryScreen({ navigation }) {
  const { historyRecords } = useDagitab();
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Filter history records based on selected parameter category
  const filteredRecords = historyRecords.filter((record) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'MOISTURE') return record.sensorId === 'DAG-SM-01';
    if (activeFilter === 'TEMP') return record.sensorId === 'DAG-ST-02';
    if (activeFilter === 'PH') return record.sensorId === 'DAG-PH-03';
    return true;
  });

  const handleSelectRecord = (record) => {
    // Navigate to HistoryDetails with parameter passing
    navigation.navigate('HistoryDetails', { record });
  };

  return (
    <View style={styles.screenWrapper}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Box */}
        <View style={styles.headerBox}>
          <Text style={styles.pageEyebrow}>TELEMETRY LOG ARCHIVE</Text>
          <Text style={styles.heading}>Monitoring History</Text>
          <Text style={styles.subheading}>
            Chronological field logs captured by DAGITAB IoT nodes. Tap any record to inspect complete telemetry details.
          </Text>
          <View style={styles.badgeRow}>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>
                {filteredRecords.length} Recorded Readings
              </Text>
            </View>
          </View>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterContainer}>
          {[
            { key: 'ALL', label: 'All Probes' },
            { key: 'MOISTURE', label: '💧 Moisture' },
            { key: 'TEMP', label: '🌡️ Temp' },
            { key: 'PH', label: '🧪 pH' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.filterTab,
                activeFilter === tab.key && styles.filterTabActive,
              ]}
              onPress={() => setActiveFilter(tab.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterTabText,
                  activeFilter === tab.key && styles.filterTabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* List of History Records */}
        {filteredRecords.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>📂</Text>
            <Text style={styles.emptyTitle}>No Records Found</Text>
            <Text style={styles.emptyText}>
              No historical sensor samples match the active filter criteria.
            </Text>
          </View>
        ) : (
          filteredRecords.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.recordCard}
              onPress={() => handleSelectRecord(item)}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={`View record ${item.id} for ${item.sensorName}`}
            >
              <View style={styles.recordTopRow}>
                <View style={styles.recordTitleGroup}>
                  <Text style={styles.recordSensorName}>{item.sensorName}</Text>
                  <Text style={styles.recordIdTag}>#{item.id}</Text>
                </View>
                <StatusBadge status={item.status} level={item.statusLevel} />
              </View>

              <View style={styles.recordValueRow}>
                <View style={styles.recordValueGroup}>
                  <Text style={styles.recordValueNumber}>{item.value}</Text>
                  <Text style={styles.recordValueUnit}>{item.unit}</Text>
                </View>
                <View style={styles.recordLocationGroup}>
                  <Text style={styles.recordLocationText}>📍 {item.nodeLocation}</Text>
                </View>
              </View>

              <View style={styles.recordFooter}>
                <Text style={styles.recordTimeText}>🕒 {item.timestamp}</Text>
                <Text style={styles.viewRecordText}>View Record →</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Persistent Bottom Navigation Bar */}
      <BottomNavBar navigation={navigation} currentRoute="MonitoringHistory" />
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
  pageEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  heading: {
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.primary,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  subheading: {
    fontSize: 12.5,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
  },
  countBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.borderGreen,
  },
  countBadgeText: {
    color: theme.colors.secondary,
    fontSize: 11,
    fontWeight: '800',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  filterTab: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterTabActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterTabText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textSecondary,
  },
  filterTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  recordTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordTitleGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  recordSensorName: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  recordIdTag: {
    fontSize: 11,
    color: theme.colors.textMuted,
    fontWeight: '600',
  },
  recordValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  recordValueGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  recordValueNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.textPrimary,
  },
  recordValueUnit: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginLeft: 3,
  },
  recordLocationGroup: {
    alignItems: 'flex-end',
  },
  recordLocationText: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  recordFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 8,
  },
  recordTimeText: {
    fontSize: 10.5,
    color: theme.colors.textLight,
  },
  viewRecordText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: theme.colors.secondary,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: 10,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 12.5,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
});

