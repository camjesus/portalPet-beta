import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

const NewUser = ({navigation}) => {
  const dispatch = useDispatch();
  const [nombre, gNombre] = useState('');
  const [apellido, gApellido] = useState('');
  const [email, gEmail] = useState('');
  const [telefono, gTelefono] = useState('');
  const [password, gPassword] = useState('');
  const [passwordRep, gPasswordRep] = useState('');
  const [alerta, ingresarAlerta] = useState(false);
  const [mensaje, guardaMensaje] = useState('');
  const [titulo, setTitulo] = useState('');
  const [resultadoCrear, setResultadoCrear] = useState('');
  const apellidoImp = useRef();
  const emailRef = useRef();
  const RpassRef = useRef();
  const passRef = useRef();
  const teleRef = useRef();

  return (
    <View >
    </View>
  );
};


export default NewUser;
