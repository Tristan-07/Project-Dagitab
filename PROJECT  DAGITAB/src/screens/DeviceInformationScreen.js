import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import InfoCard from '../components/InfoCard';
import BottomNavBar from '../components/BottomNavBar';
import { useDagitab } from '../context/DagitabContext';
import { theme } from '../theme';

export default function DeviceInformationScreen({ navigation }) {
  const { deviceInfo } = useDagitab();

  return (
    <View style={styles.screenWrapper}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hardware Hero Banner */}
        <View style={styles.headerBox}>
          <View style={styles.bannerTop}>
            <View style={styles.iconCircle}>
              <Image
                source={require('../assets/dagitab-emblem.png')}
                style={styles.deviceLogoImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.titleGroup}>
              <Text style={styles.deviceName}>{deviceInfo.deviceName}</Text>
              <Text style={styles.deviceTagline}>{deviceInfo.tagline}</Text>
            </View>
          </View>

          {/* Connection Pill */}
          <View style={styles.connectionBox}>
            <View style={styles.dot} />
            <Text style={styles.connectionText}>
              Status: {deviceInfo.connectionStatus}
            </Text>
          </View>

          <Text style={styles.disclaimerText}>
            ℹ️ Hardware Telemetry Simulation Active. Microcontroller firmware and cloud endpoints are mapped and ready for physical serial/Wi-Fi deployment.
          </Text>
        </View>

        {/* System Overview Specifications */}
        <Text style={styles.sectionHeading}>System Architecture & Telemetry</Text>
        <InfoCard label="NODE IDENTIFIER" value={deviceInfo.nodeId} highlight />
        <InfoCard label="FIRMWARE BUILD" value={deviceInfo.firmwareVersion} />
        <InfoCard label="HARDWARE REVISION" value={deviceInfo.hardwareRevision} />
        <InfoCard label="WIRELESS CONNECTIVITY" value={deviceInfo.networkType} />
        <InfoCard label="TRANSMISSION INTERVAL" value={deviceInfo.transmissionInterval} />
        <InfoCard label="POWER & BATTERY" value={`${deviceInfo.powerSource} (${deviceInfo.batteryLevel})`} />
        <InfoCard label="CLOUD ENDPOINT" value={deviceInfo.cloudEndpoint} />

        {/* Microcontrollers Section */}
        <Text style={styles.sectionHeading}>Embedded Microcontrollers</Text>
        {deviceInfo.controllers.map((ctrl, index) => (
          <View key={index} style={styles.specCard}>
            <View style={styles.specHeaderRow}>
              <Text style={styles.specTitle}>{ctrl.title}</Text>
              <View style={styles.activeTag}>
                <Text style={styles.activeTagText}>● {ctrl.status}</Text>
              </View>
            </View>
            <Text style={styles.specModel}>{ctrl.model}</Text>
            <Text style={styles.specRole}>{ctrl.role}</Text>
            <View style={styles.specMetaRow}>
              <Text style={styles.specMeta}>Clock: {ctrl.clockSpeed}</Text>
              <Text style={styles.specMeta}>Logic: {ctrl.operatingVoltage}</Text>
            </View>
          </View>
        ))}

        {/* Probes and Transducers */}
        <Text style={styles.sectionHeading}>Sensor Probes & Transducers</Text>
        {deviceInfo.sensors.map((sensor, index) => (
          <View key={index} style={styles.specCard}>
            <View style={styles.specHeaderRow}>
              <Text style={styles.specTitle}>{sensor.name}</Text>
              <Text style={styles.specType}>{sensor.type}</Text>
            </View>
            <Text style={styles.specModel}>{sensor.model}</Text>
            <View style={styles.specGrid}>
              <View style={styles.specGridItem}>
                <Text style={styles.specGridLabel}>MEASUREMENT RANGE</Text>
                <Text style={styles.specGridValue}>{sensor.range}</Text>
              </View>
              <View style={styles.specGridItem}>
                <Text style={styles.specGridLabel}>ACCURACY</Text>
                <Text style={styles.specGridValue}>{sensor.accuracy}</Text>
              </View>
            </View>
            <View style={styles.pinoutBox}>
              <Text style={styles.pinoutLabel}>INTERFACE & PINOUT:</Text>
              <Text style={styles.pinoutValue}>{sensor.connectedTo}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Persistent Bottom Navigation Bar */}
      <BottomNavBar navigation={navigation} currentRoute="DeviceInformation" />
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
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderLeftWidth: 5,
    borderLeftColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 3,
  },
  bannerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: theme.colors.borderGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  deviceLogoImage: {
    width: 38,
    height: 38,
  },
  titleGroup: {
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.primary,
    letterSpacing: 0.2,
  },
  deviceTagline: {
    fontSize: 11.5,
    fontWeight: '700',
    color: theme.colors.secondary,
    marginTop: 2,
  },
  connectionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: theme.colors.borderGreen,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: theme.colors.statusOptimal,
    marginRight: 6,
  },
  connectionText: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.secondary,
  },
  disclaimerText: {
    fontSize: 11,
    color: theme.colors.textMuted,
    lineHeight: 15,
    fontStyle: 'italic',
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 10,
    marginTop: 8,
    letterSpacing: 0.3,
  },
  specCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  specHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  specTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  specType: {
    fontSize: 10.5,
    color: theme.colors.textMuted,
    fontWeight: '700',
  },
  activeTag: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  activeTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.statusOptimal,
  },
  specModel: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  specRole: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    lineHeight: 16,
    marginBottom: 8,
  },
  specMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 6,
  },
  specMeta: {
    fontSize: 11,
    color: theme.colors.textMuted,
    fontWeight: '600',
  },
  specGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 8,
  },
  specGridItem: {
    flex: 1,
  },
  specGridLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  specGridValue: {
    fontSize: 11.5,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  pinoutBox: {
    backgroundColor: '#F0FDF4',
    padding: 8,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.secondary,
  },
  pinoutLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: theme.colors.secondary,
    marginBottom: 2,
  },
  pinoutValue: {
    fontSize: 11.5,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
});

