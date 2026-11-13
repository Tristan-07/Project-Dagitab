import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function InfoCard({ label, value, subtext, highlight = false }) {
  return (
    <View style={[styles.card, highlight && styles.highlightCard]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, highlight && styles.highlightValue]}>{value}</Text>
      {subtext ? <Text style={styles.subtext}>{subtext}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.secondary,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  highlightCard: {
    borderLeftColor: theme.colors.accent,
    backgroundColor: '#F0FDF4',
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  value: {
    color: theme.colors.textPrimary,
    fontSize: 14.5,
    fontWeight: '700',
    lineHeight: 20,
  },
  highlightValue: {
    color: theme.colors.primary,
  },
  subtext: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
});
