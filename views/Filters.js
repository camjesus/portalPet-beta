import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Alert } from "react-native";
import {
  Button,
  Checkbox,
  Text,
  Card,
  Switch,
  IconButton,
} from "react-native-paper";
import Slider from "react-native-slider";
import globalStyles from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Filters = ({ navigation, route }) => {
  console.log("filtros route");
  console.log(route.params);
  const { filters } = route.params;
  const [old, gOld] = useState(filters.old);
  const [distancia, gDistancia] = useState(filters.distance);
  const [checkedMacho, setCheckedMacho] = React.useState(
    filters.sex.some((s) => s === "male") ?? true
  );
  const [checkedHembra, setCheckedHembra] = React.useState(
    filters.sex.some((s) => s === "famale") ?? true
  );
  const [checkedPeque, setCheckedPeque] = React.useState(
    filters.size.some((s) => s === "small") ?? true
  );
  const [checkedMediano, setCheckedMediano] = React.useState(
    filters.size.some((s) => s === "medium") ?? true
  );
  const [checkedGrande, setCheckedGrande] = React.useState(
    filters.size.some((s) => s === "big") ?? true
  );
  const [checkedPerro, setCheckedPerro] = React.useState(
    filters.petType.some((s) => s === "dog") ?? true
  );
  const [checkedGato, setCheckedGato] = React.useState(
    filters.petType.some((s) => s === "cat") ?? true
  );
  const km = " km";
  const anios = " años";

  const aplicarFiltros = (latitud, longitud) => {
    filters.size = [];
    filters.petType = [];
    filters.sex = [];

    if (checkedPeque) {
      filters.size.push("small");
    }
    if (checkedMediano) {
      filters.size.push("medium");
    }
    if (checkedGrande) {
      filters.size.push("big");
    }

    if (checkedPerro) {
      filters.petType.push("dog");
    }
    if (checkedGato) {
      filters.petType.push("cat");
    }

    if (checkedMacho) {
      filters.sex.push("male");
    }
    if (checkedHembra) {
      filters.sex.push("famale");
    }
    filters.old = old;

    //params.append("latitud", latitud);
    //params.append("longitud", longitud);filters.
    filters.distance = distancia;

    console.log("filtrosAnteriores");
    console.log(filters);
    navigation.navigate("Home", { data: filters });
  };

  return (
    <View style={globalStyles.base}>
      <View style={globalStyles.header}>
        <IconButton
          icon="arrow-left"
          color="#FFFFFF"
          style={globalStyles.iconBack}
          onPress={() => navigation.goBack()}
          size={30}
        />
        <Text style={globalStyles.title}>Filtros</Text>
        <View style={globalStyles.viewR}></View>
      </View>
      <View style={style.contenedor}>
        <View style={style.labelTS}>
          <Text style={style.title}>Tipo:</Text>
          <Text style={style.title}>Sexo:</Text>
        </View>
        <View style={style.contenedorRowTS}>
          <View style={style.petRowTS}>
            <View style={style.petCol}>
              <Text style={style.textCheck}>Perro</Text>
              <Switch
                value={checkedPerro}
                color="#9575cd"
                onValueChange={() => {
                  setCheckedPerro(!checkedPerro);
                }}
              />
            </View>
            <View style={style.petCol}>
              <Text style={style.textCheck}>Gato</Text>
              <Switch
                value={checkedGato}
                color="#9575cd"
                onValueChange={() => {
                  setCheckedGato(!checkedGato);
                }}
              />
            </View>
          </View>
          <View style={style.petRowTS}>
            <View style={style.petCol}>
              <Text style={style.textCheck}>Macho</Text>
              <Switch
                value={checkedMacho}
                color="#9575cd"
                onValueChange={() => {
                  setCheckedMacho(!checkedMacho);
                }}
              />
            </View>
            <View style={style.petCol}>
              <Text style={style.textCheck}>Hembra</Text>
              <Switch
                value={checkedHembra}
                color="#9575cd"
                onValueChange={() => {
                  setCheckedHembra(!checkedHembra);
                }}
              />
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 18, marginTop: 20 }}>Tamaño:</Text>
        <View style={style.petRow}>
          <View style={style.petCol}>
            <Text style={style.textCheck}>Pequeño</Text>
            <Switch
              value={checkedPeque}
              color="#9575cd"
              onValueChange={() => {
                setCheckedPeque(!checkedPeque);
              }}
            />
          </View>
          <View style={style.petCol}>
            <Text style={style.textCheck}>Mediano</Text>
            <Switch
              value={checkedMediano}
              color="#9575cd"
              onValueChange={() => {
                setCheckedMediano(!checkedMediano);
              }}
            />
          </View>
          <View style={style.petCol}>
            <Text style={style.textCheck}>Grande</Text>
            <Switch
              value={checkedGrande}
              color="#9575cd"
              onValueChange={() => {
                setCheckedGrande(!checkedGrande);
              }}
            />
          </View>
        </View>
        <Text style={{ fontSize: 18, marginTop: 20 }}>Edad:</Text>
        <View style={style.sliderCont}>
          <Text style={style.text}>
            {old.toString()}
            {anios}
          </Text>
          <Slider
            step={1}
            maximumValue={30}
            onValueChange={(value) => {
              gOld(parseFloat(value));
            }}
            value={old}
            minimumTrackTintColor="#9575cd"
            maximumTrackTintColor="#f5bb05"
            thumbTintColor="#9575cd"
            style={{ marginVertical: 10 }}
          />
        </View>
        <Text style={{ fontSize: 18, marginTop: 20 }}>Distancia:</Text>
        <View style={style.sliderCont}>
          <Text style={style.text}>
            {distancia.toString()}
            {km}
          </Text>
          <Slider
            step={10}
            maximumValue={100}
            onValueChange={(value) => {
              gDistancia(parseFloat(value));
            }}
            value={distancia}
            minimumTrackTintColor="#9575cd"
            maximumTrackTintColor="#f5bb05"
            thumbTintColor="#9575cd"
            thumbTouchSize={{ width: 100, height: 100 }}
            style={{ marginVertical: 10, marginBottom: 10 }}
          />
        </View>
        <Button
          style={style.ingresar}
          mode="contained"
          onPress={() => aplicarFiltros()}
        >
          Aplicar
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  labelTS: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contenedorRowTS: {
    flexDirection: "row",
  },
  ingresar: {
    justifyContent: "flex-end",
    backgroundColor: "#9575cd",
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    elevation: 10,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    marginHorizontal: 50,
  },
  contenedor: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
    shadowOffset: { width: 1, height: 13 },
    marginVertical: 40,
    padding: 30,
    paddingTop: 20,
  },
  petRow: {
    flexDirection: "row",
    paddingBottom: 8,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
  },
  petCol: {
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    paddingEnd: 9,
  },
  petRowTS: {
    flexDirection: "row",
    paddingBottom: 8,
    flex: 2,
  },
  textCheck: {
    paddingTop: 8,
    marginStart: 5,
  },
  title: {
    fontSize: 18,
    flex: 2,
  },
  textChEdad: {
    paddingTop: 8,
  },
  textCheckEdad: {
    paddingTop: 8,
    marginStart: 5,
  },
  text: {
    fontSize: 13,
    textAlign: "center",
  },
  sliderCont: {
    flexDirection: "column",
    justifyContent: "center",
  },
  slider: {
    color: "#9575cd",
  },
});

export default Filters;
