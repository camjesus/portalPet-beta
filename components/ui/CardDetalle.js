import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-paper';
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';

function CardDetalle({pet, nameSexo}) {
  return (
    <View>
      <View>
        <Image
          style={style.imgMascota}
          source={{
            uri: pet.image_url,
          }}
        />
      </View>
      <View style={style.viewDetalle}>
        <View style={style.infoMascota}>
          <View style={style.containerH1}>
            {pet.name !== '' && (
              <Text style={style.name}>{pet.name}</Text>
            )}
            {pet.name === '' && (
              <Text style={style.name}>{pet.fechaInicioS}</Text>
            )}
            <Maticons
              style={style.iconSexo}
              name={nameSexo}
              size={30}
              color="#F59822"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  aboutMe: {
    fontSize: 15,
    marginTop: 0,
    marginHorizontal: 10,
  },
  titleDes: {
    fontSize: 18,
    marginStart: 5,
    fontWeight: 'bold',
  },
  iconSexo: {
    marginRight: 'auto',
    marginStart: 5,
  },
  name: {
    fontSize: 25,
    marginBottom: 'auto',
  },
  containerH1: {
    flexDirection: 'row',
    flex: 3,
    alignItems: 'baseline',
    alignContent: 'flex-start',
  },
  infoMascota: {
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'baseline',
  },
  viewDetalle: {
    marginHorizontal: 10,
    padding: 10,
    paddingTop: 0,
  },
  imgMascota: {
    height: 200,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderRadius: 10,
    margin: 0,
    shadowColor: '#202020',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },
});

export default CardDetalle;
