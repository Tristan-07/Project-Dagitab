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

export default function HistoryDetailsScreen({ route, navigation }) {
  // Extract passed route parameter
  const record = route.params?.record;

  if (!record) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Record Not Found</Text>
        <Text style={styles.errorText}>No history record parameters were received by this screen.</Text>
        <TouchableOpacity
          style={styles.returnBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.returnBtnText}>Return to History List</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screenWrapper}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Summary Box */}
        <View style={styles.headerBox}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.recordIdTag}>HISTORICAL TELEMETRY LOG</Text>
              <Text style={styles.sensorHeading}>{record.sensorName}</Text>
            </View>
            <StatusBadge status={record.status} level={record.statusLevel} />
          </View>

          {/* Reading Display */}
          <View style={styles.readingHero}>
            <View style={styles.readingLeft}>
              <Text style={styles.readingNumber}>{record.value}</Text>
              <Text style={styles.readingUnit}>{record.unit}</Text>
            </View>
            <View style={styles.readingRight}>
              <Text style={styles.refLabel}>RECORD REFERENCE</Text>
              <Text style={styles.refValue}>#{record.id}</Text>
              <Text style={styles.timestampText}>🕒 {record.timestamp}</Text>
            </View>
          </View>
        </View>

        {/* Detailed Inspection Information */}
        <Text style={styles.sectionHeading}>Logged Specifications</Text>

        <InfoCard label="RECORD REFERENCE ID" value={`#${record.id}`} highlight />
        <InfoCard label="SOIL PARAMETER" value={`${record.sensorName} (${record.sensorType})`} />
        <InfoCard label="RECORDED TELEMETRY VALUE" value={`${record.value} ${record.unit}`} highlight />
        <InfoCard label="EVALUATION STATUS" value={record.status} />
        <InfoCard label="LOG TIMESTAMP" value={record.timestamp} />
        <InfoCard label="LOCATION / PLOT" value={record.nodeLocation} />
        <InfoCard label="DATA ACQUISITION DEVICE" value={record.deviceUsed} />

        {/* Field Notes Card */}
        <Text style={styles.sectionHeading}>Field Observation Notes</Text>
        <View style={styles.notesCard}>
          <Text style={styles.notesEyebrow}>AGRONOMIC LOG</Text>
          <Text style={styles.notesText}>{record.notes}</Text>
        </View>

        {/* Action Button: Return to History */}
        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.doneBtnText}>← Back to Monitoring History</Text>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordIdTag: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.6,
  },
  sensorHeading: {
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.primary,
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
  readingLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  readingNumber: {
    fontSize: 36,
    fontWeight: '900',
    color: theme.colors.textPrimary,
  },
  readingUnit: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.secondary,
    marginLeft: 4,
  },
  readingRight: {
    alignItems: 'flex-end',
  },
  refLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
  },
  refValue: {
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
  notesCard: {
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
  notesEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 19,
  },
  doneBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: theme.colors.background,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 6,
  },
  errorText: {
    fontSize: 13,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginBottom: 16,
  },
  returnBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  returnBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});

