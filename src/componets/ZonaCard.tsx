import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ZonaCardProps {
  nombre: string;
  humedad: number;
  temperatura: number;
}

const ZonaCard: React.FC<ZonaCardProps> = ({ nombre, humedad, temperatura }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text>Humedad: {humedad}%</Text>
      <Text>Temperatura: {temperatura}°C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ZonaCard;