import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function StatusBadge({ status, level = 'optimal' }) {
  // Determine styles based on level or status string
  let bg = theme.colors.statusOptimalBg;
  let text = theme.colors.statusOptimal;
  let border = theme.colors.statusOptimalBorder;

  const normalizedStatus = (status || '').toLowerCase();
  const normalizedLevel = (level || '').toLowerCase();

  if (
    normalizedLevel === 'danger' ||
    normalizedStatus.includes('critical') ||
    normalizedStatus.includes('danger') ||
    normalizedStatus.includes('high moisture') ||
    normalizedStatus.includes('acidic')
  ) {
    bg = theme.colors.statusDangerBg;
    text = theme.colors.statusDanger;
    border = theme.colors.statusDangerBorder;
  } else if (
    normalizedLevel === 'warning' ||
    normalizedStatus.includes('attention') ||
    normalizedStatus.includes('warning') ||
    normalizedStatus.includes('elevated') ||
    normalizedStatus.includes('shifted')
  ) {
    bg = theme.colors.statusWarningBg;
    text = theme.colors.statusWarning;
    border = theme.colors.statusWarningBorder;
  } else if (normalizedLevel === 'normal' || normalizedStatus.includes('normal')) {
    bg = theme.colors.statusNormalBg;
    text = theme.colors.statusNormal;
    border = theme.colors.statusNormalBorder;
  }

  return (
    <View style={[styles.badge, { backgroundColor: bg, borderColor: border }]}>
      <View style={[styles.dot, { backgroundColor: text }]} />
      <Text style={[styles.text, { color: text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

