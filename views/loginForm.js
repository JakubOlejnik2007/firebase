import { View, TextInput, Button } from "react-native";

const LoginForm = ({ setPassword, setLogin, styles, handleLogin }) => {

    return <View>
        <TextInput
            style={styles.input}
            placeholder="Login"
            onChangeText={setLogin}
        />
        <TextInput
            style={styles.input}
            placeholder="Hasło"
            secureTextEntry
            onChangeText={setPassword}
        />
        <Button title="Zaloguj się" onPress={handleLogin} />
    </View>


}

export default LoginForm;