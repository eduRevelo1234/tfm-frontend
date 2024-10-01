import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ZonasRiegoScreen from '../screens/ZonasRiegoScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="ZonasRiego">
    <Stack.Screen name="ZonasRiego" component={ZonasRiegoScreen} />
  </Stack.Navigator>
);

export default AppNavigator;