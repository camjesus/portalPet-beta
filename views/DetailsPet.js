import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, PermissionsAndroid, Image, Alert} from 'react-native';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Text, ToggleButton, IconButton, Menu} from 'react-native-paper';
import globalStyles from '../styles/global';
import AsyncStorage from "@react-native-async-storage/async-storage";


const DetailsPet = ({navigation, route, props}) => {
  const {params} = route;
  const {pet} = params;
  const [nombreSexo, gNombreSexo] = useState('gender-male');
  const [colorChico, setColorChico] = useState('white');
  const [colorMediano, setColorMediano] = useState('white');
  const [colorGrande, setColorGrande] = useState('white');
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [userId, setIdUsuario] = useState(null);
  const [name, gNombre] = useState('');
  const [required, setRequired] = useState(false);

  useEffect(() => {
    //setsolicitado()
    tomoNombreIcon();
    obtenerDatosStorage();
  }, [pet.sex]);

  const tomoNombreIcon = () => {
    if (pet.sex.toUpperCase() === 'male') {
      gNombreSexo('gender-male');
    } else {
      gNombreSexo('gender-female');
    }
  };

  useEffect(() => {
    switch (pet.size) {
      case 'small':
        setColorChico('#9575cd');
        setColorMediano('#FFFFFF');
        setColorGrande('#FFFFFF');
        break;
      case 'medium':
        setColorChico('#FFFFFF');
        setColorMediano('#9575cd');
        setColorGrande('#FFFFFF');
        break;
      case 'big':
        setColorChico('#FFFFFF');
        setColorMediano('#FFFFFF');
        setColorGrande('#9575cd');
        break;
    }
  }, []);

  const obtenerDatosStorage = async () => {
    console.log('storage pasooo');
    try {
      await AsyncStorage.getItem('uid').then((value) => {
        setIdUsuario(value);
      });
      await AsyncStorage.getItem('name').then((value) => {
        gNombre(
          value.substring(0, 1).toUpperCase() +
            value.substr(1, value.length - 1),
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={style.header}>
        <IconButton
          icon="arrow-left"
          color="#FFFFFF"
          style={globalStyles.iconBack}
          onPress={() => navigation.goBack()}
          size={30}
        />
        <Text style={globalStyles.title}>{pet.name}</Text>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={globalStyles.dropdown}
          anchor={
            <IconButton
              icon="dots-vertical"
              style={globalStyles.viewR}
              color="#FFFFFF"
              onPress={openMenu}
              size={30}
            />
          }>
          <Menu.Item
            icon="bullhorn"
            onPress={() => {
              setVisible(false);
              navigation.navigate('Denunciar', {
                pet: pet,
              });
            }}
            title="Denunciar"
          />
        </Menu>
      </View>
      <View style={style.cardNew}>
        <View style={style.viewMascota}>
          <Image
            style={style.imgMascota}
            source={{
              uri: pet.image_url,
            }}
          />
          <View style={style.pawRow}>
            <Maticons
              style={style.paw}
              name="paw"
              size={45}
              color={pet?.size === 'big' ? '#9575cd' : '#FFFFFF'}
            />
            <Maticons
              style={style.paw}
              name="paw"
              size={35}
              color={pet?.size === 'medium' ? '#9575cd' : '#FFFFFF'}
            />
            <Maticons
              style={style.paw}
              name="paw"
              size={25}
              color={pet?.size === 'small' ? '#9575cd' : '#FFFFFF'}
            />
          </View>
          <View style={style.viewDetalle}>
            <View style={style.infoMascota}>
              <View style={style.containerH1}>
                <Text style={style.tituloDes}>Nombre:</Text>
                <Text style={style.nombre}> {pet.name}</Text>
              </View>
              <View style={style.containerH1}>
                <Text style={style.tituloDes}>Sexo:</Text>
                <Text style={style.sexoText}> {pet.sex}</Text>
                <Maticons
                  style={style.iconSexo}
                  name={nombreSexo}
                  size={25}
                  color="#9575cd"
                />
              </View>
            </View>
            <View style={style.infoMascota}>
              <View style={style.containerH1}>
                <Text style={style.tituloDes}>Edad:</Text>
                <Text style={style.sexoText}> {pet.old} años</Text>
              </View>
              <View style={style.containerH1}>
                <Text style={style.tituloDes}>Tamaño:</Text>
                <Text style={style.sexoText}> {pet.size} </Text>
              </View>
            </View>
          </View>
          <View style={style.viewDes}>
            <Text style={style.tituloDes}>Descripción:</Text>
            <Text style={style.descripcion}>{pet.aboutMe}</Text>
          </View>
        </View>
      </View>
      <IconButton
        icon="message"
        style={style.masInfo}
        color="#FFFFFF"
        size={50}
        onPress={() => {
          obtenerDatosStorage();
          navigation.navigate('ChatScreen', {
            navigation: navigation,
            pet: pet,
            idChat: null,
            chat: {
              idChat: null,
              date: null, //fecha
              idPet: pet.id, //idMascota
              imagePet: pet.image_url, //imagenMascota
              namePet: pet.name, //nombreMascota
              nameUser1: pet.rescuer.name, //nombreUsr1
              nameUser2: name, //nombreUsr2
              rescuerId: pet.rescuerId, //usuario1
              userId: userId, //usuario2
              required: required, //solicitado
            },
            user: {_id: userId, name: name},
          });
        }}
        animated="true"
      />
    </View>
  );
};

const style = StyleSheet.create({
  viewDetalle: {
    marginHorizontal: 10,
    padding: 10,
    paddingTop: 0,
  },
  viewDes: {
    marginVertical: 'auto',
    marginHorizontal: 20,
    marginBottom: 0,
  },
  sexoText: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  tamText: {
    fontSize: 13,
    textTransform: 'capitalize',
  },
  paw: {
    bottom: 0,
  },
  iconEdit: {
    right: 10,
    top: 10,
    flex: 2,
  },
  pawRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignContent: 'center',
    position: 'absolute',
    marginStart: 10,
    margin: 10,
    bottom: '38%',
    left: 0,
  },
  descripcion: {
    fontSize: 15,
    marginTop: 0,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  tituloDes: {
    fontSize: 18,
    marginStart: 5,
    fontWeight: 'bold',
  },
  masInfo: {
    position: 'absolute',
    margin: 20,
    marginBottom: 10,
    right: 0,
    bottom: 0,
    backgroundColor: '#9575cd',
    shadowColor: '#000000',
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
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
  infoMascota: {
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'baseline',
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
    marginTop: -80,
    flexDirection: 'column',
    height: '86%',
  },
  imgMascota: {
    height: 300,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderRadius: 10,
    margin: 0,
    shadowColor: '#202020',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },
  nombre: {
    fontSize: 22,
    marginBottom: 'auto',
  },
  edad: {
    fontSize: 25,
    marginBottom: 'auto',
  },
  iconSexo: {
    marginRight: 'auto',
  },
  containerH1: {
    flexDirection: 'row',
    flex: 3,
    alignItems: 'baseline',
    alignContent: 'flex-start',
  },
});
export default DetailsPet;
