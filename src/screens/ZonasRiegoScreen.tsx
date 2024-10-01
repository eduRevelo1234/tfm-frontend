import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FAB, Card, Button, Menu, Divider, Provider } from 'react-native-paper'; // Usaremos react-native-paper para algunos componentes
import { useNavigation } from '@react-navigation/native';

// Define la estructura de los datos de las zonas
interface ZonaRiego {
  id: number;
  nombre_zona: string;
  humedad: number;
  temperatura: number;
}

// Pantalla principal para listar las zonas de riego
const ZonasRiegoScreen: React.FC = () => {
  const [zonasRiego, setZonasRiego] = useState<ZonaRiego[]>([]);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Simulamos la obtención de datos de las zonas de riego (aquí puedes integrar una API)
    const fetchZonas = async () => {
      // Aquí deberías hacer la llamada a la API para obtener las zonas del usuario
      const datosPrueba = [
        { id: 1, nombre_zona: 'Zona 1', humedad: 45.5, temperatura: 22.1 },
        { id: 2, nombre_zona: 'Zona 2', humedad: 30.2, temperatura: 19.8 },
        { id: 3, nombre_zona: 'Zona 3', humedad: 55.0, temperatura: 24.5 },
      ];
      setZonasRiego(datosPrueba);
    };
    
    fetchZonas();
  }, []);

  // Mostrar menú
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // Renderiza cada zona en una tarjeta
  const renderZona = ({ item }: { item: ZonaRiego }) => (
    <Card style={styles.card}>
      <Card.Title title={item.nombre_zona} />
      <Card.Content>
        <Text>Humedad: {item.humedad}%</Text>
        <Text>Temperatura: {item.temperatura}°C</Text>
      </Card.Content>
    </Card>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.menu}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button onPress={openMenu} icon="menu">Menú</Button>
            }>
            <Menu.Item onPress={() => {}} title="Perfil" />
            <Menu.Item onPress={() => {}} title="Configuraciones" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Cerrar sesión" />
          </Menu>
        </View>

        <FlatList
          data={zonasRiego}
          renderItem={renderZona}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />

        {/* Botón flotante para agregar nueva zona */}
        <FAB
          style={styles.fab}
          small
          icon="plus"
          label="Agregar Zona"
          onPress={() => {
            navigation.navigate('AgregarZona'); // Aquí iría la navegación a la pantalla de agregar zona
          }}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 16,
  },
});

export default ZonasRiegoScreen;
