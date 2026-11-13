import React from 'react';
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

export default function SoilAnalysisScreen({ navigation }) {
  const { sensors, cropProfiles, selectedCrop, setSelectedCrop } = useDagitab();

  const moistureSensor = sensors.find((s) => s.sensorId === 'DAG-SM-01') || sensors[0];
  const tempSensor = sensors.find((s) => s.sensorId === 'DAG-ST-02') || sensors[1];
  const phSensor = sensors.find((s) => s.sensorId === 'DAG-PH-03') || sensors[2];

  // Dynamic Rule-Based Analysis based on selected crop profile
  const getMoistureAnalysis = () => {
    const val = moistureSensor?.currentValue ?? 42;
    if (val < 30) {
      return {
        status: 'Low Moisture',
        level: 'warning',
        action: 'Watering Recommended',
        actionType: 'warning',
        explanation: `Soil moisture (${val}%) is below the healthy root retention zone for ${selectedCrop.name}. The capillary flow to root hairs is constrained.`,
        guideline: 'Initiate targeted drip irrigation for 20-30 minutes. Verify soil moisture depth after 1 hour.',
      };
    } else if (val > 60) {
      return {
        status: 'High Moisture',
        level: 'warning',
        action: 'Withhold Irrigation',
        actionType: 'warning',
        explanation: `Soil moisture (${val}%) is elevated. Prolonged saturation displaces air pores in the root zone and risks root fungal rot.`,
        guideline: 'Pause all automated irrigation cycles. Check bed drainage channels to prevent pooling.',
      };
    }
    return {
      status: 'Optimal Moisture',
      level: 'optimal',
      action: 'Standard Observation',
      actionType: 'optimal',
      explanation: `Soil moisture (${val}%) is in equilibrium with transpiration needs for ${selectedCrop.name}.`,
      guideline: 'No immediate watering required. Maintain automated sensor surveillance mode.',
    };
  };

  const getTemperatureAnalysis = () => {
    const val = tempSensor?.currentValue ?? 26.8;
    if (val < 18) {
      return {
        status: 'Cold Substrate',
        level: 'warning',
        action: 'Warm Root Zone',
        explanation: `Soil temperature (${val}°C) is cool. Seed germination rates and microbial phosphorus release slow down significantly below 18°C.`,
        guideline: 'Consider using black horticultural mulch or cloches to absorb daytime solar radiation.',
      };
    } else if (val > 32) {
      return {
        status: 'Elevated Temperature',
        level: 'danger',
        action: 'Thermal Protection',
        explanation: `Soil temperature (${val}°C) exceeds normal vegetative tolerance. Beneficial mycorrhizal fungi undergo thermal stress.`,
        guideline: 'Apply 2-3 inches of light straw mulch to shade the topsoil and reduce midday evaporation.',
      };
    }
    return {
      status: 'Normal Metabolic Zone',
      level: 'normal',
      action: 'Conditions Favorable',
      explanation: `Soil temperature (${val}°C) supports ideal biochemical enzymes and root respiration rates.`,
      guideline: 'Microbial decomposition and root uptake are operating normally.',
    };
  };

  const getPhAnalysis = () => {
    const val = phSensor?.currentValue ?? 6.5;
    if (val < 5.8) {
      return {
        status: 'Acidic Substrate',
        level: 'warning',
        action: 'Alkaline Amendment',
        explanation: `Measured pH (${val}) indicates acidic soil. At low pH, aluminum and manganese toxicity risks rise while phosphorus becomes chemically locked.`,
        guideline: 'Test calcium carbonate (agricultural lime or dolomite) buffer capacity before planting.',
      };
    } else if (val > 7.3) {
      return {
        status: 'Alkaline Substrate',
        level: 'warning',
        action: 'Acidifying Amendment',
        explanation: `Measured pH (${val}) indicates alkaline soil. Micronutrients such as iron, zinc, and manganese precipitate and become inaccessible.`,
        guideline: 'Incorporate well-composted organic pine needles, peat moss, or agricultural elemental sulfur.',
      };
    }
    return {
      status: 'Optimal Bioavailability',
      level: 'optimal',
      action: 'Nutrient Window Open',
      explanation: `Measured pH (${val}) sits in the sweet spot for primary macronutrients (Nitrogen, Phosphorus, Potassium).`,
      guideline: 'Root cation-exchange capacity is optimal. No soil pH correction needed.',
    };
  };

  const moistureAnalysis = getMoistureAnalysis();
  const tempAnalysis = getTemperatureAnalysis();
  const phAnalysis = getPhAnalysis();

  return (
    <View style={styles.screenWrapper}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Summary Box */}
        <View style={styles.headerBox}>
          <Text style={styles.pageEyebrow}>AGRONOMIC INTELLIGENCE ENGINE</Text>
          <Text style={styles.heading}>Soil Analysis</Text>
          <Text style={styles.subheading}>
            Rule-based agronomic interpretation engine evaluating root-zone moisture, thermal health, and chemical bioavailability.
          </Text>
        </View>

        {/* Configurable Crop Profile Selector */}
        <View style={styles.cropSelectorContainer}>
          <Text style={styles.selectorLabel}>SELECT CROP PROFILE (ADAPTIVE THRESHOLDS):</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cropScroll}
          >
            {cropProfiles.map((crop) => (
              <TouchableOpacity
                key={crop.id}
                style={[
                  styles.cropChip,
                  selectedCrop.id === crop.id && styles.cropChipActive,
                ]}
                onPress={() => setSelectedCrop(crop)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.cropChipText,
                    selectedCrop.id === crop.id && styles.cropChipTextActive,
                  ]}
                >
                  {crop.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.cropNotesText}>🌾 {selectedCrop.notes}</Text>
        </View>

        {/* PARAMETER 1: Soil Moisture Analysis */}
        <View style={styles.analysisCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.cardEmoji}>💧</Text>
              <View>
                <Text style={styles.cardTitle}>Soil Moisture Interpretation</Text>
                <Text style={styles.cardReading}>
                  Current Reading: {moistureSensor.currentValue}
                  {moistureSensor.unit} • Target: {selectedCrop.moistureIdeal}
                </Text>
              </View>
            </View>
            <StatusBadge status={moistureAnalysis.status} level={moistureAnalysis.level} />
          </View>
          <Text style={styles.analysisBody}>{moistureAnalysis.explanation}</Text>
          <View style={styles.actionBox}>
            <Text style={styles.actionHeader}>💡 RECOMMENDED ACTION:</Text>
            <Text style={styles.actionText}>{moistureAnalysis.guideline}</Text>
          </View>
        </View>

        {/* PARAMETER 2: Soil Temperature Analysis */}
        <View style={styles.analysisCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.cardEmoji}>🌡️</Text>
              <View>
                <Text style={styles.cardTitle}>Soil Temperature Interpretation</Text>
                <Text style={styles.cardReading}>
                  Current Reading: {tempSensor.currentValue}
                  {tempSensor.unit} • Target: {selectedCrop.tempIdeal}
                </Text>
              </View>
            </View>
            <StatusBadge status={tempAnalysis.status} level={tempAnalysis.level} />
          </View>
          <Text style={styles.analysisBody}>{tempAnalysis.explanation}</Text>
          <View style={styles.actionBox}>
            <Text style={styles.actionHeader}>💡 RECOMMENDED ACTION:</Text>
            <Text style={styles.actionText}>{tempAnalysis.guideline}</Text>
          </View>
        </View>

        {/* PARAMETER 3: Soil pH Analysis */}
        <View style={styles.analysisCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.cardEmoji}>🧪</Text>
              <View>
                <Text style={styles.cardTitle}>Soil pH & Bioavailability</Text>
                <Text style={styles.cardReading}>
                  Current Reading: {phSensor.currentValue} {phSensor.unit} • Target: {selectedCrop.phIdeal}
                </Text>
              </View>
            </View>
            <StatusBadge status={phAnalysis.status} level={phAnalysis.level} />
          </View>
          <Text style={styles.analysisBody}>{phAnalysis.explanation}</Text>
          <View style={styles.actionBox}>
            <Text style={styles.actionHeader}>💡 RECOMMENDED ACTION:</Text>
            <Text style={styles.actionText}>{phAnalysis.guideline}</Text>
          </View>
        </View>

        {/* Academic & Scientific Transparency Notice */}
        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>⚠️ Agronomic Evaluation Transparency</Text>
          <Text style={styles.noticeBody}>
            Soil parameters vary across specific cultivars, geographic soils (loam, clay, sand), and drainage profiles. Interpretations provided here are rule-based advisory guidelines and should be corroborated with local agricultural extension tests.
          </Text>
        </View>
      </ScrollView>

      {/* Persistent Bottom Navigation Bar */}
      <BottomNavBar navigation={navigation} currentRoute="SoilAnalysis" />
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
  },
  cropSelectorContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectorLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  cropScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 4,
  },
  cropChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cropChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  cropChipText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: theme.colors.textSecondary,
  },
  cropChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  cropNotesText: {
    fontSize: 11.5,
    color: theme.colors.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
  analysisCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardEmoji: {
    fontSize: 22,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  cardReading: {
    fontSize: 11,
    color: theme.colors.textMuted,
    fontWeight: '600',
    marginTop: 1,
  },
  analysisBody: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  actionBox: {
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 3.5,
    borderLeftColor: theme.colors.secondary,
  },
  actionHeader: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.secondary,
    letterSpacing: 0.4,
    marginBottom: 3,
  },
  actionText: {
    fontSize: 12.5,
    color: theme.colors.textPrimary,
    lineHeight: 17,
    fontWeight: '600',
  },
  noticeCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 14,
  },
  noticeTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: 4,
  },
  noticeBody: {
    fontSize: 11.5,
    color: '#78350F',
    lineHeight: 16,
  },
});

