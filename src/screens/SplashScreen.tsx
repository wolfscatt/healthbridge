import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { useAppContext } from '../context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser } = useAppContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!currentUser) {
        navigation.replace('Auth');
        return;
      }

      if (currentUser.role === 'patient') {
        navigation.replace('PatientTabs');
      } else if (currentUser.role === 'doctor') {
        navigation.replace('DoctorTabs');
      } else {
        navigation.replace('AdminInfo');
      }
    }, 1200);
    return () => clearTimeout(timeout);
  }, [currentUser, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>HealthBridge</Text>
      <Text style={styles.subtitle}>Sağlık bilgilendirme ve uzman köprünüz</Text>
      <ActivityIndicator size="large" color="#00bfa5" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0f7f5',
    paddingHorizontal: 24,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: '#00796b',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
    color: '#004d40',
  },
  loader: {
    marginTop: 32,
  },
});

