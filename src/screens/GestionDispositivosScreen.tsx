import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { RouteProp, useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback } from 'react';

// Definimos el tipo de las rutas en la navegación
type RootStackParamList = {
  GestionDispositivos: { idZona: number };
  AgregarDispositivo: { idZona: number };  // Añadimos la ruta para agregar dispositivos
};

type GestionDispositivosRouteProp = RouteProp<RootStackParamList, 'GestionDispositivos'>;
type GestionDispositivosNavigationProp = StackNavigationProp<RootStackParamList, 'GestionDispositivos'>;

interface Dispositivo {
  id_dispositivo: number;
  tipo: string;
  estado: boolean;
}

const GestionDispositivosScreen: React.FC = () => {
  const route = useRoute<GestionDispositivosRouteProp>(); // Obtener el parámetro idZona tipado correctamente
  const navigation = useNavigation<GestionDispositivosNavigationProp>(); // Usamos useNavigation para navegar
  const { idZona } = route.params; // Obtenemos el idZona desde la navegación
  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar los dispositivos IoT
  const fetchDispositivos = async () => {
    setLoading(true);
    setError(null); // Reiniciar el error al hacer una nueva petición
    try {
      const response = await axios.get(`http://192.168.1.145:8000/api/zonas_riego/${idZona}/dispositivos`);
      setDispositivos(response.data);
    } catch (err) {
      console.log("Error cargando los dispositivos:", err);
      setError('Error al cargar los dispositivos.');
    } finally {
      setLoading(false);
    }
  };

  // Usar useFocusEffect para recargar los dispositivos cuando se vuelve a la pantalla
  useFocusEffect(
    useCallback(() => {
      fetchDispositivos(); // Cargar los dispositivos cada vez que la pantalla es enfocada
    }, [idZona])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderDispositivo = ({ item }: { item: Dispositivo }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DispositivoDatos', { idDispositivo: item.id_dispositivo })} // Navegamos a la pantalla de datos del dispositivo
    >
      <View style={styles.card}>
        <Image
          source={require('../../assets/upc.png')}  // Ruta de la imagen
          style={styles.icon}  // Aplicamos el estilo para la imagen
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Tipo: {item.tipo}</Text>
          <Text style={styles.text}>Estado: {item.estado ? 'Activo' : 'Inactivo'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dispositivos}
        keyExtractor={(item) => item.id_dispositivo.toString()}
        renderItem={renderDispositivo}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Botón flotante para agregar un nuevo dispositivo */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AgregarDispositivo', { idZona })} // Navegamos a AgregarDispositivo con el idZona
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fondo negro
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Fondo negro también aquí
  },
  card: {
    flexDirection: 'row', // Para alinear la imagen y el texto
    backgroundColor: '#FFFFFF', // Cartas blancas
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
  infoContainer: {
    marginLeft: 10, // Espacio entre la imagen y el texto
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000', // Texto negro para contraste en la tarjeta blanca
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#000000', // Texto negro en las tarjetas blancas
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
  },
  icon: {
    width: 30,  // Tamaño del icono
    height: 30, // Tamaño del icono
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

export default GestionDispositivosScreen;
