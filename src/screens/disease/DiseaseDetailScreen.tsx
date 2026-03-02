import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigation';
import { useAppContext } from '../../context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'DiseaseDetail'>;

export const DiseaseDetailScreen: React.FC<Props> = ({ route }) => {
  const { diseases } = useAppContext();
  const disease = diseases.find(d => d.id === route.params.diseaseId);

  if (!disease) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Hastalık bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.category}>{disease.category}</Text>
      <Text style={styles.title}>{disease.title}</Text>
      <Text style={styles.sectionTitle}>Tanım</Text>
      <Text style={styles.text}>{disease.description}</Text>

      <Text style={styles.sectionTitle}>Belirtiler</Text>
      {disease.symptoms.map(item => (
        <Text key={item} style={styles.bullet}>
          • {item}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Korunma</Text>
      {disease.prevention.map(item => (
        <Text key={item} style={styles.bullet}>
          • {item}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Ne Zaman Doktora Gitmeli?</Text>
      {disease.warningSigns.map(item => (
        <Text key={item} style={styles.bulletWarning}>
          • {item}
        </Text>
      ))}

      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerTitle}>Tıbbi Tanı Değildir</Text>
        <Text style={styles.disclaimerText}>
          Bu içerik yalnızca bilgilendirme amaçlıdır ve tıbbi tanı yerine geçmez. Şikayetleriniz
          devam ediyorsa bir sağlık profesyoneline başvurun. Acil durumda derhal 112&apos;yi arayın.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7f5',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#b71c1c',
  },
  category: {
    fontSize: 12,
    color: '#00897b',
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004d40',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#00695c',
    marginTop: 12,
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    color: '#37474f',
  },
  bullet: {
    fontSize: 13,
    color: '#37474f',
    marginLeft: 8,
    marginBottom: 2,
  },
  bulletWarning: {
    fontSize: 13,
    color: '#b71c1c',
    marginLeft: 8,
    marginBottom: 2,
  },
  disclaimerBox: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
  },
  disclaimerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#b71c1c',
    marginBottom: 4,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#37474f',
  },
});

