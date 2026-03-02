import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigation';
import { useAppContext } from '../../context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'DoctorProfile'>;

export const DoctorProfileScreen: React.FC<Props> = ({ route, navigation }) => {
  const { doctorProfiles } = useAppContext();
  const doctor = doctorProfiles.find(d => d.userId === route.params.doctorId);

  if (!doctor) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Uzman bulunamadı.</Text>
      </View>
    );
  }

  const isVerified = doctor.verificationStatus === 'approved';

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.name}>Uzm. Dr. Örnek</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>
        <Text style={styles.bio}>{doctor.bio}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>{doctor.price} ₺ / seans</Text>
          <Text
            style={[
              styles.badgeVerify,
              isVerified ? styles.badgeVerifyApproved : styles.badgeVerifyPending,
            ]}
          >
            {isVerified ? 'Doğrulanmış Uzman' : 'Doğrulama Bekliyor'}
          </Text>
        </View>
      </View>

      <View style={styles.actionsCard}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('AskQuestion', { doctorId: doctor.userId })}
        >
          <Text style={styles.primaryButtonText}>Soru Sor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Appointment', { doctorId: doctor.userId })}
        >
          <Text style={styles.secondaryButtonText}>Randevu Al</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Çalışma Şekli</Text>
        <Text style={styles.infoText}>
          Bu ekran demo amaçlıdır. Gerçek zamanlı randevu ve ödeme entegrasyonları daha sonraki
          fazlarda eklenecektir.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7f5',
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: '#b71c1c',
  },
  headerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#004d40',
  },
  specialty: {
    fontSize: 14,
    color: '#00897b',
    marginBottom: 6,
  },
  bio: {
    fontSize: 13,
    color: '#455a64',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    color: '#004d40',
    marginRight: 8,
  },
  badgeVerify: {
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeVerifyApproved: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
  },
  badgeVerifyPending: {
    backgroundColor: '#fff3e0',
    color: '#ef6c00',
  },
  actionsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#00bfa5',
    borderRadius: 20,
    paddingVertical: 14,
    marginBottom: 8,
  },
  primaryButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    borderRadius: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#00bfa5',
  },
  secondaryButtonText: {
    textAlign: 'center',
    color: '#00695c',
    fontSize: 15,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#004d40',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#455a64',
  },
});

