import constantes from '../context/Constantes';
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButton, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const CardChat = ({item, user, route}) => {
  console.log(item + 'en Card Chat');
  console.log(item);
  const {chat} = item;
  const navigation = useNavigation();
  const [image, gFotoURL] = useState('../../img/default.jpg');
  const [nameUsr1, setNombre1] = useState();
  const [nameUsr2, setNombre2] = useState();
  const [nameMascota, setNombreMas] = useState();
  const petRef = useRef(null);

  useEffect(() => {
    setNombreMas(
      chat.nameMascota.substring(0, 1).toUpperCase() +
        chat.nameMascota.substr(1, chat.nameMascota.length - 1),
    );

    setNombre1(
      chat.nameUsr1.substring(0, 1).toUpperCase() +
        chat.nameUsr1.substr(1, chat.nameUsr1.length - 1),
    );

    setNombre2(
      chat.nameUsr2.substring(0, 1).toUpperCase() +
        chat.nameUsr2.substr(1, chat.nameUsr2.length - 1),
    );
  }, []);

  const buscarMascota = async (id, redirect) => {
    try {
      console.log('chatRef.current.idMascota');
      console.log(id);
      const url = constantes.BASE_URL + `pet/${id}`;
      console.log(url);
      const resultado = await axios.get(url);
      console.log('paso por obetener pet data');
      petRef.current = resultado.data;
      console.log(petRef.current);
      console.log(resultado.data);

      if (petRef.current != null) {
        console.log('petRef.current');
        console.log(petRef.current);
        if (redirect === 'chat') {
          navigation.navigate('ChatScreen', {
            navigation: navigation,
            pet: petRef.current,
            idChat: item._id,
            chat: {
              idChat: item._id,
              fecha: chat.fecha,
              idMascota: chat.idMascota,
              imagenMascota: chat.imagenMascota,
              nameMascota: chat.nameMascota,
              nameUsr1: chat.nameUsr1,
              nameUsr2: chat.nameUsr2,
              usuario1: chat.usuario1,
              usuario2: chat.usuario2,
              solicitado: chat.solicitado,
            },
            user: {_id: user._id, name: user.name},
          });
        } else {
          navigation.push('DetalleMascota', {
            pet: petRef.current,
            idMascota: item.chat?.idMascota,
          });
          //navigation.push('BuscarStack', {screen: 'DetalleMascota'});

        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        buscarMascota(chat.idMascota, 'chat');
      }}>
      <View style={style.cardNew}>
        <View>
          <TouchableOpacity
            onPress={() => {
              buscarMascota(chat.idMascota, 'detalle');
            }}>
            <Image
              style={style.avatarImage}
              source={{
                uri: item.chat?.imagenMascota,
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View style={style.cuerpo}>
            {chat.nameMascota !== '' && (
              <View style={style.viewRow}>
                <Text style={style.textlabel}>Mascota</Text>
                <Text style={style.text}> {nameMascota}</Text>
              </View>
            )}
            <View style={style.viewRow}>
              <Text style={style.textlabel}>Transitado por</Text>
              <Text style={style.text}>{nameUsr1}</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={style.cuerpo}>
            {chat.nameMascota !== '' && (
              <View style={style.viewRow}>
                <Text style={style.textlabel}>Adoptante</Text>
                <Text style={style.text}> {nameUsr2}</Text>
              </View>
            )}

            {chat.solicitado === true && chat.usuario1 === user._id && (
              <View style={style.viewRow}>
                <Text style={style.textlabel} />
                <Text style={style.textSolc}>Solicitado</Text>
              </View>
            )}

            {chat.solicitado === true && chat.usuario1 !== user._id && (
              <View style={style.viewRow}>
                <Text style={style.textlabel} />
                <Text style={style.textSolc}>Solicitaste</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  textSolc: {
    textAlign: 'center',
    marginStart: 20,
    fontSize: 20,
    backgroundColor: '#9575cd',
    color: '#FFFFFF',
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  viewRow: {
    marginTop: 5,
  },
  cuerpo: {
    flexDirection: 'column',
    marginStart: 10,
    justifyContent: 'space-between',
  },
  avatarImage: {
    borderWidth: 1,
    //borderColor: '#252932',
    height: 80,
    width: 80,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    color: '#9575cd',
    fontSize: 20,
  },
  textlabel: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '800',
  },
  cardNew: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
});
export default CardChat;
