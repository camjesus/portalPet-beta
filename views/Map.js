import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

export default class Map extends Component {
  constructor(props) {
    super();

    //por default va al obelisco
    this.state = {
      region: {
        latitude: -34.6038,
        longitude: -58.3818,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker: null,
    };
  }

  render() {
    return (
      //este boton es para poder volver atras ya que el encabezado  no lo mostramos
      //y de esta manera sobreescribimos el boton de volver para darle el comportamiento
      //que queremos , en este caso pasarle parametros
      <View style={{flex: 1, zIndex: -1}}>
      </View>
    );
  }
}
