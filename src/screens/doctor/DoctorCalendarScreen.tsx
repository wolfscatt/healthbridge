import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '../../theme/theme';

export const DoctorCalendarScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Takvim</Text>
      <View style={styles.card}>
        <Text style={styles.text}>
          Bu ekranda ileride aylık/haftalık randevu takvimi, blok saatler ve uygunluk yönetimi
          yer alacaktır. Şimdilik tasarım prototipi olarak bırakılmıştır.
        </Text>
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
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  text: {
    fontSize: 14,
    color: colors.textMuted,
  },
});

