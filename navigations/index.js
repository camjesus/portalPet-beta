import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DrawerPortal from './DrawerPortal';
import AccountStack from './AccountStack';
import {NavigationContainer} from '@react-navigation/native';
import {checkUserID} from '../store/actions/auth.action';
import {onAuthStateChanged} from 'firebase/auth'
import { FIREBASE_AUTH } from '../FirebaseConfig';

function MainNavigator() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

 //useEffect(() => {
 //  onAuthStateChanged(FIREBASE_AUTH, (user) => {
 //    console.log('onAuthStateChanged');
 //    if(user != null || user != undefined)
 //    {
 //     setUser(user);
 //    }
 //  });
 //  console.log(user);
 //}, []);

 useEffect(() => {
   dispatch(checkUserID());
 }, [userId]);
 
  return (
    <NavigationContainer>
      {userId ? <DrawerPortal /> : <AccountStack />}
    </NavigationContainer>
  );
}

export default MainNavigator;
