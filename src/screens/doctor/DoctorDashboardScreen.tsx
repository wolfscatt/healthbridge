import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, radii, spacing } from '../../theme/theme';

export const DoctorDashboardScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Bugün</Text>
      <Text style={styles.subtitle}>Randevularınız, sorular ve özet performans.</Text>

      <View style={styles.row}>
        <View style={[styles.card, styles.cardHalf]}>
          <Text style={styles.cardLabel}>Bugünkü Randevular</Text>
          <Text style={styles.cardNumber}>4</Text>
          <Text style={styles.cardHint}>2 online • 2 klinik</Text>
        </View>
        <View style={[styles.card, styles.cardHalf]}>
          <Text style={styles.cardLabel}>Bekleyen Sorular</Text>
          <Text style={styles.cardNumber}>7</Text>
          <Text style={styles.cardHint}>En yenisi 12 dk önce</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Aylık Gelir</Text>
        <Text style={styles.cardNumber}>₺ 18.450</Text>
        <View style={styles.chartRow}>
          {[40, 60, 35, 80, 55, 70].map((h, index) => (
            <View key={index} style={[styles.chartBar, { height: 30 + h }]} />
          ))}
        </View>
        <Text style={styles.cardHint}>Geçen aya göre %12 artış</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Hasta Puanı</Text>
        <Text style={styles.cardNumber}>4.8</Text>
        <Text style={styles.cardHint}>Son 30 gün ortalaması • 124 değerlendirme</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textDark,
  },
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    color: colors.textMuted,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: spacing.md,
  },
  cardHalf: {
    flex: 1,
    marginRight: spacing.sm,
  },
  cardLabel: {
    color: colors.textMuted,
    fontSize: 13,
    marginBottom: spacing.xs,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  cardHint: {
    fontSize: 12,
    color: colors.textMuted,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  chartBar: {
    flex: 1,
    marginHorizontal: 3,
    borderRadius: 999,
    backgroundColor: colors.primary,
    opacity: 0.9,
  },
});

