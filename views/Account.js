import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Text,
  IconButton,
  TextInput,
  Button,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Account = ({navigation}) => {
  const [name, gName] = useState('');
  const [apellido, gApellido] = useState('');
  const [email, gEmail] = useState('');
  const [telefono, gTelefono] = useState('');
  const [camposEdit, gCamposEdit] = useState(true);
  const [iconoRight, setIconoRight] = useState('pencil');
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [editoCampos, setEditoCampos] = useState(false);

  const usuario = {
    name,
    apellido,
    email,
    password: null,
    ubicacion: null,
    telefono,
  };

  useEffect(() => {
    console.log('entre a cuena');
    obtenerDatosStorage();
    initialValues();
  }, []);

  const initialValues = () => {
    setEditoCampos(false);
    setIconoRight('pencil');
    gCamposEdit(true);
  };

  const obtenerDatosStorage = async () => {
    try {
      await AsyncStorage.getItem('email').then((value) => {
        gEmail(value);
        console.log(value);
      });

      await AsyncStorage.getItem('name').then((value) => {
        gName(
          value.substring(0, 1).toUpperCase() +
            value.substring(1, value.length),
        );
      });

      await AsyncStorage.getItem('lastname').then((value) => {
        gApellido(
          value.substring(0, 1).toUpperCase() +
            value.substring(1, value.length),
        );
      });

      await AsyncStorage.getItem('phone').then((value) => {
        gTelefono(value);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editUsuario = async (icono) => {
    if (editoCampos && icono === 'check') {
      if (telefono.length !== 10) {
        setMessage('El número de teléfono es inválido, verifique los datos');
        setAlert(true);
        return;
      }
      try {
        //agregar update al firebase
          await AsyncStorage.setItem('name', usuario.name);
          await AsyncStorage.setItem('lastname', usuario.apellido);
          await AsyncStorage.setItem('phone', usuario.telefono);
          await AsyncStorage.setItem('email', usuario.email);
          setMessage('El usuario se editó con éxito');
          setAlert(true);

      } catch (error) {
        console.log(error);
        setMessage('Error al edit el usuario');
        setAlert(true);
        return;
      }
      initialValues();
    }
  };

  return (
    <View style={style.base}>
      <View style={style.header}>
        <IconButton
          icon="arrow-left"
          color="#FFFFFF"
          style={style.iconBack}
          onPress={() => navigation.navigate('Home')}
          size={30}
        />
        <Text style={style.title}>Mis Datos</Text>
        <IconButton
          icon={iconoRight}
          color="#FFFFFF"
          style={style.iconEdit}
          onPress={() => {
            gCamposEdit(!camposEdit);
            if (iconoRight === 'check') {
              setIconoRight('pencil');
            } else {
              setIconoRight('check');
            }
            editUsuario(iconoRight);
          }}
          size={30}
        />
      </View>
      <View style={style.cardNew}>
        <ScrollView style={style.scroll}>
          <View style={style.contenedor}>
            <TextInput
              label="Nombre"
              value={name}
              onChangeText={(text) => {
                gName(text);
                setEditoCampos(true);
              }}
              style={style.input}
              disabled={camposEdit}
            />
            <TextInput
              label="Apellido"
              value={apellido}
              onChangeText={(text) => {
                gApellido(text);
                setEditoCampos(true);
              }}
              style={style.input}
              disabled={camposEdit}
            />
            <TextInput
              label="Teléfono"
              value={telefono}
              onChangeText={(text) => {
                gTelefono(text);
                setEditoCampos(true);
              }}
              style={style.input}
              disabled={camposEdit}
            />
            <TextInput
              label="Email"
              value={email}
              style={style.input}
              disabled="true"
            />
          </View>
          <View style={style.Viewguardar}>
            <Button
              style={style.guardar}
              mode="contained"
              compact={true}
              disabled={!editoCampos}
              onPress={() => editUsuario(iconoRight)}>
              Editar
            </Button>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  Viewguardar: {
    flex: 2,
    bottom: 0,
  },
  scroll: {
    padding: 0,
    margin: 0,
  },
  base: {
    flexDirection: 'column',
    flex: 1,
  },
  contenedor: {
    justifyContent: 'space-evenly',
    margin: 10,
  },
  titleTxt: {
    textAlign: 'center',
    fontSize: 35,
    color: '#252932',
  },
  itemDato: {
    fontSize: 15,
    marginTop: 10,
    paddingTop: 5,
    color: '#252932',
  },
  itemNombre: {
    fontSize: 20,
    marginStart: 10,
    color: '#252932',
    textTransform: 'capitalize',
  },

  itemTitulo: {
    fontSize: 15,
    margin: 10,
    paddingTop: 5,
    fontWeight: 'bold',
    color: '#252932',
  },
  viewTitulo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewItem: {
    flexDirection: 'column',
  },
  viewEdit: {
    flexDirection: 'row',
  },
  cardCont: {
    margin: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingBottom: 90,
    backgroundColor: '#9575cd',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  iconBack: {
    left: 10,
    top: 10,
  },
  iconEdit: {
    right: 10,
    top: 10,
  },
  title: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 26,
    marginVertical: 30,
    padding: 0,
  },
  cardNew: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 40,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 10,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    paddingHorizontal: 30,
    marginTop: -80,
    width: '90%',
    padding: 20,
    flexDirection: 'column',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'transparent',
    flex: 4,
  },
  guardar: {
    justifyContent: 'flex-end',
    backgroundColor: '#9575cd',
    padding: 3,
    flex: 3,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginHorizontal: 40,
    marginTop: 80,
    marginBottom: 10,
  },
});
export default Account;
