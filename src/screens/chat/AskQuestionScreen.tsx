import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'AskQuestion'>;

export const AskQuestionScreen: React.FC<Props> = ({ route, navigation }) => {
  const [question, setQuestion] = useState('');

  const handleSend = () => {
    navigation.navigate('Chat', { chatId: `chat-${route.params.doctorId}` });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soru Sor</Text>
      <Text style={styles.subtitle}>
        Doktora iletmek istediğiniz soruyu mümkün olduğunca net ve kısa şekilde yazın.
      </Text>

      <TextInput
        style={styles.textArea}
        placeholder="Örn: Son günlerde göğüs ağrım oluyor, ne zaman doktora gitmeliyim?"
        value={question}
        onChangeText={setQuestion}
        multiline
      />

      <TouchableOpacity style={styles.attachmentButton}>
        <Text style={styles.attachmentText}>Dosya ekle (demo)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryButton} onPress={handleSend}>
        <Text style={styles.primaryButtonText}>Soruyu Gönder</Text>
      </TouchableOpacity>

      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerTitle}>Acil Durum Uyarısı</Text>
        <Text style={styles.disclaimerText}>
          Bu mesajlaşma acil durumlar için değildir. Acil bir durumda derhal 112&apos;yi arayın
          veya en yakın acil servise başvurun.
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
    marginBottom: 12,
  },
  textArea: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    minHeight: 140,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  attachmentButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  attachmentText: {
    fontSize: 13,
    color: '#00695c',
    textDecorationLine: 'underline',
  },
  primaryButton: {
    backgroundColor: '#00bfa5',
    borderRadius: 20,
    paddingVertical: 14,
  },
  primaryButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
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

