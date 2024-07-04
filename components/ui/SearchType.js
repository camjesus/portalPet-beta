import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const SearchType = ({ styles, state, setEstado }) => {
  /** <Button
        style={styles.buttonGL}
        mode="contained"
        color={state === 'inAdoption' ? '#f5bb05' : '#9575cd'}
        labelStyle={styles.labelStyleGroup}
        onPress={() => setEstado('inAdoption')}>
        Adopción
      </Button> **/
  return (
    <View style={styles.tipoBusqueda}>
      <Button
        style={styles.buttonG}
        mode="contained"
        color={state === "found" ? "#f5bb05" : "#9575cd"}
        labelStyle={styles.labelStyleGroup}
        onPress={() => setEstado("found")}
      >
        Encontrados
      </Button>
      <Button
        style={styles.buttonGR}
        mode="contained"
        color={state === "wanted" ? "#f5bb05" : "#9575cd"}
        labelStyle={styles.labelStyleGroup}
        onPress={() => setEstado("wanted")}
      >
        Buscados
      </Button>
    </View>
  );
};

export default SearchType;
