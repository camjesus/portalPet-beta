import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPets from '../views/MyPets';
import Map from '../views/Map';
import NewPet from '../views/NewPet';
import StatesAdoption from '../views/StatesAdoption';
import StatusPet from '../views/StatusPet';
import DetailsPet from '../views/DetailsPet';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    accent: 'transparent',
    backdrop: 'transparent',
    background: '#9575cd',
    disabled: 'rgba(0, 0, 0, 0.26)',
    error: '#B00020',
    notification: '#9575cd',
    onBackground: '#252932',
    onSurface: '#252932',
    placeholder: '#252932',
    primary: '#f5bb05',
    surface: '#252932',
    text: '#252932',
  },
  animation: {
    scale: 'transparent',
  },
};
export default function MyPetsStack() {
  return (
    <PaperProvider theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="MyPets"
          component={MyPets}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="NewPet"
          component={NewPet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StatesAdoption"
          component={StatesAdoption}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StatusPet"
          component={StatusPet}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="DetailsPet"
          component={DetailsPet}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}
