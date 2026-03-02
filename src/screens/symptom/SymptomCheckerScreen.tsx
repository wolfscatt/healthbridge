import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

const QUESTIONS = [
  {
    id: 'fever',
    text: 'Son 24 saatte 38°C üzerinde ateşiniz oldu mu?',
    weight: 2,
  },
  {
    id: 'breath',
    text: 'Nefes darlığı veya göğüs ağrısı yaşıyor musunuz?',
    weight: 3,
  },
  {
    id: 'chronic',
    text: 'Altta yatan kronik bir hastalığınız var mı? (kalp, akciğer, böbrek vb.)',
    weight: 2,
  },
  {
    id: 'sudden',
    text: 'Şikayetleriniz son 24 saat içinde aniden mi başladı?',
    weight: 1,
  },
];

export const SymptomCheckerScreen: React.FC<Props> = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const current = QUESTIONS[step];

  const onAnswer = (yes: boolean) => {
    if (yes) {
      setScore(prev => prev + current.weight);
    }
    if (step < QUESTIONS.length - 1) {
      setStep(prev => prev + 1);
    } else {
      let riskLevel: 'low' | 'medium' | 'high' = 'low';
      if (score >= 4 && score < 6) riskLevel = 'medium';
      if (score >= 6) riskLevel = 'high';
      navigation.navigate('SymptomResult', { riskLevel });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Semptom Kontrol</Text>
      <Text style={styles.subtitle}>
        Bu akış bir tıbbi tanı değildir, yalnızca risk değerlendirmesi sunar.
      </Text>

      <View style={styles.card}>
        <Text style={styles.stepText}>
          Soru {step + 1}/{QUESTIONS.length}
        </Text>
        <Text style={styles.question}>{current.text}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonNo} onPress={() => onAnswer(false)}>
            <Text style={styles.buttonNoText}>Hayır</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonYes} onPress={() => onAnswer(true)}>
            <Text style={styles.buttonYesText}>Evet</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerTitle}>Acil Durumlarda</Text>
        <Text style={styles.disclaimerText}>
          Göğüs ağrısı, bilinç kaybı, ani nefes darlığı gibi acil durum belirtileriniz varsa sonucu
          beklemeden derhal 112&apos;yi arayın veya en yakın acil servise başvurun.
        </Text>
      </View>
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
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
  },
  stepText: {
    fontSize: 13,
    color: '#607d8b',
    marginBottom: 8,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004d40',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonNo: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#b0bec5',
    marginRight: 8,
  },
  buttonYes: {
    flex: 1,
    backgroundColor: '#00bfa5',
    borderRadius: 18,
    paddingVertical: 12,
    marginLeft: 8,
  },
  buttonNoText: {
    textAlign: 'center',
    color: '#455a64',
    fontWeight: '600',
  },
  buttonYesText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
  },
  disclaimerBox: {
    marginTop: 16,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 16,
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

