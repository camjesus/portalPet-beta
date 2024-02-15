import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Card} from 'react-native-paper';

import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';

const EventoItem = ({evento}) => {
  console.log('evento');
  console.log(evento);
  const espacio = ' - ';

  return (
    <Card style={style.title}>
      <View style={style.viewHeader}>
        <View>
          <Maticons
            style={style.titleIcon}
            name="calendar-week"
            size={40}
            color="#252932"
          />
        </View>
        <Text style={style.titHeader}>{evento.lugar}</Text>
      </View>
      <View style={style.viewEvento}>
        <View style={style.viewDesc}>
          <View style={style.viewRow}>
            <Text style={style.nameText}>Dirección: </Text>
            <Text style={style.aboutMeText}>{evento.direccion}</Text>
          </View>

          <View style={style.viewRow}>
            <Text style={style.nameText}>Barrio: </Text>
            <Text style={style.aboutMeText}>{evento.barrio}</Text>
          </View>
          <View style={style.viewRow}>
            <Text style={style.nameText}>Día y Horario: </Text>
            <Text style={style.aboutMeText}>
              {evento.dias}
              {espacio}
              {evento.horarios}
            </Text>
          </View>
          <View style={style.viewRow}>
            <Text style={style.nameText}>Descripción: </Text>
            <Text style={style.textLargo}>{evento.consultas}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const style = StyleSheet.create({
  title: {
    margin: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  nameText: {
    fontWeight: 'bold',
    color: '#252932',
  },
  aboutMeText: {
    fontSize: 13,
    color: '#252932',
    textTransform: 'capitalize',
  },
  textLargo: {
    fontSize: 13,
    color: '#252932',
  },
  viewEvento: {
    flexDirection: 'row',
    margin: 15,
  },
  viewDesc: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleIcon: {
    margin: 10,
  },
  viewRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewHeader: {
    backgroundColor: '#9575cd',
    flexDirection: 'row',
    borderBottomColor: '#252932',
    borderBottomWidth: 1,
    borderTopEndRadius: 10,
  },
  titHeader: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingStart: 10,
    textTransform: 'capitalize',
  },
});
export default EventoItem;
