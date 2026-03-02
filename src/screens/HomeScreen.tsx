import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { useAppContext } from '../context/AppContext';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { currentUser } = useAppContext();

  const isDoctor = currentUser?.role === 'doctor';
  const isAdmin = currentUser?.role === 'admin';

  const tiles = [
    {
      key: 'diseases',
      title: 'Hastalıklar',
      desc: 'Güvenilir sağlık içerikleri',
      onPress: () => navigation.navigate('MainTabs', { screen: 'Diseases' } as never),
    },
    {
      key: 'symptom',
      title: 'Semptom Kontrol',
      desc: 'Risk değerlendirme (teşhis değil)',
      onPress: () => navigation.navigate('MainTabs', { screen: 'SymptomChecker' } as never),
    },
    {
      key: 'findDoctor',
      title: 'Uzman Bul',
      desc: 'Doğrulanmış uzman listeleri',
      onPress: () => navigation.navigate('MainTabs', { screen: 'FindDoctor' } as never),
    },
    {
      key: 'messages',
      title: 'Mesajlar',
      desc: 'Uzmanlarla yazışmalarınız',
      onPress: () => navigation.navigate('Chat', { chatId: 'demo' }),
    },
    {
      key: 'appointments',
      title: 'Randevular',
      desc: 'Yaklaşan randevularınızı görün',
      onPress: () => navigation.navigate('Appointment', { doctorId: 'doc1' }),
    },
    {
      key: 'settings',
      title: 'Ayarlar & KVKK',
      desc: 'Gizlilik ve hesap yönetimi',
      onPress: () => navigation.navigate('Settings'),
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>
        Merhaba{currentUser ? `, ${currentUser.name}` : ''} 👋
      </Text>
      <Text style={styles.subtitle}>Sağlığınız için güvenilir bir başlangıç yapın.</Text>

      {isDoctor && (
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Uzman Paneli</Text>
          <Text style={styles.bannerText}>
            Profilinizi tamamlayın ve belge yükleyerek doğrulama sürecinizi başlatın.
          </Text>
          <TouchableOpacity
            style={styles.bannerButton}
            onPress={() => navigation.navigate('DoctorVerification')}
          >
            <Text style={styles.bannerButtonText}>Belge Yükle & Durumu Gör</Text>
          </TouchableOpacity>
        </View>
      )}

      {isAdmin && (
        <View style={styles.bannerAdmin}>
          <Text style={styles.bannerTitle}>Admin Paneli</Text>
          <Text style={styles.bannerText}>
            Yeni uzman başvurularını inceleyin ve onay/ret verin.
          </Text>
          <TouchableOpacity
            style={styles.bannerButtonLight}
            onPress={() => navigation.navigate('AdminDoctors')}
          >
            <Text style={styles.bannerButtonTextDark}>Uzman Başvuruları</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.grid}>
        {tiles.map(tile => (
          <TouchableOpacity key={tile.key} style={styles.card} onPress={tile.onPress}>
            <Text style={styles.cardTitle}>{tile.title}</Text>
            <Text style={styles.cardDesc}>{tile.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerTitle}>Önemli Bilgilendirme</Text>
        <Text style={styles.disclaimerText}>
          HealthBridge yalnızca semptom kontrolü ve genel bilgilendirme sunar, tıbbi tanı koymaz.
          Acil bir durumda derhal 112&apos;yi arayın veya en yakın acil servise başvurun.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7f5',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004d40',
  },
  subtitle: {
    fontSize: 14,
    color: '#00695c',
    marginTop: 4,
    marginBottom: 16,
  },
  banner: {
    backgroundColor: '#00bfa5',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  bannerAdmin: {
    backgroundColor: '#00796b',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 13,
    color: '#e0f2f1',
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: '#004d40',
    borderRadius: 16,
    paddingVertical: 10,
  },
  bannerButtonLight: {
    backgroundColor: '#e0f7f5',
    borderRadius: 16,
    paddingVertical: 10,
  },
  bannerButtonText: {
    textAlign: 'center',
    color: '#e0f2f1',
    fontWeight: '600',
  },
  bannerButtonTextDark: {
    textAlign: 'center',
    color: '#004d40',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#00695c',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 12,
    color: '#607d8b',
  },
  disclaimerBox: {
    marginTop: 16,
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 16,
  },
  disclaimerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#b71c1c',
    marginBottom: 4,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#37474f',
  },
});

