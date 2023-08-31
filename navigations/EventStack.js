import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Eventos from '../views/Events';

const Stack = createStackNavigator();

export default function EventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Events"
        component={Eventos}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
