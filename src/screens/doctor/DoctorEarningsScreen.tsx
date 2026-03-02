import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '../../theme/theme';

export const DoctorEarningsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gelirler</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Bu Ay</Text>
        <Text style={styles.amount}>₺ 18.450</Text>
        <Text style={styles.hint}>Geçen aya göre %12 artış</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Toplam Danışmanlık</Text>
        <Text style={styles.amount}>326</Text>
        <Text style={styles.hint}>Platform başlangıcından beri</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  amount: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  hint: {
    fontSize: 12,
    color: colors.textMuted,
  },
});

