import { Text, Button, TextInput, View, Alert, SafeAreaView, StyleSheet } from 'react-native';


const LoginForm = ({ handleLogin, setPassword, setLogin, styles }) => {
    return (
        <View>
            <TextInput style={styles.textInput} placeholder="Podaj login" onChangeText={setLogin} />
            <TextInput secureTextEntry style={styles.textInput} placeholder="Podaj hasło" onChangeText={setPassword} />
            <Button title="Zaloguj się" onPress={handleLogin} />
        </View>
    )
}

export default LoginForm;