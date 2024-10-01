import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AgregarZonaScreen = () => {
  const [nombreZona, setNombreZona] = useState('');

  const handleAgregarZona = () => {
    // Lógica para agregar la nueva zona de riego
    console.log('Agregar nueva zona:', nombreZona);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la zona"
        value={nombreZona}
        onChangeText={setNombreZona}
      />
      <Button title="Agregar Zona" onPress={handleAgregarZona} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AgregarZonaScreen;