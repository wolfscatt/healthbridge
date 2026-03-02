import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '../../navigation/AppNavigation';
import { useAppContext, User } from '../../context/AppContext';
import type { CompositeScreenProps } from '@react-navigation/native';

type Props = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { setCurrentUser } = useAppContext();
  const [phone, setPhone] = useState('');

  const handleLogin = (role: User['role']) => {
    const mockUser: User = {
      id: role === 'admin' ? 'admin1' : role === 'doctor' ? 'doc1' : 'user1',
      role,
      name: role === 'admin' ? 'Admin Kullanıcı' : role === 'doctor' ? 'Uzm. Dr. Örnek' : 'Hasta Kullanıcı',
      phone,
      verified: true,
    };
    setCurrentUser(mockUser);
    // Root navigator Splash ekranına döner, Splash rolü kontrol edip doğru stack'i açar.
    navigation.getParent()?.navigate('Splash' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HealthBridge</Text>
      <Text style={styles.subtitle}>Devam etmek için telefon numaranızı girin.</Text>

      <TextInput
        style={styles.input}
        placeholder="Telefon (05xx...)"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.sectionTitle}>Rolünüzü seçin</Text>

      <View style={styles.roleRow}>
        <TouchableOpacity style={styles.roleButton} onPress={() => handleLogin('patient')}>
          <Text style={styles.roleTitle}>Hasta</Text>
          <Text style={styles.roleDesc}>Bilgilendirme ve uzman erişimi</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.roleRow}>
        <TouchableOpacity style={styles.roleButton} onPress={() => handleLogin('doctor')}>
          <Text style={styles.roleTitle}>Uzman / Doktor</Text>
          <Text style={styles.roleDesc}>Danışan alın ve randevu yönetin</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.adminLink} onPress={() => handleLogin('admin')}>
        <Text style={styles.adminText}>Admin olarak giriş yap (demo)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Hesabınız yok mu? Kayıt olun</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7f5',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#00796b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#004d40',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004d40',
    marginBottom: 12,
  },
  roleRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  roleButton: {
    flex: 1,
    backgroundColor: '#00bfa5',
    padding: 16,
    borderRadius: 18,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  roleDesc: {
    fontSize: 13,
    color: '#e0f2f1',
  },
  adminLink: {
    marginTop: 16,
  },
  adminText: {
    fontSize: 13,
    color: '#00695c',
    textDecorationLine: 'underline',
  },
  registerLink: {
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
    color: '#004d40',
  },
});

