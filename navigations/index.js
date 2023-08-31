import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DrawerPortal from './DrawerPortal';
import AccountStack from './AccountStack';
import {NavigationContainer} from '@react-navigation/native';
//import {checkUserID} from '../store/actions/auth.action';
import {User, onAuthStateChanged} from 'firebase/auth'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import {AsyncStorage} from 'react-native';

function MainNavigator() {
  const [user, setUser] = useState(null);
  
 useEffect(() => {
   onAuthStateChanged(FIREBASE_AUTH, (user) => {
     console.log('user', user);
     getUser();
    
   })
 }, []);
 const getUser = async () => {
  await AsyncStorage.getItem('id').then((value) => {
    console.log(value);
  });
 }
 
  return (
    <NavigationContainer>
      {user ? <DrawerPortal /> : <AccountStack />}
    </NavigationContainer>
  );
}

export default MainNavigator;
