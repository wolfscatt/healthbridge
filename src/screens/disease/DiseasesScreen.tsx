import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigation';
import { useAppContext } from '../../context/AppContext';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'DiseaseDetail'>;

export const DiseasesScreen: React.FC = () => {
  const { diseases } = useAppContext();
  const navigation = useNavigation<NavProp>();
  const [query, setQuery] = useState('');

  const filtered = diseases.filter(d =>
    (d.title + d.category + d.description).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hastalıklar</Text>
      <Text style={styles.subtitle}>Genel bilgilendirme amaçlı içerikler.</Text>
      <TextInput
        style={styles.search}
        placeholder="Hastalık ara..."
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DiseaseDetail', { diseaseId: item.id })}
          >
            <Text style={styles.cardCategory}>{item.category}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text numberOfLines={2} style={styles.cardDesc}>
              {item.description}
            </Text>
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
  list: {
    paddingTop: 4,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
  },
  cardCategory: {
    fontSize: 11,
    color: '#00897b',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#004d40',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: '#607d8b',
  },
});

