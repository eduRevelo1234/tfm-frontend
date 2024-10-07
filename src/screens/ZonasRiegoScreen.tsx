import React, { useState } from 'react'; 
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute, useFocusEffect, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pressable } from 'react-native';

// Definimos el tipo de las rutas en la navegación
type RootStackParamList = {
  ZonasRiego: { idUsuario: number };
  AgregarZona: { idUsuario: number };
  GestionDispositivos: { idZona: number };  // Añadimos GestionDispositivos
};

type ZonasRiegoScreenRouteProp = RouteProp<RootStackParamList, 'ZonasRiego'>;
type ZonasRiegoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ZonasRiego'>;

interface ZonaRiego {
  id_zona: number;
  nombre_zona: string;
  ubicacion: string;
  humedad_min: string;
  humedad_max: string;
  temperatura_min: string;
  temperatura_max: string;
}

const ZonasRiegoScreen: React.FC = () => {
  const [zonasRiego, setZonasRiego] = useState<ZonaRiego[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigation = useNavigation<ZonasRiegoScreenNavigationProp>(); // Tipamos useNavigation
  const route = useRoute<ZonasRiegoScreenRouteProp>(); // Obtener el parámetro idUsuario tipado correctamente
  const { idUsuario } = route.params; // Obtenemos el idUsuario desde la navegación

  // Función para cargar las zonas de riego
  const fetchZonas = async () => {
    setLoading(true);  // Mostrar indicador de carga
    try {
      const response = await axios.get(`http://192.168.1.145:8000/api/usuarios/${idUsuario}/zonas`);
      setZonasRiego(response.data);
    } catch (err) {
      setError('Error al cargar las zonas de riego');
    } finally {
      setLoading(false);  // Ocultar indicador de carga
    }
  };

  // Usar useFocusEffect para recargar las zonas cuando se vuelve a la pantalla
  useFocusEffect(
    React.useCallback(() => {
      fetchZonas();
    }, [idUsuario]) // Se ejecuta cuando cambia idUsuario
  );

  // Mostrar un indicador de carga mientras los datos se están cargando
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  // Mostrar un mensaje de error si la solicitud falla
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Función que maneja la navegación a la pantalla de GestionDispositivos
  const handleZonaPress = (id_zona: number) => {
    navigation.navigate('GestionDispositivos', { idZona: id_zona });  // Navegar a GestionDispositivos pasando el idZona
  };

  // Renderizar cada zona de riego en una tarjeta
  const renderZona = ({ item }: { item: ZonaRiego }) => (
    <Pressable onPress={() => handleZonaPress(item.id_zona)}>  
      <View style={styles.card}>
        <Text style={styles.title}>{item.nombre_zona}</Text>
        <Text style={styles.text}>Ubicación: {item.ubicacion}</Text>
        <Text style={styles.text}>Humedad: {item.humedad_min} - {item.humedad_max}%</Text>
        <Text style={styles.text}>Temperatura: {item.temperatura_min} - {item.temperatura_max}°C</Text>
      </View>
      </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={zonasRiego}
        keyExtractor={(item) => item.id_zona.toString()}
        renderItem={renderZona}
      />
      
      {/* Botón flotante para agregar una nueva zona */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AgregarZona', { idUsuario })} // Pasamos idUsuario a AgregarZona
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  card: {
    backgroundColor: '#1C1C1C',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
    backgroundColor: '#121212',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1DB954',  // Color verde estilo Spotify
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    bottom: 20,
    elevation: 5,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default ZonasRiegoScreen;
