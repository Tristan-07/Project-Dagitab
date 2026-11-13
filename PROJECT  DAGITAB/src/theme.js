export const theme = {
  colors: {
    // Primary Brand Colors
    primary: '#14532D',          // Dark Forest Green
    secondary: '#2E7D32',        // Leaf Green
    accent: '#84CC16',           // Vibrant Lime Green Accent
    accentDark: '#65A30D',       // Darker Lime for text/contrast
    accentLight: '#ECFCCB',      // Soft lime tint

    // Background & Surfaces
    background: '#F5F8F3',      // Soft natural off-white / light green
    surface: '#FFFFFF',         // Card white
    surfaceHover: '#F0FDF4',    // Very faint green highlight
    surfaceMuted: '#EBF2EA',    // Faint sage tint

    // Borders & Dividers
    border: '#E5E7EB',          // Subtle gray border
    borderGreen: '#BBF7D0',     // Light green border
    borderFocus: '#2E7D32',     // Green focus border

    // Typography
    textPrimary: '#1F2937',     // Dark slate / Charcoal
    textSecondary: '#4B5563',   // Medium slate gray
    textMuted: '#6B7280',       // Light muted gray
    textLight: '#9CA3AF',       // Soft hint gray
    textWhite: '#FFFFFF',       // Clean white

    // Status Colors (IoT Indicators)
    statusOptimal: '#16A34A',   // Fresh green
    statusOptimalBg: '#DCFCE7', // Pale green
    statusOptimalBorder: '#86EFAC',

    statusNormal: '#2E7D32',
    statusNormalBg: '#E8F5E9',
    statusNormalBorder: '#A5D6A7',

    statusWarning: '#D97706',   // Amber warning
    statusWarningBg: '#FEF3C7', // Soft amber
    statusWarningBorder: '#FCD34D',

    statusDanger: '#DC2626',    // Red alert
    statusDangerBg: '#FEE2E2',  // Soft red
    statusDangerBorder: '#FCA5A5',

    // Soil Parameter Accent Colors
    moisture: '#0284C7',        // Sky blue for water / moisture
    moistureBg: '#E0F2FE',
    moistureBorder: '#BAE6FD',

    temperature: '#EA580C',     // Warm amber-orange for temperature
    temperatureBg: '#FFEDD5',
    temperatureBorder: '#FED7AA',

    ph: '#7C3AED',              // Purple for pH / chemistry
    phBg: '#F3E8FF',
    phBorder: '#DDD6FE',
  },
  shadows: {
    card: {
      shadowColor: '#14532D',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 6,
      elevation: 3,
    },
    hero: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 10,
      elevation: 6,
    },
  },
};
