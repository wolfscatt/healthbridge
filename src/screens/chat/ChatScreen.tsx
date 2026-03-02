import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const MOCK_MESSAGES = [
  {
    id: 'm1',
    sender: 'patient',
    text: 'Merhaba hocam, son günlerde göğüs bölgemde hafif ağrılar hissediyorum.',
  },
  {
    id: 'm2',
    sender: 'doctor',
    text: 'Merhaba, ağrının tam yeri, süresi ve eşlik eden başka şikayetiniz var mı?',
  },
];

export const ChatScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_MESSAGES}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.sender === 'patient' ? styles.bubbleRight : styles.bubbleLeft,
            ]}
          >
            <Text
              style={[
                styles.bubbleText,
                item.sender === 'patient' ? styles.bubbleTextRight : styles.bubbleTextLeft,
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="Mesaj yazın..." />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendText}>Gönder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7f5',
  },
  list: {
    padding: 12,
    paddingBottom: 80,
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 18,
    padding: 10,
    marginBottom: 8,
  },
  bubbleLeft: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
  },
  bubbleRight: {
    backgroundColor: '#00bfa5',
    alignSelf: 'flex-end',
  },
  bubbleText: {
    fontSize: 13,
  },
  bubbleTextLeft: {
    color: '#37474f',
  },
  bubbleTextRight: {
    color: '#ffffff',
  },
  inputRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#cfd8dc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#00bfa5',
    borderRadius: 20,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  sendText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});

