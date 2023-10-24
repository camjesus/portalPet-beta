import AsyncStorage from '@react-native-async-storage/async-storage';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB} from '../../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const SIGNUP = 'SIGNUP';
export const NEW_USER = 'NEW_USER';
export const CHECK_USER_ID = 'CHECK_USER_ID';
export const DELETE_STORAGE = 'DELETE_STORAGE';

export const signup = (userId) => {
  return async (dispatch) => {
    console.log("signup: " + userId)
    dispatch({
      type: SIGNUP,
      userId: userId,
    });
  };
};

export const AddnewUser = (newUser) => {
  return async (dispatch) => {
  const auth = FIREBASE_AUTH;
  try {
    const response = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
    console.log(response);
    //GUARDO EN MI BASE DE DATOS USERS
    const newDoc = addDoc(collection(FIREBASE_DB, 'users'), {
      uid: response.user.uid,
      name: nombre,
      lastname: apellido,
      email: email,
      ubication: null,
      phone: telefono
    });
    console.log(newDoc);
    console.log('response');
    console.log(response);
    setResultadoCrear(true);
  }
  catch(error){
      console.log("eeror al crear usuario" + error.code + error.message);
      console.log(error);
      setResultadoCrear(false);
    }

    dispatch({
      type: NEW_USER,
      userId: response.user.uid,
    });
  };
};

export const checkUserID = () => {
  return async (dispatch) => {
    console.log('paso por check User');
    await AsyncStorage.getItem('uid').then((value) => {
      let userId = null;
      if(value == undefined || value != null)
      {
        userId = value;
      }
      console.log('userId');
      console.log(userId);

      console.log('value');
      console.log(value);
      dispatch({
        type: CHECK_USER_ID,
        userId: userId,
      });
    });
  };
};

export const deleteStorage = () => {
  return async (dispatch) => {
    try {
      console.log('borro del storage');
      await AsyncStorage.removeItem('uid');
      await AsyncStorage.removeItem('id');
      await AsyncStorage.removeItem('name');
      await AsyncStorage.removeItem('lastname');
      await AsyncStorage.removeItem('phone');
      await AsyncStorage.removeItem('email');
      
    } catch (error) {
      console.log('error eliminando del storage' + error);
    }

    dispatch({
      type: DELETE_STORAGE,
      userId: null,
    });
    dispatch({
      type: CHECK_USER_ID,
      userId: null,
    });
  };
};
