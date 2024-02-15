import React, {useState, useEffect, useRef} from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {
  Button,
  Portal,
  Dialog,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import {Card} from 'react-native-elements';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import constantes from '../context/Constantes';
import globalStyles from '../../styles/global';

const MascotaItem = ({pet, consultarMascotas, navigation, route}) => {
  console.log('pet');
  console.log(pet);
  const params = new URLSearchParams();
  const [image] = useState('../../img/default.jpg');
  const {image_url, name, state, sex, old, fechaInicioS} = pet;
  const [nameSexo, setNameSex] = useState('gender-male');
  const [postText, setPostText] = React.useState('');
  const [found, setFound] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [edit, setEditPet] = useState(true);
  const [color, setColor] = useState('');
  const [message, setMensaje] = useState(
    'Desea eliminar esta mascota permanentemente?',
  );
  const [labelBoton, setLabelBoton] = useState('Eliminar');

  useEffect(() => {
    console.log('entro a useEffec con la pet ' + pet);
    console.log(image);
  }, [image_url]);

  useEffect(() => {
    tomoNombreIcon();
    sexPet();
    validFound();
  }, [pet]);

  const tomoNombreIcon = () => {
    editMascota();
    switch (state) {
      case 'inAdoption':
      case 'adopted':
      case 'follow':
        setColor('yellow');
        if (state === 'inAdoption') {
          setPostText('Adopción');
        } else {
          setPostText(state);
        }
        break;
      case 'wanted':
      case 'atHome':
        setColor('sky-blue');
        if (state === 'atHome') {
          setPostText('EN CASA');
        } else {
          setPostText(state);
        }
        break;
      case 'found':
      case 'delivered':
        setPostText(state);
        setColor('green');
        break;
    }
  };

  const editMascota = () => {
    setEditPet(true);
    switch (state) {
      case 'delivered':
      case 'atHome':
      case 'adopted':
      case 'follow':
        setEditPet(false);
        break;
    }
  };

  const sexPet = () => {
    if (sex.toUpperCase() === 'male') {
      setNameSex('gender-male');
    } else {
      setNameSex('gender-female');
    }
  };

  const validFound = () => {
    if (pet.state === 'found' || pet.state === 'delivered') {
      setFound(true);
    }
  };

  const petState = () => {
    console.log('Entro por pet state');
    if (pet.state === 'found' || pet.state === 'delivered') {
      navigation.navigate('StatusPet', {
        pet: pet,
        type: pet.state,
      });
    }
    if (
      pet.state === 'inAdoption' ||
      pet.state === 'follow' ||
      pet.state === 'adopted'
    ) {
      navigation.navigate('EstadosAdopcion', {pet: pet});
    }
    if (pet.state == 'wanted' || pet.state == 'atHome') {
      navigation.navigate('StatusPet', {
        pet: pet,
        type: pet.state,
      });
    }
  };

  const eliminarMascota = async () => {
    try {
      const url = constantes.BASE_URL + `eliminarMascota/${pet.id}`;
      console.log(url);
      const resultado = await axios.post(url);
      console.log(resultado.data);
      console.log('Se elimino la pet con éxito');
      setMensaje('Se eliminó la mascota con éxito');
      setLabelBoton('OK');
      setAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={petState}>
      <View>
        <View style={style.viewContainer}>
          <View style={style.viewMascota}>
            <Image
              style={style.imgMascota}
              source={{
                uri: image_url,
              }}
            />
            {edit == true && (
              <View style={style.container}>
                <IconButton
                  icon="pencil"
                  color="#FFFFFF"
                  style={style.fab}
                  onPress={() => {
                    navigation.navigate('NewPet', {pet: pet});
                  }}
                  size={30}
                />
              </View>
            )}
            <IconButton
              icon="trash-can"
              color="#FFFFFF"
              style={style.fabDelete}
              onPress={() => {
                setLabelBoton('Eliminar');
                setMensaje('Desea eliminar esta mascota permanentemente?');
                setAlert(true);
              }}
              size={30}
            />
          </View>

          <View style={style.infoMascota}>
            {found && (
              <View style={style.containerH1}>
                <Text style={style.name}>{fechaInicioS}</Text>
                <Maticons
                  style={style.iconSexo}
                  name={nameSexo}
                  size={30}
                  color="#9575cd"
                />
              </View>
            )}
            {!found && (
              <View style={style.containerH1}>
                <Text style={style.name}>{name}</Text>
                <Text style={style.old}>, {old} años</Text>
                <Maticons
                  style={style.iconSexo}
                  name={nameSexo}
                  size={30}
                  color="#9575cd"
                />
              </View>
            )}
          </View>
          {color === 'green' && (
            <Text style={style.textEstadoEn}>{postText}</Text>
          )}
          {color === 'yellow' && (
            <Text style={style.textEstado}>{postText}</Text>
          )}
          {color === 'sky-blue' && (
            <Text style={style.textEstadoBus}>{postText}</Text>
          )}
        </View>
      </View>
      <Portal>
        <Dialog visible={alert} style={globalStyles.dialog}>
          <Dialog.Title style={globalStyles.dialosetTitle}>Mensaje</Dialog.Title>
          <Dialog.Content style={globalStyles.dialogMsj}>
            <Paragraph>{message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={{justifyContent: 'space-between'}}>
            {message == 'Desea eliminar esta mascota permanentemente?' && (
              <Button
                style={{marginHorizontal: 10}}
                onPress={() => {
                  setAlert(false);
                }}>
                Cancelar
              </Button>
            )}
            <Button
              style={{marginHorizontal: 10}}
              onPress={() => {
                setAlert(false);
                eliminarMascota();
                consultarMascotas(true);
              }}>
              {labelBoton}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  textEstadoBus: {
    fontSize: 23,
    backgroundColor: '#f5bb05',
    flex: 1,
    textAlign: 'center',
    padding: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  textEstadoEn: {
    fontSize: 23,
    backgroundColor: '#F59822',
    flex: 1,
    textAlign: 'center',
    padding: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  fabDelete: {
    position: 'absolute',
    marginBottom: 24,
    top: 0,
    backgroundColor: 'transparent',
  },
  fab: {
    position: 'absolute',
    margin: 10,
    marginBottom: 24,
    right: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
  textEstado: {
    fontSize: 23,
    backgroundColor: '#9575cd',
    flex: 1,
    textAlign: 'center',
    padding: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  infoMascota: {
    flex: 2,
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'baseline',
  },
  containerH1: {
    flexDirection: 'row',
    flex: 3,
    alignItems: 'center',
    marginStart: 10,
  },
  containerH2: {
    flexDirection: 'row',
    marginRight: 'auto',
  },
  viewContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
    flexDirection: 'column',
    marginVertical: 10,
  },
  viewMascota: {
    flexDirection: 'row',
    alignContent: 'center',
    margin: 0,
  },
  viewMascotaImg: {
    flexDirection: 'row',
    marginRight: 15,
  },
  imgMascota: {
    height: 200,
    flex: 1,
    borderRadius: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  name: {
    fontSize: 30,
    marginTop: 'auto',
  },
  aboutMeText: {
    fontSize: 10,
  },
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  botonesGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  aboutMe: {
    fontSize: 18,
    color: '#D5D8DC',
  },
  decContainer: {
    flexWrap: 'nowrap',
  },
  old: {
    fontSize: 30,
    marginTop: 'auto',
  },
  iconSexo: {
    position: 'absolute',
    margin: 10,
    right: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
});
export default MascotaItem;
