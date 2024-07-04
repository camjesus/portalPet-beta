import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  TextInput,
  Headline,
  Button,
  Text,
  PaperProvider,
  Avatar,
  Portal,
  Dialog,
  Paragraph,
  IconButton,
  FAB,
} from "react-native-paper";
import * as Crypto from "expo-crypto";
import { CheckBox } from "react-native-elements";
import globalStyles from "../styles/global";
import { FIREBASE_DB, FIREBASE_STORAGE } from "../FirebaseConfig";
import { AddNewPet } from "../store/actions/pet.action";
import { useDispatch } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const NewPet = ({ navigation, route, props }) => {
  console.log("route");
  console.log(route);
  const { params } = route;
  const { pet, imagePet } = params;

  console.log('imagePet');
  console.log(imagePet);
  const [edit, setEdit] = useState(pet.id != null ? true : false);

  const [name, gName] = useState(pet.name);
  const [sex, gSex] = useState(pet.sex);
  const [size, setSize] = useState(pet.size);
  const [aboutMe, gAboutMe] = useState(pet.aboutMe);
  const [old, gOld] = useState(pet.old.toString());
  const [type, gType] = useState(pet.type);
  const [longitud, gLongitud] = useState(pet.longitud);
  const [latitud, gLatitud] = useState(pet.latitud);
  const [rescuer, gRescuer] = useState(pet.rescuer);
  const [state, setState] = useState(pet.state);
  const [changePhoto] = React.useState(
    pet.changePhoto === null ? false : pet.changePhoto
  );
  console.log("pet");
  console.log(pet);

  const [checkedNoName, setCheckedNoName] = React.useState(false);

  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [colorCamera, setColorCamera] = useState(
    pet.image_url == null ? "#252932" : "#FFFFFF"
  );
  const [colorLocation] = useState(
    pet.longitud == null ? "#252932" : "#FFFFFF"
  );
  const [resultadoCrear, setResultadoCrear] = useState(false);

  const descRef = useRef();
  const oldRef = useRef(pet.old);
  const petRef = useRef(pet.current);
  const colorSelect = "#f5bb05";
  const colorNoSelect = "#9575cd";

  console.log("petRef");
  console.log(petRef.current);

  const savePet = async (pet) => {
    console.log("save pet");
    console.log(pet);

    try {
      if (name === "") {
        setTitle("Advertencia");
        setMessage("Es necesario ingresar un name");
        setAlert(true);
        return;
      }

      if (old === "") {
        setTitle("Advertencia");
        setMessage("Es necesario ingrasar la old");
        setAlert(true);
        return;
      }

      if (aboutMe === "") {
        setTitle("Advertencia");
        setMessage("Es necesario ingrasar una descripción");
        setAlert(true);
        return;
      }

      if (pet.image_url === null) {
        setTitle("Advertencia");
        setMessage("Es necesario cargar una foto para subir la pet");
        setAlert(true);
      }

      if (old > 30) {
        setTitle("Advertencia");
        setMessage("La mascota no puede ser mayor a 30 años");
        setAlert(true);
        return;
      }

      //DESPUES LO REVERSO CUANDO SOLUCIONES View 'Map'
      //if (latitud === '' || longitud === '') {
      //  setTitle('Advertencia');
      //  setMessage('Por favor indique en el mapa una dirección');
      //  setAlert(true);
      //  return;
      //}

      pet.name = name;
      pet.aboutMe = aboutMe;
      pet.type = type;
      pet.sex = sex;
      pet.size = size;
      pet.old = old;
      pet.longitud = longitud;
      pet.latitud = latitud;
      pet.state = state;

      if (edit) {
        console.log("pet id distinto de null");

        //UPDATE
      } else {
        console.log("newPetDB");
        console.log(pet);
        pet.id = Crypto.randomUUID();
        if (state === "found") {
          pet.fechaInicio = new Date();
          pet.fechaInicioS =
            pet.fechaInicio.getDate() +
            "/" +
            pet.fechaInicio.getMonth() +
            "/" +
            pet.fechaInicio.getFullYear();
        }
        //try{
        //  //useDispatch(AddNewPet(newPetDB));
        //
        //  if (edit) {
        //    setTitle('Editar Mascota');
        //    setMessage('La mascota se editó con éxito!');
        //  } else {
        //    setTitle('Nueva Mascota');
        //    setMessage('La nueva mascota se creó con éxito!');
        //  }
        //
        //  setAlert(true);
        //}catch (ex){
        //  console.log(response);
        //  setTitle('Nueva Mascota');
        //  setMessage('Ha ocurrido un error, intente mas tarde');
        //  setAlert(true);
        //}

        try {
          //GUARDO MI IMAGEN EN STORAGE
          pet.image_url = await uploadImageAsync(pet.image_url);

          //GUARDO EN MI BASE DE DATOS PETS
          const newDoc = addDoc(collection(FIREBASE_DB, "pets"), pet);
          console.log(newDoc);
          console.log("newPet");
          setResultadoCrear(true);
        } catch (error) {
          console.log("eeror al crear mascota" + error.code + error.message);
          console.log(error);
          setResultadoCrear(false);
        }
      }
    } catch {}
  };


  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function()
      {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try{
      const refImage = ref(FIREBASE_STORAGE, "petImages/" + pet.id);
      await uploadBytes(refImage, blob);
      blob.close();
      return await getDownloadURL(refImage);
    }catch(error){
      console.log(error);
    }
  }

  const updateFotoFirebase = (newFoto, petId) => {
    db.collection("chats")
      .where("idMascota", "==", petId)
      .onSnapshot((snapshot) => {
        console.log("snapshot");
        console.log(snapshot);
        console.log("encontre chats");
        snapshot.docs.map((doc) =>
          db.collection("chats").doc(doc.id).update({
            imagenMascota: newFoto,
          })
        );
      });
  };

  const openMap = () => {
    console.log("abrir Mapa ");
    navigation.navigate("Map");
  };

  const openCamera = () => {
    console.log("abrir camara ");
    navigation.navigate("MyCamera", { pet: pet });
  };

  useEffect(() => {
    console.log("entro a useEffec con coordenadas " + route);
    AsyncStorage.getItem("userId").then((value) => {
      gRescuer(value);
    });
    if (route.params?.coordinates) {
      console.log(route.params?.coordinates);
      gLatitud(route.params?.coordinates.latitude);
      gLongitud(route.params?.coordinates.longitude);
    }
  }, [route.params?.coordinates]);

  useEffect(() => {
    if (pet.image_url != null) {
      setColorCamera("#FFFFFF");
    }
  }, [pet.image_url]);

  useEffect(() => {
    if (checkedNoName) {
      if (state === "found") {
        console.log(name);
        gName("Sin Collar");
      } else {
        console.log(name);
        gName("Sin Nombre");
      }
    } else {
      console.log(name);
      gName(null);
    }
    console.log("petupdate");
    console.log(pet);
  }, [checkedNoName]);

  useEffect(() => {
    if (pet.id !== null) {
      if (pet.name == "Sin Nombre" || pet.name == "Sin Collar") {
        setCheckedNoName(true);
      }
    }
  }, []);
  const focusedTextInput = (ref) => {
    ref.current.focus();
  };

  useEffect(() => {
    console.log("paso a navigation my pets");
    if (resultadoCrear) {
      navigation.navigate("MyPets", {
        gConsMascotaApi: true,
      });
    }
  }, [resultadoCrear]);

  return (
    <View style={{ backgroundColor: "#FFFFFF" }}>
      <KeyboardAwareScrollView style={style.scroll}>
        <View style={globalStyles.header}>
          <IconButton
            icon="arrow-left"
            color="#FFFFFF"
            style={globalStyles.iconBack}
            onPress={() => navigation.goBack()}
            size={30}
          />
          {pet.id === null && (
            <Text style={globalStyles.title}>Nueva mascota</Text>
          )}
          {pet.id !== null && (
            <Text style={globalStyles.title}>Editar mascota</Text>
          )}
          <IconButton
            icon="check"
            color="#FFFFFF"
            style={globalStyles.iconBack}
            onPress={() => savePet()}
            size={30}
          />
        </View>
        <View style={globalStyles.base}>
          <View style={globalStyles.contenedor}>
            <View style={style.avatar}>
              <Avatar.Image
                size={190}
                source={{
                  uri: pet.image_url,
                }}
                style={style.avatarImage}
              />
            </View>
            <View style={style.viewRowIcon}>
              <FAB
                icon="camera"
                style={style.fabLeft}
                color={colorCamera}
                onPress={() => openCamera()}
                animated="true"
                small
              />
              <FAB
                icon="map-marker-plus"
                style={style.fabRight}
                color={colorLocation}
                small
                onPress={() => openMap()}
                animated="true"
              />
            </View>
            <View style={style.buttonGroup}>
              {/**
              <Button
                style={style.buttonGL}
                mode="contained"
                compact={true}
                buttonColor={
                  state === "inAdoption" ? colorSelect : colorNoSelect
                }
                labelStyle={style.labelStyleGroup}
                onPress={() => setState("inAdoption")}
              >
                Adopción
              </Button> */
              }
              <Button
                style={style.buttonG}
                mode="contained"
                buttonColor={state === "found" ? colorSelect : colorNoSelect}
                compact={true}
                labelStyle={style.labelStyleGroup}
                onPress={() => setState("found")}
              >
                Encontrado
              </Button>
              <Button
                style={style.buttonGR}
                mode="contained"
                buttonColor={state === "wanted" ? colorSelect : colorNoSelect}
                compact={true}
                labelStyle={style.labelStyleGroup}
                onPress={() => setState("wanted")}
              >
                Buscado
              </Button>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <View style={style.rowNombre}>
                <TextInput
                  label="Nombre"
                  value={name}
                  onChangeText={(text) => gName(text)}
                  style={style.inputNombre}
                  disabled={checkedNoName}
                  onSubmitEditing={(event) => {
                    focusedTextInput(descRef);
                  }}
                />
                <View style={style.rowadefinir}>
                  <CheckBox
                    right
                    title={state === "found" ? "Sin Collar" : "Sin Nombre"}
                    containerStyle={style.checkStyle}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="#9575cd"
                    checked={checkedNoName}
                    onPress={() => {
                      setCheckedNoName(!checkedNoName);
                    }}
                  />
                </View>
              </View>
              <TextInput
                label={"Descripción (" + (200 - aboutMe.length) + ")"}
                value={aboutMe}
                onChangeText={(text) => gAboutMe(text)}
                style={style.input}
                ref={descRef}
                maxLength={200}
                multiline={true}
                onSubmitEditing={(event) => {
                  focusedTextInput(oldRef);
                }}
              />

              <TextInput
                label="Edad"
                value={old}
                keyboardType="numeric"
                onChangeText={(text) => gOld(text)}
                style={style.input}
                ref={oldRef}
              />
            </View>
            <View style={style.containerCheck}>
              <View style={style.viewCheck}>
                <View style={style.petRowText}>
                  <Text style={style.title}>Tipo:</Text>

                  <Text style={style.titleright}>Sexo:</Text>
                </View>
                <View style={style.petRowTipoSexo}>
                  <View style={style.buttonGroupS}>
                    <Button
                      style={style.buttonGLS}
                      mode="contained"
                      buttonColor={type === "dog" ? colorSelect : colorNoSelect}
                      compact={true}
                      labelStyle={style.labelStyleGroup}
                      onPress={() => gType("dog")}
                    >
                      Perro
                    </Button>
                    <Button
                      style={style.buttonGRS}
                      mode="contained"
                      compact={true}
                      labelStyle={style.labelStyleGroup}
                      buttonColor={type === "cat" ? colorSelect : colorNoSelect}
                      onPress={() => gType("cat")}
                    >
                      Gato
                    </Button>
                  </View>
                  <View style={style.buttonGroupS}>
                    <Button
                      style={style.buttonGLS}
                      mode="contained"
                      compact={true}
                      buttonColor={sex === "male" ? colorSelect : colorNoSelect}
                      labelStyle={style.labelStyleGroup}
                      onPress={() => gSex("male")}
                    >
                      Macho
                    </Button>
                    <Button
                      style={style.buttonGRS}
                      compact={true}
                      mode="contained"
                      labelStyle={style.labelStyleGroup}
                      buttonColor={
                        sex === "famale" ? colorSelect : colorNoSelect
                      }
                      onPress={() => gSex("famale")}
                    >
                      Hembra
                    </Button>
                  </View>
                </View>
              </View>
              <View style={style.petRowText}>
                <Text style={style.title}>Tamaño:</Text>
              </View>
              <View style={style.buttonGroupT}>
                <Button
                  style={style.buttonGL}
                  mode="contained"
                  buttonColor={size === "small" ? colorSelect : colorNoSelect}
                  compact={true}
                  labelStyle={style.labelStyleGroup}
                  onPress={() => setSize("small")}
                >
                  Chico
                </Button>
                <Button
                  style={style.buttonG}
                  mode="contained"
                  compact={true}
                  labelStyle={style.labelStyleGroup}
                  buttonColor={size === "medium" ? colorSelect : colorNoSelect}
                  onPress={() => setSize("medium")}
                >
                  Mediano
                </Button>
                <Button
                  style={style.buttonGR}
                  mode="contained"
                  compact={true}
                  labelStyle={style.labelStyleGroup}
                  buttonColor={size === "big" ? colorSelect : colorNoSelect}
                  animated={false}
                  onPress={() => setSize("big")}
                >
                  Grande
                </Button>
              </View>
            </View>
            <Button
              style={style.ingresar}
              mode="contained"
              labelStyle={{ color: "#FFFFFF" }}
              compact={true}
              onPress={() => savePet(pet)}
            >
              Guardar
            </Button>
            <PaperProvider>
              <View>
                <Portal>
                  <Dialog visible={alert} style={globalStyles.dialog}>
                    <Dialog.Title style={globalStyles.dialosetTitle}>
                      {title}
                    </Dialog.Title>
                    <Dialog.Content style={globalStyles.dialogMsj}>
                      <Paragraph>{message}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                      <Button
                        onPress={() => {
                          setAlert(false);
                          if (title !== "Advertencia") {
                            navigation.navigate("MyPets", {
                              consultarMascotas: true,
                            });
                          }
                        }}
                      >
                        Ok
                      </Button>
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
              </View>
            </PaperProvider>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  rowadefinir: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginStart: 5,
    marginTop: "auto",
  },
  adefinir: {
    fontSize: 14,
    alignItems: "baseline",
  },
  rowNombre: {
    flexDirection: "row",
    marginBottom: 0,
  },
  checkStyle: {
    alignItems: "baseline",
    backgroundColor: "#FFFFFF",
    borderWidth: 0,
    padding: 0,
  },
  buttonGL: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 2,
  },
  buttonGR: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flex: 2,
  },
  buttonGLS: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 3,
    marginEnd: 1,
  },
  buttonGRS: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flex: 3,
    marginEnd: 2,
  },
  buttonGroup: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 10,
    marginHorizontal: 15,
    flex: 1,
  },
  buttonGroupT: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 13,
    flex: 1,
    marginHorizontal: 30,
  },
  buttonGroupS: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginTop: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  buttonG: {
    marginHorizontal: 1,
    flex: 3,
  },
  fabLeft: {
    bottom: 0,
    backgroundColor: "#9575cd",
    elevation: 10,
    shadowOffset: { width: 1, height: 13 },
  },
  fabRight: {
    bottom: 0,
    backgroundColor: "#9575cd",
    elevation: 10,
    shadowOffset: { width: 1, height: 13 },
  },
  icon: {
    flex: 1,
  },
  ingresar: {
    backgroundColor: "#9575cd",
    padding: 3,
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    marginHorizontal: 80,
    marginVertical: 10,
    marginTop: 20,
  },
  contenedor: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  input: {
    marginBottom: 3,
    backgroundColor: "transparent",
    fontSize: 13,
  },
  inputNombre: {
    marginBottom: 3,
    backgroundColor: "transparent",
    fontSize: 13,
    flex: 2,
  },
  titleright: {
    fontSize: 16,
    flex: 6,
  },
  petRowText: {
    flexDirection: "row",
    top: 10,
    justifyContent: "space-between",
  },
  petRowTipoSexo: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    top: 5,
  },
  textCheck: {
    paddingTop: 8,
    marginStart: 20,
  },
  textCheckTop: {
    paddingTop: 8,
    marginStart: 15,
  },
  title: {
    fontSize: 16,
    flex: 6,
  },
  textChEdad: {
    paddingTop: 8,
  },
  old: {
    width: "50%",
  },
  textCheckEdad: {
    paddingTop: 8,
    marginStart: 5,
  },
  avatar: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 0,
    paddingBottom: 0,
  },
  avatarImage: {
    borderWidth: 1,
    //borderStyle: 'solid',
    borderColor: "#252932",
    height: 190,
    width: 190,
    borderRadius: 100,
  },
  viewRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  viewCheck: {
    justifyContent: "center",
  },
  containerCheck: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  viewRowIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -30,
    paddingTop: 0,
    marginHorizontal: "25%",
  },
  labelStyleGroup: {
    fontSize: 11,
    color: "#FFFFFF",
    padding: 0,
    margin: 0,
  },
});
export default NewPet;
