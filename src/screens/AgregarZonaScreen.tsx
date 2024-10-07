import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import axios, { AxiosError } from 'axios';

// Definición de tipos para la navegación
type RootStackParamList = {
  AgregarZona: { idUsuario: number };
  ZonasRiego: { idUsuario: number; refresh: boolean };
};

type AgregarZonaScreenRouteProp = RouteProp<RootStackParamList, 'AgregarZona'>;
type AgregarZonaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AgregarZona'>;

const AgregarZonaScreen: React.FC = () => {
  const navigation = useNavigation<AgregarZonaScreenNavigationProp>(); // Tipamos useNavigation
  const route = useRoute<AgregarZonaScreenRouteProp>(); // Obtenemos el idUsuario de la navegación
  const { idUsuario } = route.params;

  // Estados para los campos del formulario
  const [nombreZona, setNombreZona] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [humedadMin, setHumedadMin] = useState("");
  const [humedadMax, setHumedadMax] = useState("");
  const [temperaturaMin, setTemperaturaMin] = useState("");
  const [temperaturaMax, setTemperaturaMax] = useState("");

  // Función para validar los campos y guardar la nueva zona
  const handleGuardarZona = () => {
    // Validaciones básicas
    if (!nombreZona || !ubicacion || !humedadMin || !humedadMax || !temperaturaMin || !temperaturaMax) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    if (Number(humedadMin) >= Number(humedadMax)) {
      Alert.alert("Error", "La humedad mínima debe ser menor que la humedad máxima.");
      return;
    }

    if (Number(temperaturaMin) >= Number(temperaturaMax)) {
      Alert.alert("Error", "La temperatura mínima debe ser menor que la temperatura máxima.");
      return;
    }

    // Datos de la nueva zona incluyendo id_usuario
    const nuevaZona = {
      nombre_zona: nombreZona,
      ubicacion: ubicacion,
      humedad_min: Number(humedadMin),
      humedad_max: Number(humedadMax),
      temperatura_min: Number(temperaturaMin),
      temperatura_max: Number(temperaturaMax),
      id_usuario: idUsuario,  // Usamos el idUsuario que recibimos como parámetro
    };

    const enviarDatosZona = async () => {
      try {
        const response = await axios.post(
          "http://192.168.1.145:8000/api/zonas_riego",
          nuevaZona
        );
        console.log("Zona guardada con éxito:", response.data);
        Alert.alert("Éxito", "Zona de riego creada con éxito.");
        // Regresar a la pantalla anterior y recargar
        navigation.navigate('ZonasRiego', { idUsuario, refresh: true });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          // Error de validación o conexión
          if (axiosError.response) {
            console.error("Error de validación o datos:", axiosError.response.data);
            console.error("Status:", axiosError.response.status);
            Alert.alert("Error", "Ocurrió un error al guardar la zona.");
          } else if (axiosError.request) {
            console.error("No se recibió respuesta del servidor:", axiosError.request);
            Alert.alert("Error", "No se recibió respuesta del servidor.");
          } else {
            console.error("Error al configurar la solicitud:", axiosError.message);
            Alert.alert("Error", "Error desconocido al guardar la zona.");
          }
        } else {
          console.error("Error desconocido:", error);
          Alert.alert("Error", "Error desconocido al guardar la zona.");
        }
      }
    };

    enviarDatosZona();
  };

  return (
    <View style={styles.container}>
      {/* Campos del formulario */}
      <TextInput
        style={styles.input}
        placeholder="Nombre de la zona"
        placeholderTextColor="#B3B3B3"
        value={nombreZona}
        onChangeText={setNombreZona}
      />
      <TextInput
        style={styles.input}
        placeholder="Ubicación"
        placeholderTextColor="#B3B3B3"
        value={ubicacion}
        onChangeText={setUbicacion}
      />
      <TextInput
        style={styles.input}
        placeholder="Humedad mínima (%)"
        placeholderTextColor="#B3B3B3"
        keyboardType="numeric"
        value={humedadMin}
        onChangeText={setHumedadMin}
      />
      <TextInput
        style={styles.input}
        placeholder="Humedad máxima (%)"
        placeholderTextColor="#B3B3B3"
        keyboardType="numeric"
        value={humedadMax}
        onChangeText={setHumedadMax}
      />
      <TextInput
        style={styles.input}
        placeholder="Temperatura mínima (°C)"
        placeholderTextColor="#B3B3B3"
        keyboardType="numeric"
        value={temperaturaMin}
        onChangeText={setTemperaturaMin}
      />
      <TextInput
        style={styles.input}
        placeholder="Temperatura máxima (°C)"
        placeholderTextColor="#B3B3B3"
        keyboardType="numeric"
        value={temperaturaMax}
        onChangeText={setTemperaturaMax}
      />
      {/* Botón de Guardar */}
      <TouchableOpacity style={styles.boton} onPress={handleGuardarZona}>
        <Text style={styles.botonText}>Guardar Zona</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212", // Fondo oscuro
  },
  input: {
    height: 50,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#1C1C1C", // Fondo del input
    color: "#FFF", // Color del texto
  },
  boton: {
    backgroundColor: "#1DB954", // Verde estilo Spotify
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
});

export default AgregarZonaScreen;
