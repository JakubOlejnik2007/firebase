import { useState } from "react";
import { Text, Button, TextInput, View, Alert, SafeAreaView, StyleSheet } from 'react-native';


import db from '../firebaseConfig.js';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

const RegisterForm = ({ handleLogin, setPassword, setLogin, styles }) => {
    const [newUserData, setNewUserData] = useState({
        firstName: '',
        lastName: '',
        login: '',
        password: '',
        email: '',
        confirmPassword: ''
    })

    const inputs = [
        {
            label: 'Imię',
            value: newUserData.firstName,
            onChangeText: (value) => setNewUserData({ ...newUserData, firstName: value })
        },
        {
            label: 'Nazwisko',
            value: newUserData.lastName,
            onChangeText: (value) => setNewUserData({ ...newUserData, lastName: value })
        },
        {
            label: 'Email',
            value: newUserData.email,
            onChangeText: (value) => setNewUserData({ ...newUserData, email: value })
        },
        {
            label: 'Login',
            value: newUserData.login,
            onChangeText: (value) => setNewUserData({ ...newUserData, login: value })
        },
        {
            label: 'Hasło',
            value: newUserData.password,
            onChangeText: (value) => setNewUserData({ ...newUserData, password: value }),
            isPassword: true
        },
        {
            label: 'Potwierdź hasło',
            value: newUserData.confirmPassword,
            onChangeText: (value) => setNewUserData({ ...newUserData, confirmPassword: value }),
            isPassword: true
        }
    ]

    const handleRegister = async () => {
        console.log("Clicked")
        if (!newUserData.firstName ||
            !newUserData.lastName ||
            !newUserData.email ||
            !newUserData.login ||
            !newUserData.password ||
            !newUserData.confirmPassword) {
            Alert.alert("Błąd", "Proszę wypełnić wszystkie pola");
            return;
        }

        if (newUserData.password !== newUserData.confirmPassword) {
            Alert.alert("Błąd", "Hasła nie pasują do siebie");
            return;
        }

        console.log(db)

        const docRef = await addDoc(collection(db, "users"), {
            firstname: newUserData.firstName,
            lastname: newUserData.lastName,
            email: newUserData.email,
            login: newUserData.login,
            password: newUserData.password,
        })

        Alert.alert("Sucesss", "Dodano");
        console.log(docRef)
    }

    return (
        <View>
            {
                inputs.map((input, index) => (
                    <TextInput
                        key={index}
                        style={styles.textInput}
                        placeholder={input.label}
                        onChangeText={input.onChangeText}
                        value={input.value}
                        secureTextEntry={input.isPassword}
                    />
                ))
            }
            <Button title="Dodaj użytkownika" onPress={handleRegister} />
        </View>
    )
}

export default RegisterForm;