import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  TextInput,
  Button,
  Dialog,
  Paragraph,
  Portal,
  Text,
  PaperProvider
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../styles/global';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { FIREBASE_AUTH , FIREBASE_DB} from '../FirebaseConfig';
import { collection, getDocs, query, where} from 'firebase/firestore';
import {signup} from '../store/actions/auth.action';

const Login = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [usuario, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [message, setMensaje] = useState('');
  const [alert, setAlert] = useState(false);
  const userRef = useRef();
  const passRef = useRef();
  const isFirstTime = useRef(true);
  const auth = FIREBASE_AUTH;
  
  const crearUsuario = () => {
    navigation.navigate('NewUser');
  };

  const focusedTextInput = (ref) => {
    ref.current.focus();
  };

  useEffect(() => {
    //Solo quiero que este hook se ejecute cuando modifico user
    //no quiero que entre la primera vez que renderiza la pantalla
    if (isFirstTime.current) {
      isFirstTime.current = false;
    } else {
      saveUserInStorage(user);
    }
  }, [user]);


  const getUserByUID = async (value) => {
    console.log("usrid" + value);
    try{
      const colRef = collection(FIREBASE_DB,'users');
      const q = query(colRef, where('uid', '==', value));
       getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log('doc');
          console.log(doc);
          console.log('docData');
          console.log(doc.data());
          if(doc != null)
          {
            setUser({
              id: doc.id,
              uid: doc.data().uid,
              name: doc.data().name,
              lastname: doc.data().lastname,
              phone: doc.data().phone,
              email: doc.data().email,
              ubication: doc.data().ubication
            })
            dispatch(signup(doc.id));
          }
        })
      });
      console.log('user en Login');
      console.log(user);
    }catch (ex){
      console.log(ex);
      console.log('ERROR');
      setMensaje('Error al buscar usuario en la base de datos');
      setAlert(true);
    }
}

  const logIn = async () => {
    if (usuario === '' || password === '') {
      setMensaje('Todos los campos son requeridos');
      setAlert(true);
      return;
    }
    try {
      var response = await signInWithEmailAndPassword(auth, usuario, password);
      console.log('correctamente');
      //console.log(response);
      getUserByUID(response.user.uid);
    } catch (error) {
      console.log('ERROR');
      setMensaje('Usuario no existente');
      setAlert(true);
      console.log('erro buscanbdo usuario' + error);
    }
  };

  const saveUserInStorage = async (user) => {
    if(user!= null || user!= undefined)
    {
      try {
        console.log('ENTRE user storage');
        console.log(user);
        await AsyncStorage.setItem('uid', JSON.stringify(user.uid));
        await AsyncStorage.setItem('id', JSON.stringify(user.id));
        await AsyncStorage.setItem('name', user.name);
        await AsyncStorage.setItem('lastname', user.lastname);
        await AsyncStorage.setItem('phone', user.phone);
        await AsyncStorage.setItem('email', JSON.stringify(user.email));
      } catch (error) {
        console.log('User Storage Error: ' + error);
      }
    }
  };

  return (
    <PaperProvider>
      <View style={globalStyles.base}>
        <View style={style.viewLogo}>
          <Image source={require('../img/casita_b.png')} style={style.imglogo} />
        </View>
        <View style={style.cardLogin}>
          <View style={style.viewBienvenido}>
            <Text style={style.bienvenido}>Bienvenido a </Text>
            <Text style={style.adoptaMe}>Portal Pet</Text>
          </View>
          <KeyboardAwareScrollView>
            <TextInput
              label="E-Mail"
              value={usuario}
              onChangeText={(text) => setEmail(text)}
              style={style.input}
              ref={userRef}
              autoCapitalize="none"
              onSubmitEditing={(event) => {
                focusedTextInput(passRef);
              }}
              left={<TextInput.Icon name="email" color="#9575cd" />}
            />
            <TextInput
              label="Contraseña"
              value={password}
              onChangeText={(text) => setPass(text)}
              style={style.input}
              ref={passRef}
              left={<TextInput.Icon name="key" color="#9575cd" />}
              secureTextEntry={true}
            />

            <Button
              style={style.ingresar}
              mode="contained"
              onPress={() => logIn()}>
              Ingresar
            </Button>
            <View style={style.viewRow}>
            </View>
            <View style={style.viewNuevaCuenta}>
              <Text style={style.registrate} />
              <Button
                style={style.nuevaCuenta}
                mode="outlined"
                color="#252932"
                onPress={() => crearUsuario()}>
                Registrate acá
              </Button>
            </View>
          </KeyboardAwareScrollView>
        </View>
          <View>
            <Portal>
              <Dialog visible={alert} style={globalStyles.dialog}>
                <Dialog.Title style={globalStyles.dialosetTitle}>Error</Dialog.Title>
                <Dialog.Content>
                  <Paragraph style={globalStyles.dialogMsj}>{message}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button mode="contained" onPress={() => setAlert(false)}>
                    Ok
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
      </View>
    </PaperProvider>
  );
};
const style = StyleSheet.create({
  viewRow: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  scroll: {
    padding: 0,
    margin: 0,
    flex: 1,
    backgroundColor: 'transparent',
  },
  ingresar: {
    backgroundColor: '#9575cd',
    padding: 3,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginHorizontal: 40,
    marginVertical: 10,
    marginTop: 20,
  },
  viewNuevaCuenta: {
    marginVertical: 10,
  },
  nuevaCuenta: {
    padding: 0,
    borderColor: '#FFFFFF',
  },
  registrate: {
    color: '#252932',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  dialogBack: {
    backgroundColor: '#ffffff',
  },
  viewLogo: {
    alignItems: 'center',
    margin: 0,
    padding: 0,
    backgroundColor: '#9575cd',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
  },
  imglogo: {
    marginTop: '10%',
    marginBottom: 160,
    width: 150,
    height: 150,
  },
  cardLogin: {
    backgroundColor: '#ffffff',
    marginHorizontal: 30,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 0,
    borderRadius: 30,
    marginTop: '-30%',
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 15,
    shadowOffset: {width: 1, height: 13},
    marginBottom: 10,
  },
  bienvenido: {
    fontSize: 18,
    color: '#252932',
    //fontFamily: 'MostWazted',
  },
  viewBienvenido: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  adoptaMe: {
    fontSize: 23,
    color: '#252932',
    //fontFamily: 'ArchitectsDaughter-Regular',
  },
});
export default Login;
