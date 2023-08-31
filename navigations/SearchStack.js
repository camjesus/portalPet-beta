import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Filters from '../views/Filters';
import Home from '../views/Home';
import Login from '../views/Login';
import Account from '../views/Account';
import NewUser from '../views/NewUser';
import DetailsPet from '../views/DetailsPet';
import Report from '../views/Report';
import ChatScreen from '../views/ChatScreen';

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

export default function SearchStack() {
  return (
    <PaperProvider theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Filters"
          component={Filters}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailsPet"
          component={DetailsPet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}

//options={({navigation, route}) => ({
//  title: 'Adoptame',
//  headerTitleAlign: 'center',
//  headerRight: (props) => (
//    <BarraFiltro {...props} navigation={navigation} route={route} />
//  ),
//})}
