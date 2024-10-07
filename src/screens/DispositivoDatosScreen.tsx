import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';

// Definimos el tipo de las rutas en la navegación
type RootStackParamList = {
  DispositivoDatos: { idDispositivo: number };
};

type DispositivoDatosRouteProp = RouteProp<RootStackParamList, 'DispositivoDatos'>;

interface DatoSensor {
  fecha_hora: string;
  valor: number;
  tipo_dato: string;
}

const DispositivoDatosScreen: React.FC = () => {
  const route = useRoute<DispositivoDatosRouteProp>();
  const { idDispositivo } = route.params;
  const [datos, setDatos] = useState<DatoSensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar los datos del sensor
  const fetchDatos = async () => {
    setLoading(true);
    setError(null); // Reiniciar el error
    try {
      const response = await axios.get(`http://192.168.1.145:8000/api/dispositivos_iot/${idDispositivo}/datos`);
      setDatos(response.data);
    } catch (err) {
      console.log("Error cargando los datos:", err);
      setError('Error al cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatos(); // Cargar los datos al montar el componente
  }, [idDispositivo]);

  // Preparar los datos del gráfico
  const dataLabels = datos.map(d => new Date(d.fecha_hora).toLocaleTimeString()); // Etiquetas de tiempo
  const dataValues = datos.map(d => d.valor); // Valores del sensor

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Datos del Dispositivo IoT</Text>
      
      <LineChart
        data={{
          labels: dataLabels,
          datasets: [
            {
              data: dataValues
            }
          ]
        }}
        width={Dimensions.get('window').width - 20} // Ancho del gráfico
        height={220} // Alto del gráfico
        yAxisSuffix="°C" // Sufijo en el eje Y (puede cambiar a % para humedad, por ejemplo)
        chartConfig={{
          backgroundColor: '#121212',
          backgroundGradientFrom: '#1C1C1C',
          backgroundGradientTo: '#1C1C1C',
          decimalPlaces: 2, // Número de decimales
          color: (opacity = 1) => `rgba(29, 185, 84, ${opacity})`, // Verde estilo Spotify
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#1DB954"
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
  },
});

export default DispositivoDatosScreen;
