import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigation';
import { useAppContext, DoctorProfile } from '../../context/AppContext';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'DoctorProfile'>;

export const FindDoctorScreen: React.FC = () => {
  const { doctorProfiles } = useAppContext();
  const navigation = useNavigation<NavProp>();
  const [query, setQuery] = useState('');
  const [onlineOnly, setOnlineOnly] = useState(false);

  const filtered = doctorProfiles.filter((doc: DoctorProfile) => {
    if (onlineOnly && !doc.isOnline) return false;
    if (!query) return true;
    return (doc.specialty + doc.bio).toLowerCase().includes(query.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uzman Bul</Text>
      <Text style={styles.subtitle}>Branş, online durum ve ücrete göre filtreleyin.</Text>
      <TextInput
        style={styles.search}
        placeholder="Branş veya anahtar kelime ara..."
        value={query}
        onChangeText={setQuery}
      />

      <View style={styles.filterRow}>
        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>Sadece online</Text>
          <Switch value={onlineOnly} onValueChange={setOnlineOnly} thumbColor="#00bfa5" />
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.userId}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DoctorProfile', { doctorId: item.userId })}
          >
            <Text style={styles.name}>Uzm. Dr. Örnek</Text>
            <Text style={styles.specialty}>{item.specialty}</Text>
            <Text style={styles.bio} numberOfLines={2}>
              {item.bio}
            </Text>
            <View style={styles.row}>
              <Text style={styles.price}>{item.price} ₺ / seans</Text>
              {item.isOnline && <Text style={styles.badgeOnline}>Online</Text>}
              <Text
                style={[
                  styles.badgeVerify,
                  item.verificationStatus === 'approved'
                    ? styles.badgeVerifyApproved
                    : styles.badgeVerifyPending,
                ]}
              >
                {item.verificationStatus === 'approved' ? 'Doğrulandı' : 'Doğrulama Bekliyor'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7f5',
    padding: 16,
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
  search: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    marginRight: 8,
    fontSize: 12,
    color: '#455a64',
  },
  list: {
    paddingTop: 4,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 14,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#004d40',
  },
  specialty: {
    fontSize: 13,
    color: '#00897b',
    marginBottom: 4,
  },
  bio: {
    fontSize: 12,
    color: '#607d8b',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 13,
    color: '#004d40',
    marginRight: 8,
  },
  badgeOnline: {
    fontSize: 11,
    color: '#2e7d32',
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 6,
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
});

