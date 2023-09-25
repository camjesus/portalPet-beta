import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DrawerPortal from './DrawerPortal';
import AccountStack from './AccountStack';
import {NavigationContainer} from '@react-navigation/native';
import {checkUserID} from '../store/actions/auth.action';
import {User, onAuthStateChanged} from 'firebase/auth'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MainNavigator() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

 useEffect(() => {
   onAuthStateChanged(FIREBASE_AUTH, (user) => {
     console.log('onAuthStateChanged');
     console.log(user);
     setUser(user);
   })
 }, []);

 useEffect(() => {
   dispatch(checkUserID());
 }, []);
 
  return (
    <NavigationContainer>
      {user ? <DrawerPortal /> : <AccountStack />}
    </NavigationContainer>
  );
}

export default MainNavigator;
