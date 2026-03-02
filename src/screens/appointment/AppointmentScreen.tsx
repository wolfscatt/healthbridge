import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Appointment'>;

const SLOTS = ['Bugün 15:00', 'Bugün 17:30', 'Yarın 10:00', 'Yarın 14:00'];

export const AppointmentScreen: React.FC<Props> = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Randevu Oluştur</Text>
      <Text style={styles.subtitle}>
        Uygun tarih/saat seçeneklerinden birini seçerek randevunuzu planlayın.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Tarih / Saat</Text>
        {SLOTS.map(slot => (
          <TouchableOpacity
            key={slot}
            style={[styles.slot, selected === slot && styles.slotSelected]}
            onPress={() => setSelected(slot)}
          >
            <Text
              style={[styles.slotText, selected === slot && styles.slotTextSelected]}
            >
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Ödeme (Placeholder)</Text>
        <Text style={styles.text}>
          Bu demo sürümde gerçek ödeme alınmamaktadır. Gerçek sistemde ödeme alt yapısı
          (örneğin İyzico / Stripe vb.) entegre edilerek komisyon modeli uygulanacaktır.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, !selected && styles.primaryButtonDisabled]}
        disabled={!selected}
      >
        <Text style={styles.primaryButtonText}>Randevuyu Onayla</Text>
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
    marginBottom: 8,
  },
  slot: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#b0bec5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  slotSelected: {
    backgroundColor: '#00bfa5',
    borderColor: '#00bfa5',
  },
  slotText: {
    fontSize: 14,
    color: '#37474f',
  },
  slotTextSelected: {
    color: '#ffffff',
    fontWeight: '700',
  },
  text: {
    fontSize: 13,
    color: '#455a64',
  },
  primaryButton: {
    backgroundColor: '#00bfa5',
    borderRadius: 20,
    paddingVertical: 14,
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

