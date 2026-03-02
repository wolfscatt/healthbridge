import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '../../theme/theme';

export const AdminInfoScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Admin Web Dashboard</Text>
        <Text style={styles.text}>
          Admin yetkileri; doktor doğrulama, kullanıcı yönetimi, şikayet yönetimi, komisyon
          ayarları ve içerik yönetimi gibi gelişmiş operasyonları içerir.
        </Text>
        <Text style={styles.text}>
          Bu MVP mobil uygulama yalnızca hasta ve doktor rollerine odaklanır. Admin rolü için ayrı
          bir **web dashboard** tasarlanmalıdır (örneğin React + Next.js + admin template).
        </Text>
        <Text style={styles.text}>
          Demo amaçlı olarak, mobil uygulamada yalnızca bu bilgilendirme ekranı gösterilmektedir.
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
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  text: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
});

