import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SymptomResult'>;

export const SymptomResultScreen: React.FC<Props> = ({ route, navigation }) => {
  const { riskLevel } = route.params;

  const titleMap: Record<string, string> = {
    low: 'Düşük Risk',
    medium: 'Orta Risk',
    high: 'Yüksek Risk',
  };

  const colorMap: Record<string, string> = {
    low: '#2e7d32',
    medium: '#f9a825',
    high: '#c62828',
  };

  const messageMap: Record<string, string> = {
    low: 'Şu an için belirgin bir yüksek risk işareti görünmüyor. Yine de şikayetleriniz sürerse bir doktora danışın.',
    medium:
      'Bazı risk faktörleri mevcut. Mümkün olan en kısa sürede bir sağlık profesyoneli ile görüşmeniz önerilir.',
    high:
      'Yüksek risk bulguları mevcut olabilir. Gecikmeden bir acil servise başvurmanız veya 112&apos;yi aramanız gerekebilir.',
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.riskTitle, { color: colorMap[riskLevel] || '#004d40' }]}>
          {titleMap[riskLevel] ?? 'Risk Değerlendirmesi'}
        </Text>
        <Text style={styles.message}>{messageMap[riskLevel]}</Text>

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerTitle}>Bu Bir Tıbbi Tanı Değildir</Text>
          <Text style={styles.disclaimerText}>
            Bu sonuç yalnızca semptomlara dayalı ön değerlendirme sağlar, tıbbi tanı yerine geçmez.
            Kesin değerlendirme için bir hekim muayenesi gerekir. Acil durumda derhal 112&apos;yi
            arayın.
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.popToTop()}>
        <Text style={styles.primaryButtonText}>Yeniden Değerlendir</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('PatientTabs', { screen: 'FindDoctor' } as never)}
      >
        <Text style={styles.secondaryButtonText}>Bir Uzmanla Görüş</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7f5',
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  riskTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: '#37474f',
  },
  disclaimerBox: {
    marginTop: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 14,
    padding: 10,
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
  primaryButton: {
    backgroundColor: '#00bfa5',
    borderRadius: 20,
    paddingVertical: 14,
    marginBottom: 8,
  },
  primaryButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    borderRadius: 20,
    paddingVertical: 12,
    borderColor: '#00bfa5',
    borderWidth: 1,
  },
  secondaryButtonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#00695c',
    fontWeight: '600',
  },
});

