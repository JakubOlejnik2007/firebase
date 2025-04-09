import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import bcrypt from 'react-native-bcrypt';
import db from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const RegisterForm = ({ styles }) => {
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        login: '',
        password: '',
        confirmPassword: ''
    });

    const inputs = [
        { name: 'firstname', placeholder: 'Imię', secure: false },
        { name: 'lastname', placeholder: 'Nazwisko', secure: false },
        { name: 'login', placeholder: 'Login', secure: false },
        { name: 'password', placeholder: 'Hasło', secure: true },
        { name: 'confirmPassword', placeholder: 'Potwierdź hasło', secure: true },
    ];

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleRegister = async () => {
        const { firstname, lastname, login, password, confirmPassword } = form;

        if (!firstname || !lastname || !login || !password || !confirmPassword) {
            Alert.alert("Błąd", "Proszę wypełnić wszystkie pola");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Błąd", "Hasła się nie zgadzają");
            return;
        }

        try {
            const hashedPassword = bcrypt.hashSync(password, 10);
            await addDoc(collection(db, 'users'), {
                firstname,
                lastname,
                login,
                password: hashedPassword,
            });
            Alert.alert("Sukces", "Użytkownik zarejestrowany");
            setForm({ firstname: '', lastname: '', login: '', password: '', confirmPassword: '' });
        } catch (error) {
            Alert.alert("Błąd", "Wystąpił błąd podczas rejestracji");
        }
    };

    return (
        <View>
            {inputs.map(input => (
                <TextInput
                    key={input.name}
                    style={styles.textInput}
                    placeholder={input.placeholder}
                    secureTextEntry={input.secure}
                    value={form[input.name]}
                    onChangeText={(text) => handleChange(input.name, text)}
                />
            ))}
            <Button title="Zarejestruj się" onPress={handleRegister} />
        </View>
    );
};

export default RegisterForm;