import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Definición del tipo de las rutas en la navegación
type RootStackParamList = {
  ZonasRiego: { idUsuario: number };
  Registro: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ZonasRiego'>;

const LoginScreen: React.FC = () => {
  const [correo, setCorreo] = useState<string>(""); // Tipos explícitos en los estados
  const [contraseña, setContraseña] = useState<string>("");
  const navigation = useNavigation<LoginScreenNavigationProp>(); // Uso del hook de navegación con tipado

  const handleLogin = async () => {
    if (!correo || !contraseña) {
      Alert.alert("Error", "Por favor ingresa tu correo y contraseña.");
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.145:8000/api/login', {
        correo,
        contraseña,
      });

      if (response.data.success) {
        Alert.alert('Éxito', 'Inicio de sesión exitoso.');
        const idUsuario = response.data.id_usuario; // Asumimos que la API devuelve un ID de usuario
        navigation.navigate('ZonasRiego', { idUsuario });  // Navegar y pasar el idUsuario a la pantalla de ZonasRiego
      } else {
        Alert.alert('Error', 'Correo o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión. Verifica tu conexión o los datos ingresados.');
    }
  };

  // Navegación a la pantalla de registro
  const handleNavigateToRegister = () => {
    navigation.navigate('Registro');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#B3B3B3"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none" // Evitar la capitalización automática
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#B3B3B3"
        secureTextEntry={true}
        value={contraseña}
        onChangeText={setContraseña}
      />
      
      {/* Botón de iniciar sesión */}
      <TouchableOpacity style={styles.boton} onPress={handleLogin}>
        <Text style={styles.botonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Texto para redirigir a la pantalla de registro */}
      <TouchableOpacity onPress={handleNavigateToRegister}>
        <Text style={styles.registroText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212",
  },
  input: {
    height: 50,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#1C1C1C",
    color: "#FFF",
  },
  boton: {
    backgroundColor: "#1DB954",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  registroText: {
    marginTop: 20,
    textAlign: "center",
    color: "#1DB954", // Verde estilo Spotify
    fontSize: 16,
  },
});

export default LoginScreen;
