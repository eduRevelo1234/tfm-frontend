import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

// Definimos el tipo de las rutas en la navegación
type RootStackParamList = {
  AgregarDispositivo: { idZona: number };
};

type AgregarDispositivoRouteProp = RouteProp<RootStackParamList, 'AgregarDispositivo'>;

const AgregarDispositivoScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<AgregarDispositivoRouteProp>();  // Obtenemos el idZona de la navegación
  const { idZona } = route.params;

  const [tipo, setTipo] = useState<string>('');  // Estado para el tipo de dispositivo
  const [estado, setEstado] = useState<boolean>(true);  // Estado para el estado del dispositivo

  // Función para manejar el envío del formulario
  const handleGuardarDispositivo = async () => {
    if (!tipo) {
      Alert.alert('Error', 'Por favor ingresa el tipo de dispositivo.');
      return;
    }

    // Preparar el objeto del nuevo dispositivo
    const nuevoDispositivo = {
      tipo,
      estado,
      id_zona: idZona,
    };

    try {
      const response = await axios.post('http://192.168.1.145:8000/api/dispositivos_iot', nuevoDispositivo);
      console.log('Dispositivo guardado con éxito:', response.data);
      Alert.alert('Éxito', 'Dispositivo agregado correctamente.');
      navigation.goBack();  // Regresar a la pantalla anterior
    } catch (error) {
      console.error('Error al guardar el dispositivo:', error);
      Alert.alert('Error', 'Ocurrió un error al agregar el dispositivo.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Campo de entrada para el tipo de dispositivo */}
      <TextInput
        style={styles.input}
        placeholder="Tipo de Dispositivo"
        placeholderTextColor="#B3B3B3"
        value={tipo}
        onChangeText={setTipo}
      />
      
      {/* Botón para cambiar el estado del dispositivo */}
      <Pressable 
        onPress={() => setEstado(!estado)} 
        style={[
          styles.estadoButton, 
          estado ? styles.activoButton : styles.inactivoButton
        ]}>
        <Text style={styles.estadoText}>{estado ? 'Activo' : 'Inactivo'}</Text>
      </Pressable>

      {/* Botón para guardar el dispositivo */}
      <Pressable style={styles.boton} onPress={handleGuardarDispositivo}>
        <Text style={styles.botonText}>Guardar Dispositivo</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',  // Fondo oscuro
  },
  input: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#1C1C1C',  // Fondo del input
    color: '#FFF',
  },
  estadoButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  activoButton: {
    backgroundColor: '#1DB954',  // Verde estilo Spotify
  },
  inactivoButton: {
    backgroundColor: '#FF3B30',  // Rojo para estado inactivo
  },
  estadoText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  boton: {
    backgroundColor: '#1DB954',  // Verde estilo Spotify
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

export default AgregarDispositivoScreen;
