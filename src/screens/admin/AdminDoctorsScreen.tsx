import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useAppContext } from '../../context/AppContext';

export const AdminDoctorsScreen: React.FC = () => {
  const { doctorProfiles, updateDoctorVerification } = useAppContext();

  const pending = doctorProfiles.filter(d => d.verificationStatus !== 'approved');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uzman Başvuruları</Text>
      <Text style={styles.subtitle}>
        Buradan uzmanların doğrulama durumlarını onaylayabilir veya reddedebilirsiniz.
      </Text>

      <FlatList
        data={pending}
        keyExtractor={item => item.userId}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>Uzm. Dr. Örnek ({item.userId})</Text>
            <Text style={styles.specialty}>{item.specialty}</Text>
            <Text style={styles.status}>
              Durum: {item.verificationStatus === 'pending' ? 'İncelemede' : 'Reddedildi'}
            </Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.buttonApprove}
                onPress={() => updateDoctorVerification(item.userId, 'approved')}
              >
                <Text style={styles.buttonApproveText}>Onayla</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonReject}
                onPress={() => updateDoctorVerification(item.userId, 'rejected')}
              >
                <Text style={styles.buttonRejectText}>Reddet</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  list: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
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
  status: {
    fontSize: 13,
    color: '#455a64',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
  },
  buttonApprove: {
    flex: 1,
    backgroundColor: '#00bfa5',
    borderRadius: 18,
    paddingVertical: 10,
    marginRight: 6,
  },
  buttonApproveText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
  },
  buttonReject: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#b71c1c',
    marginLeft: 6,
  },
  buttonRejectText: {
    textAlign: 'center',
    color: '#b71c1c',
    fontWeight: '700',
  },
});

