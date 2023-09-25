import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, PermissionsAndroid, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewPet = ({navigation, route, props}) => {
  const {params} = route;
  const {mascotaItem} = params;
  const [edit, setEdit] = useState(mascotaItem.id != null ? true : false);
  const [nombre, gNombre] = useState(mascotaItem.nombre);
  const [sexo, gSexo] = useState(mascotaItem.sexo);
  const [tamanio, gTamanio] = useState(mascotaItem.tamanio);
  const [descripcion, gDescripcion] = useState(mascotaItem.descripcion);
  const [edad, gEdad] = useState(mascotaItem.edad.toString());
  const [raza, gRaza] = useState('Mestizo');
  const [tipoMascota, gTipoMascota] = useState(mascotaItem.tipoMascota);
  const [longitud, gLongitud] = useState(mascotaItem.longitud);
  const [latitud, gLatitud] = useState(mascotaItem.latitud);
  const [rescatista, gRescatista] = useState(mascotaItem.rescatista);
  const [accion, setAccion] = useState(mascotaItem.estado);
  const [imagen, gImagen] = useState(null);
  const [cambioFoto, setCambioFoto] = React.useState(
    mascotaItem.cambioFoto === null ? false : mascotaItem.cambioFoto,
  );
  console.log('mascotaItem');
  console.log(mascotaItem);
  const [checkedAdefinir, setCheckedAdefinir] = React.useState(false);

  const [alerta, ingresarAlerta] = useState(false);
  const [mensaje, guardaMensaje] = useState('');
  const [titulo, gTitulo] = useState('');
  const [colorCamara, gColorCamara] = useState('#252932');
  const [colorUbicacion, gColorUbicacion] = useState('#252932');
  const descRef = useRef();
  const edadRef = useRef(mascotaItem.edad);
  const mascotaItemRef = useRef(mascotaItem);
  const colorSelect = '#f5bb05';
  const colorNoSelect = '#9575cd';

  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
    </View>
  );
};
export default NewPet;
