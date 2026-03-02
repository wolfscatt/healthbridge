import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AppNavigation';
import { useAppContext, User, UserRole } from '../../context/AppContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { setCurrentUser } = useAppContext();
  const [role, setRole] = useState<UserRole>('patient');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const handleRegister = () => {
    const user: User = {
      id: 'user-' + Date.now().toString(),
      role,
      name,
      phone,
      birthYear: birthYear ? Number(birthYear) : undefined,
      verified: role === 'doctor' ? false : true,
    };
    setCurrentUser(user);
    navigation.getParent()?.navigate('MainTabs' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      <Text style={styles.subtitle}>Rol seçin ve temel bilgilerinizi girin.</Text>

      <View style={styles.roleRow}>
        <TouchableOpacity
          style={[styles.roleChip, role === 'patient' && styles.roleChipActive]}
          onPress={() => setRole('patient')}
        >
          <Text style={[styles.roleChipText, role === 'patient' && styles.roleChipTextActive]}>
            Hasta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleChip, role === 'doctor' && styles.roleChipActive]}
          onPress={() => setRole('doctor')}
        >
          <Text style={[styles.roleChipText, role === 'doctor' && styles.roleChipTextActive]}>
            Uzman / Doktor
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefon (05xx...)"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Doğum yılı (opsiyonel)"
        keyboardType="numeric"
        value={birthYear}
        onChangeText={setBirthYear}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
        <Text style={styles.primaryButtonText}>Kayıt Ol</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backLink} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Zaten hesabım var, giriş yap</Text>
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
    fontSize: 24,
    fontWeight: '700',
    color: '#00796b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#004d40',
    marginBottom: 16,
  },
  roleRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  roleChip: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#80cbc4',
    marginRight: 8,
  },
  roleChipActive: {
    backgroundColor: '#00bfa5',
    borderColor: '#00bfa5',
  },
  roleChipText: {
    textAlign: 'center',
    color: '#00695c',
    fontSize: 13,
  },
  roleChipTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#00897b',
    borderRadius: 20,
    paddingVertical: 14,
    marginTop: 8,
  },
  primaryButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  backLink: {
    marginTop: 16,
  },
  backText: {
    textAlign: 'center',
    color: '#004d40',
    fontSize: 14,
  },
});

