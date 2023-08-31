import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DrawerPortal from './DrawerPortal';
import AccountStack from './AccountStack';
import {NavigationContainer} from '@react-navigation/native';
import {checkUserID} from '../store/actions/auth.action';

function MainNavigator() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  
  useEffect(() => {
    dispatch(checkUserID());
  }, []);

  return (
    <NavigationContainer>
      {userId == null ? <DrawerPortal /> : <AccountStack />}
    </NavigationContainer>
  );
}

export default MainNavigator;
