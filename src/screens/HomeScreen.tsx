import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { PatientTabParamList } from '../navigation/AppNavigation';
import { useAppContext } from '../context/AppContext';
import { colors, radii, spacing } from '../theme/theme';

type NavProp = BottomTabNavigationProp<PatientTabParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { currentUser } = useAppContext();

  const tiles = [
    {
      key: 'diseases',
      title: 'Hastalıklar',
      icon: 'medkit-outline' as const,
      onPress: () => navigation.navigate('Diseases'),
    },
    {
      key: 'symptom',
      title: 'Semptom Kontrol',
      icon: 'pulse-outline' as const,
      onPress: () => navigation.navigate('SymptomChecker'),
    },
    {
      key: 'findDoctor',
      title: 'Uzman Bul',
      icon: 'people-outline' as const,
      onPress: () => navigation.navigate('FindDoctor'),
    },
    {
      key: 'messages',
      title: 'Mesajlar',
      icon: 'chatbubbles-outline' as const,
      onPress: () => navigation.navigate('Chat', { chatId: 'demo' }),
    },
    {
      key: 'appointments',
      title: 'Randevular',
      icon: 'calendar-outline' as const,
      onPress: () => navigation.navigate('Appointment', { doctorId: 'doc1' }),
    },
    {
      key: 'settings',
      title: 'Ayarlar & KVKK',
      icon: 'shield-checkmark-outline' as const,
      onPress: () => navigation.navigate('Settings'),
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTopRow}>
          <View>
            <Text style={styles.welcomeText}>Hoş Geldiniz</Text>
            <Text style={styles.userName}>
              {currentUser ? currentUser.name : 'HealthBridge'}
            </Text>
          </View>
          <View style={styles.badgeVerified}>
            <Ionicons name="shield-checkmark" size={16} color="#ECFEFF" />
            <Text style={styles.badgeText}>Doğrulanmış Doktorlar</Text>
          </View>
        </View>

        <View style={styles.headerBottomRow}>
          <View style={styles.emergencyCard}>
            <Text style={styles.emergencyLabel}>Acil Durum?</Text>
            <Text style={styles.emergencyText}>Hayati risk için hemen 112&apos;yi arayın.</Text>
          </View>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => navigation.navigate('SymptomChecker')}
          >
            <Ionicons name="pulse" size={22} color={colors.primaryDark} />
            <Text style={styles.quickButtonText}>Semptom Kontrol</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.contentWrapper}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {tiles.map(tile => (
            <TouchableOpacity
              key={tile.key}
              style={styles.card}
              activeOpacity={0.9}
              onPress={tile.onPress}
            >
              <View style={styles.cardIconWrapper}>
                <Ionicons name={tile.icon} size={22} color={colors.primary} />
              </View>
              <Text style={styles.cardTitle}>{tile.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerTitle}>Tıbbi Tanı Değildir</Text>
          <Text style={styles.disclaimerText}>
            HealthBridge yalnızca semptom kontrolü ve genel bilgilendirme sunar, tıbbi tanı
            koymaz. Acil bir durumda derhal 112&apos;yi arayın veya en yakın acil servise
            başvurun.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: radii.xl,
    borderBottomRightRadius: radii.xl,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  welcomeText: {
    color: '#E0F2F1',
    fontSize: 14,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 4,
  },
  badgeVerified: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15,118,110,0.35)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: '#ECFEFF',
    fontSize: 11,
    marginLeft: 4,
    fontWeight: '500',
  },
  headerBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: radii.lg,
    padding: spacing.md,
    marginRight: spacing.sm,
  },
  emergencyLabel: {
    color: '#FEE2E2',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  emergencyText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  quickButton: {
    width: 120,
    backgroundColor: '#E0F7FA',
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickButtonText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaryDark,
    textAlign: 'center',
  },
  contentWrapper: {
    flex: 1,
    marginTop: -spacing.lg,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  card: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFEFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  disclaimerBox: {
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radii.md,
  },
  disclaimerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.danger,
    marginBottom: spacing.xs,
  },
  disclaimerText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});

