import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../context/AppContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigation';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen: React.FC = () => {
  const { currentUser } = useAppContext();
  const navigation = useNavigation<NavProp>();

  if (!currentUser) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Giriş yapmamışsınız.</Text>
      </View>
    );
  }

  const isDoctor = currentUser.role === 'doctor';
  const isAdmin = currentUser.role === 'admin';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{currentUser.name}</Text>
        <Text style={styles.role}>
          {currentUser.role === 'patient'
            ? 'Hasta'
            : currentUser.role === 'doctor'
            ? 'Uzman / Doktor'
            : 'Admin'}
        </Text>
        <Text style={styles.info}>Telefon: {currentUser.phone}</Text>
        {currentUser.birthYear && (
          <Text style={styles.info}>Doğum yılı: {currentUser.birthYear}</Text>
        )}
      </View>

      {isDoctor && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DoctorVerification')}
        >
          <Text style={styles.buttonText}>Belge Yükle & Doğrulama Durumu</Text>
        </TouchableOpacity>
      )}

      {isAdmin && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AdminDoctors')}
        >
          <Text style={styles.buttonText}>Uzman Başvurularını Yönet</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonSecondaryText}>Ayarlar & KVKK</Text>
      </TouchableOpacity>
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
  text: {
    color: '#004d40',
  },
  card: {
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
  role: {
    fontSize: 14,
    color: '#00897b',
    marginBottom: 8,
  },
  info: {
    fontSize: 13,
    color: '#455a64',
  },
  button: {
    backgroundColor: '#00bfa5',
    borderRadius: 20,
    paddingVertical: 14,
    marginBottom: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  buttonSecondary: {
    borderRadius: 20,
    paddingVertical: 12,
    borderColor: '#00bfa5',
    borderWidth: 1,
    marginTop: 4,
  },
  buttonSecondaryText: {
    textAlign: 'center',
    color: '#00695c',
    fontSize: 14,
    fontWeight: '600',
  },
});

