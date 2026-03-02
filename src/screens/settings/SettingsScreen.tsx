import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useAppContext } from '../../context/AppContext';

export const SettingsScreen: React.FC = () => {
  const { currentUser, setCurrentUser } = useAppContext();
  const [kvkkApproved, setKvkkApproved] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleDelete = () => {
    Alert.alert(
      'Hesabı Sil',
      'Bu demo sürümde hesap silme gerçek veri silmez. Yine de devam edilsin mi?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => setCurrentUser(null),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>KVKK & Açık Rıza</Text>
        <Text style={styles.text}>
          Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu çerçevesinde, yalnızca
          uygulama hizmetlerinin sunulması amacıyla işlenecektir. Dilediğiniz zaman hesap silme
          talebinde bulunabilirsiniz.
        </Text>
        <View style={styles.row}>
          <Text style={styles.text}>KVKK aydınlatma metnini okudum, onaylıyorum.</Text>
          <Switch value={kvkkApproved} onValueChange={setKvkkApproved} thumbColor="#00bfa5" />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Gizlilik</Text>
        <Text style={styles.text}>
          Sağlık verileri özel nitelikli kişisel veri kapsamındadır. Bu demo uygulamada veriler
          cihazınızda ve geçici bellekte tutulur; gerçek sistemde şifrelenmiş ve mevzuata uygun
          şekilde saklanmalıdır.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Hesap</Text>
        <Text style={styles.text}>Giriş yapmış kullanıcı: {currentUser?.name ?? '-'}</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDanger} onPress={handleDelete}>
          <Text style={styles.buttonDangerText}>Hesabı Sil (Demo)</Text>
        </TouchableOpacity>
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
    paddingBottom: 24,
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
    marginBottom: 6,
  },
  text: {
    fontSize: 13,
    color: '#455a64',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#00bfa5',
    borderRadius: 20,
    paddingVertical: 12,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
  },
  buttonDanger: {
    marginTop: 8,
    borderRadius: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#b71c1c',
  },
  buttonDangerText: {
    textAlign: 'center',
    color: '#b71c1c',
    fontWeight: '700',
  },
});

