import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function ButtonCamera({ type, onPress, icon, color }) {
  return (
    <TouchableOpacity onPress={onPress} style={type == "circle" ? styles.buttonCircle : styles.button}>
      <Entypo name={icon} size={type == "circle" ? 40 : 28} color={color ? color : '#f1f1f1'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCircle: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#f1f1f1',
    marginLeft: 10,
  },
});