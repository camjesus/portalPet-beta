import React, {useEffect, useState, useRef} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Headline, FAB} from 'react-native-paper';
import globalStyles from '../styles/global';
import MascotaItem from '../components/ui/MascotaItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, Card, IconButton} from 'react-native-paper';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';

const MyPets = (props) => {
  const {navigation} = props;
  const [pets, guardarMascotas] = useState([]);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const rescuer = {
    uid: userId,
    name: name,
    lastName: lastName
  };
  const newMascota = {
    active: true,
    changePhoto: true,
    aboutMe: '',
    old: '',
    state: 'inAdoption',
    fechaCalculo: null,
    fechaFin: null,
    fechaInicio: null,
    //fechaInicioS: null,
    image_url: null,
    id: null,
    idAdoptante: null,
    image: null,
    latitud: null,
    longitud: null,
    name: null,
    rescuer: rescuer,
    rescuerId: userId,
    sex: 'male',
    size: 'small',
    type: 'dog',
  };

  const [consultarMascotas, gConsMascotaApi] = useState(false); //si adopto una pet es para saber si recargo la pagina
  const isFocused = useIsFocused(); //devuelve true si la pantalla tiene foco

  //const id = route.params;
  useEffect(() => {
    console.log('pase por el effect');
    obtenerDatosStorage();
    gConsMascotaApi(false);
  }, [isFocused, consultarMascotas]); //cuando la pantalla tiene el foco

  const obtenerDatosStorage = async () => {
    try {
      await AsyncStorage.getItem('name').then((value) => {
        setName(value);
      });
      await AsyncStorage.getItem('lastname').then((value) => {
        setLastName(value);
      });
      await AsyncStorage.getItem('uid').then((value) => {
        setUserId(value);
        //voy a buscar las pets una vez que tengo cargado el id, ya que es asincrono
        obtenerMascotas(value);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerMascotas = async (value) => {
   try{
    const colRef = collection(FIREBASE_DB,'pets');
      const q = query(colRef, where('uid', '==', value));
       getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log('doc');
          console.log(doc);
          console.log('docPet');
          console.log(doc.data());
          if(doc != null)
          {
            guardarMascotas(doc.data())
          }
        })
      });  
    }catch (ex){
      console.log(ex);
      console.log('ERROR AL BUSCAR MASCOTAS');
    }
  };

  return (
    <View style={globalStyles.base}>
      <View style={globalStyles.header}>
        <IconButton
          icon="arrow-left"
          color="#FFFFFF"
          style={globalStyles.iconBack}
          onPress={() => navigation.goBack()}
          size={30}
        />
        <Text style={globalStyles.title}>Mis mascotas</Text>
        <IconButton
          icon="plus"
          color="#FFFFFF"
          style={styles.iconEdit}
          onPress={() => {
            navigation.navigate('NewPet', {
              pet: newMascota,
            });
          }}
          size={30}
        />
      </View>
      <View>
        <View>
          {pets.length === 0 && (
            <Text style={globalStyles.msjAdvertencia}>
              Aún no cargaste mascotas
            </Text>
          )}
        </View>
      </View>

      <FlatList
        data={pets}
        renderItem={({item}) => (
          <MascotaItem
            pet={item}
            consultarMascotas={gConsMascotaApi}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => JSON.stringify(item.id)}
      />
      <View style={styles.container}>
        <FAB
          icon="plus"
          style={styles.fab}
          color="#FFFFFF"
          onPress={() => {
            navigation.navigate('NewPet', {
              pet: newMascota,
            });
          }}
          animated="true"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#9575cd',
  },
  title: {
    margin: 10,
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  titleTxt: {
    textAlign: 'center',
    fontSize: 35,
    color: '#252932',
  },
  viewTitulo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleIcon: {
    margin: 10,
  },
  iconEdit: {
    alignItems: 'baseline',
    alignContent: 'center',
    justifyContent: 'flex-end',
    marginEnd: 20,
    marginTop: 10,
  },
});

export default MyPets;
