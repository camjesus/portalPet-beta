import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Image } from "react-native";
import globalStyle from "../styles/global";
import * as Location from "expo-location";
import { Text, Button, IconButton } from "react-native-paper";
import globalStyles from "../styles/global";
import SwiperCard from "../components/ui/SwiperCard";
import HeaderDisponible from "../components/ui/HeaderDisponible";
import { collection, query, getDocs, where } from "firebase/firestore";
import { FIREBASE_DB } from "../FirebaseConfig";
import { white } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";

const Home = ({ navigation, route, props }) => {
  const data = route.params;
  console.log("params");
  console.log(data?.data);

  const [petsDisp, gDisponibles] = useState([]);
  const [filters, setFilters] = useState(null);
  const [primerCarga, gPrimerCarga] = useState(true);
  const [consultarHome, gConsHome] = useState(true);
  const [state, setEstado] = useState("wanted");
  const isFirstTime = useRef(true);
  const [distancia] = useState(100);
  const [index, setIndex] = useState(0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userId, setUserId] = useState("");

  const defaultFilters = {
    petType: ["dog", "cat"],
    sex: ["male", "famale"],
    distance: 100,
    size: ["small", "medium", "big"],
    old: 30,
  };

  //Botones accion pet

  useEffect(() => {
    if (data?.data !== undefined) {
      console.log("paso por avaaaa");
      setFilters(data?.data);
    }

    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(JSON.stringify(location));
      setLocation(location);
      //paramsDefault.append("latitud", location.latitud); //-34.634491);
      //paramsDefault.append("longitud", location.longitud); //-58.4648853);
    };
  }, []);

  const obtenerDatosStorage = async () => {
    //busco ID para no traerme mis propias subidas
    await AsyncStorage.getItem("uid").then((value) => {
      setUserId(value);
    });
  };

  useEffect(() => {
    gConsHome(true);
    obtenerMascotas();
  }, [state]);

  const onSwiped = () => {
    console.log(index + 1);
    console.log(petsDisp.length);
    setIndex(index + 1);
    if (petsDisp.length === index) {
      gConsHome(true);
    }
  };

  const obtenerMascotas = async () => {
    try {
      console.log("obtener mascotas");
      const petsByFilters = [];
      const colRef = collection(FIREBASE_DB, "pets");
      const q = query(
        colRef,
        where("active", "==", true),
        where("state", "==", state),
        where("id", "!=", userId),
        where("sex", "array-contains", filters.sex),
        where("type", "array-contains", filters.petType),
        where("size", "array-contains", filters.size),
        where("old", "<=", filters.old)
      );
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("docPet");
          console.log(doc.data());
          if (doc != null) {
            petsByFilters.push(doc.data());
          }
        });
        gDisponibles(petsByFilters);
      });
    } catch (ex) {
      console.log(ex);
      console.log("ERROR AL BUSCAR MASCOTAS");
    }
  };

  const goToFiltros = () => {
    gPrimerCarga(false);
    navigation.navigate("Filters", {
      filters: filters === null ? defaultFilters : filters,
    });
  };

  const heandlePress = () => {
    navigation.toggleDrawer();
  };

  useEffect(() => {
    setIndex(0);
    if (consultarHome) {
      console.log("entra a disponi");
      obtenerMascotas();
      //getCurrentPositionNow();
      gConsHome(false);
    }
  }, [consultarHome]);

  useEffect(() => {
    console.log("entro por la data");
    console.log(data);
    if (isFirstTime.current) {
      isFirstTime.current = false;
    } else {
      gConsHome(true);
    }
    obtenerMascotas();
  }, [data]);

  return (
    <View style={globalStyle.base}>
      <HeaderDisponible
        heandlePress={heandlePress}
        goToFiltros={goToFiltros}
        state={state}
        styles={styles}
        setEstado={setEstado}
      />
      {petsDisp.length === 0 && (
        <View>
          <Text style={globalStyles.msjAdvertencia}>
            No hay pets disponibles para los filtros aplicados
          </Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        {petsDisp.length > 0 && (
          <SwiperCard
            {...props}
            navigation={navigation}
            petsDisp={petsDisp}
            onSwiped={onSwiped}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cargarText: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 5,
    marginBottom: 10,
  },
  viewLogo: {
    alignItems: "center",
    justifyContent: "center",
  },
  imglogo: {
    width: 120,
    height: 120,
  },
  modal: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    flex: 1,
  },
  tipoBusqueda: {
    flexDirection: "row",
    margin: 0,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  title: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 30,
    marginTop: 20,
    padding: 0,
    //fontFamily: 'ArchitectsDaughter-Regular',
    flex: 5,
    marginBottom: 0,
  },
  text: {
    textAlign: "center",
    fontSize: 50,
  },
  header: {
    backgroundColor: "#FFAD00",
    flexDirection: "row",
    margin: 0,
    paddingBottom: 5,
  },
  containerSwiper: {
    backgroundColor: "#FFFFFF",
    margin: 0,
    padding: 0,
  },
  labelStyleGroup: {
    fontSize: 15,
    color: "#FFFFFF",
    padding: 0,
    margin: 0,
  },
  buttonGL: {
    borderBottomLeftRadius: 30,
    flex: 2,
  },
  buttonGR: {
    borderBottomRightRadius: 30,
    flex: 2,
  },
  buttonG: {
    marginHorizontal: 1,
  },
});
export default Home;
