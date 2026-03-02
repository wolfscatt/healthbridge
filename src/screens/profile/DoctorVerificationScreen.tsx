import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppContext } from '../../context/AppContext';

export const DoctorVerificationScreen: React.FC = () => {
  const { currentUser, doctorProfiles } = useAppContext();
  const [uploaded, setUploaded] = useState(false);

  if (!currentUser || currentUser.role !== 'doctor') {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Bu ekran sadece uzman kullanıcılar içindir.</Text>
      </View>
    );
  }

  const profile = doctorProfiles.find(d => d.userId === currentUser.id);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Belge Yükleme & Doğrulama</Text>
      <Text style={styles.subtitle}>
        Diploma, uzmanlık belgesi ve oda kayıt belgelerinizi yükleyerek doğrulama sürecini
        başlatabilirsiniz. Bu demo sürümde yükleme gerçek değildir.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Doğrulama Durumu</Text>
        <Text style={styles.status}>
          {profile?.verificationStatus === 'approved'
            ? 'Onaylandı'
            : profile?.verificationStatus === 'rejected'
            ? 'Reddedildi'
            : 'İncelemede'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Belge Yükleme (Mock)</Text>
        <Text style={styles.text}>
          Aşağıdaki buton, gerçek dosya yükleme yerine demo amaçlı olarak kullanılır.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setUploaded(true)}
        >
          <Text style={styles.buttonText}>
            {uploaded ? 'Belge Gönderildi (Demo)' : 'Belge Yükle'}
          </Text>
        </TouchableOpacity>
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
  text: {
    color: '#004d40',
    fontSize: 13,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004d40',
  },
  subtitle: {
    fontSize: 13,
    color: '#00695c',
    marginTop: 4,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#004d40',
    marginBottom: 6,
  },
  status: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00897b',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#00bfa5',
    borderRadius: 20,
    paddingVertical: 12,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
  },
});

