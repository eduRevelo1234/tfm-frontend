import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const RegistroScreen: React.FC = () => {
  const [nombre, setNombre] = useState<string>('');  // Tipos explícitos en los estados
  const [correo, setCorreo] = useState<string>('');
  const [contraseña, setContraseña] = useState<string>('');

  const handleRegistro = async () => {
    if (!nombre || !correo || !contraseña) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    // Datos del nuevo usuario
    const nuevoUsuario = {
      nombre,
      correo,
      contraseña,
    };

    try {
      // Llamada a la API para registrar el usuario
      const response = await axios.post('http://192.168.1.145:8000/api/usuarios/', nuevoUsuario);
      Alert.alert('Éxito', 'Usuario registrado con éxito.');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      Alert.alert('Error', 'Ocurrió un error al registrar el usuario.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#B3B3B3"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#B3B3B3"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#B3B3B3"
        secureTextEntry={true}
        value={contraseña}
        onChangeText={setContraseña}
      />
      <TouchableOpacity style={styles.boton} onPress={handleRegistro}>
        <Text style={styles.botonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  input: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#1C1C1C',
    color: '#FFF',
  },
  boton: {
    backgroundColor: '#1DB954',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegistroScreen;
