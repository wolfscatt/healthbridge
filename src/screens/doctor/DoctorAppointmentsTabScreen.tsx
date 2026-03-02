import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors, radii, spacing } from '../../theme/theme';

const MOCK_APPOINTMENTS = [
  { id: '1', time: '09:30', name: 'Ahmet Yılmaz', type: 'Online' },
  { id: '2', time: '11:00', name: 'Ayşe Demir', type: 'Klinik' },
  { id: '3', time: '14:15', name: 'Mehmet Koç', type: 'Online' },
];

export const DoctorAppointmentsTabScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bugünkü Randevular</Text>
      <FlatList
        data={MOCK_APPOINTMENTS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <Text style={styles.type}>{item.type}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  list: {
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  time: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  name: {
    fontSize: 14,
    color: colors.textMuted,
  },
  type: {
    fontSize: 13,
    color: colors.primaryDark,
    fontWeight: '600',
  },
});

