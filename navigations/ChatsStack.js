import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from '../views/ChatScreen';
import ChatsList from '../views/ChatsList';
import DetailPet from '../views/DetailsPet';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    accent: '#252932',
    backdrop: 'transparent',
    background: '#9575cd',
    disabled: 'rgba(0, 0, 0, 0.90)',
    error: '#B00020',
    notification: '#f50057',
    onBackground: '#252932',
    onSurface: '#252932',
    placeholder: '#252932',
    primary: '#252932',
    surface: '#FFFFFF',
    text: '#252932',
  },
};

export default function ChatsStack() {
  return (
    <PaperProvider theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="ChatsList"
          component={ChatsList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailPet"
          component={DetailPet}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}
