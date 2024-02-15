import Swiper from 'react-native-deck-swiper';
import CardMascota from './CardMascota';
//import {View, Text} from 'react-native'
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';

const SwiperCard = ({navigation, petsDisp, onSwiped}) => {
  useEffect(() => {
  }, [petsDisp]);

  const Card = ({pet}) => (
    <TouchableOpacity
      style={style.cardNew}
      onPress={() => {
        navigation.navigate('DetalleMascota', {
          pet: pet,
          idMascota: pet.id,
        });
      }}>
      <Image
        style={style.imgMascota}
        source={{
          uri: pet?.image_url,
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
          color={pet?.size === 'Medium' ? '#9575cd' : '#FFFFFF'}
        />
        <Maticons
          style={style.paw}
          name="paw"
          size={25}
          color={pet?.size === 'small' ? '#9575cd' : '#FFFFFF'}
        />
      </View>
      <Button
        style={style.masInfo}
        mode="contained"
        onPress={() => {
          navigation.navigate('DetalleMascota', {
            pet: pet,
            idMascota: pet.id,
          });
        }}
        animated="true"
        icon="clipboard-text-outline">
        Ver ficha
      </Button>
      <View style={style.infoMascota}>
        {pet?.state === 'found' && (
          <View style={style.containerH1}>
            <Text style={style.name}>{pet?.fechaInicioS}</Text>
            <Maticons
              style={style.iconSexo}
              name={
                pet?.sex.toUpperCase() === 'male'
                  ? 'gender-male'
                  : 'gender-female'
              }
              size={30}
              color="#9575cd"
            />
          </View>
        )}
        {pet?.state !== 'found' && (
          <View style={style.containerH1}>
            <Text style={style.name}>{pet?.name}</Text>
            <Text style={style.old}>, {pet?.old} años</Text>
            <Maticons
              style={style.iconSexo}
              name={
                pet?.sex.toUpperCase() === 'male'
                  ? 'gender-male'
                  : 'gender-female'
              }
              size={30}
              color="#9575cd"
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <Swiper
      cards={petsDisp}
      cardIndex={0}
      renderCard={(card) => <Card pet={card} />}
      onSwiped={onSwiped}
      backgroundColor="#FFFFFF"
      disableTopSwipe
      disableBottomSwipe
      cardVerticalMargin={10}
    />
  );
};

const style = StyleSheet.create({
  pawRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignContent: 'center',
    position: 'absolute',
    marginStart: 10,
    margin: 10,
    bottom: '10%',
    left: 0,
  },
  masInfo: {
    position: 'absolute',
    margin: 20,
    borderRadius: 5,
    right: 0,
    bottom: '5%',
    backgroundColor: '#9575cd',
    shadowColor: '#000000',
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
  },
  infoMascota: {
    margin: 10,
    flexDirection: 'row',
  },
  cardNew: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    elevation: 3,
    flexDirection: 'column',
    height: '80%',
  },
  imgMascota: {
    height: '90%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderRadius: 10,
  },
  name: {
    fontSize: 30,
    marginTop: 'auto',
    marginVertical: 10,
  },
  old: {
    fontSize: 30,
    marginTop: 'auto',
    marginVertical: 10,
  },
  iconSexo: {
    marginStart: 10,
    marginRight: 'auto',
    marginVertical: 10,
  },
  containerH1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 10,
  },
});
export default SwiperCard;
