import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ZonasRiegoScreen from "../screens/ZonasRiegoScreen";
import AgregarZonaScreen from "../screens/AgregarZonaScreen";
import GestionDispositivosScreen from "../screens/GestionDispositivosScreen";
import AgregarDispositivoScreen from "../screens/AgregarDispositivoScreen";
import DispositivoDatosScreen from "../screens/DispositivoDatosScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import { RootStackParamList } from "../navigation/types";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#121212", // Fondo oscuro del header
        },
        headerTintColor: "#FFFFFF", // Color del texto en el header
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* Inicio de Sesión será la primera pantalla */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Inicio de Sesión" }}
      />
      <Stack.Screen
        name="Registro"
        component={RegistroScreen}
        options={{ title: "Registro de Usuario" }}
      />
      <Stack.Screen
        name="ZonasRiego"
        component={ZonasRiegoScreen}
        options={{ title: "Zonas de Riego" }}
      />
      <Stack.Screen
        name="AgregarZona"
        component={AgregarZonaScreen}
        options={{ title: "Agregar Zona" }}
      />
      <Stack.Screen
        name="GestionDispositivos"
        component={GestionDispositivosScreen}
        options={{ title: "Gestionar Dispositivos" }}
      />
      <Stack.Screen
        name="AgregarDispositivo"
        component={AgregarDispositivoScreen}
        options={{ title: "Agregar Dispositivo" }}
      />
      <Stack.Screen
        name="DispositivoDatos"
        component={DispositivoDatosScreen}
        options={{ title: "Datos del Dispositivo" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
