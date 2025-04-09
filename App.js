import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import db from './firebaseConfig.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Text, Button, TextInput, View, Alert, SafeAreaView, StyleSheet } from 'react-native';
import bcrypt from 'react-native-bcrypt';

import LoginForm from "./views/loginForm.js"
import RegisterForm from './views/registerForm.js';

export default function App() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const handleLogin = async () => {
    if (!login || !password) {
      Alert.alert("Błąd", "Proszę wypełnić wszystkie pola");
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('login', '==', login))
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert("Błąd", "Nie ma takiego użytkownika");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      console.log(userData)
      if (bcrypt.compareSync(password, userData.password)) {
        Alert.alert("Sukces", `Witaj, ${userData.firstname} ${userData.lastname} !`);
        setUser(userData);
      } else {
        Alert.alert("Błąd", "Niepoprawne hasło");
      }
    } catch (error) {
      Alert.alert("Błąd", "Wystąpił błąd wewnętrzny. Spróbuj ponownie.");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Logowanie</Text>
      {
        !user ?
          <LoginForm setPassword={setPassword} setLogin={setLogin} styles={styles} handleLogin={handleLogin} /> : <View>
            <Text>Witaj, {user.firstname} {user.lastname}</Text>
            <Button title="Wyloguj się" onPress={() => {
              setUser(null);
              Alert.alert("Sukces", "Poprawnie wylogowano");
            }} />

            <RegisterForm styles={styles} />
          </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: 200, paddingLeft: 10 }
});