import { useState, useEffect, useCallback, useRef } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Avatar,
} from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  IconButton,
  Text,
  Button,
  Portal,
  Dialog,
  Paragraph,
  Modal,
} from "react-native-paper";
import { View } from "react-native";
import globalStyles from "../styles/global";
import { Icon } from "react-native-elements";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseConfig";
import { collection, addDoc, query, getDocs, where , orderBy} from "firebase/firestore";

const ChatScreen = (props) => {
  console.log("props chats");
  console.log(props);
  const { user } = props.route.params;
  console.log("user chats");
  console.log(user);
  const { navigation, chat, pet } = props.route.params;
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [isFocus, setIsFocus] = useState(true);
  const chatRef = useRef(chat);
  const petRef = useRef(pet);
  const [messages, setMessages] = useState([]);
  const [idChat, setidChat] = useState(props?.route.params.idChat);
  const [mensaje, setMensaje] = useState("");
  const [titulo, setTitulo] = useState("");
  const [visible, setVisible] = useState(false);
  const [modo, setModo] = useState("adoptante");
  const [accion, setAccion] = useState("");
  const [subSolc, setSubSolc] = useState("");
  const [visibleSolc, setvisibleSolc] = useState(false);
  const [nameUser1, setNombre1] = useState();
  const [nameUser2, setNombre2] = useState();
  const [namePet, setNombreMas] = useState();

  useEffect(() => {
    setNombreMas(
      chat.namePet.substring(0, 1).toUpperCase() +
        chat.namePet.substr(1, chat.namePet.length - 1)
    );

    setNombre1(
      chat.nameUser1.substring(0, 1).toUpperCase() +
        chat.nameUser1.substr(1, chat.nameUser1.length - 1)
    );

    setNombre2(
      chat.nameUser2.substring(0, 1).toUpperCase() +
        chat.nameUser2.substr(1, chat.nameUser2.length - 1)
    );
  }, []);

  useEffect(() => {
    //setChat(props.chat);
    //chatRef.current = chat;
    console.log("chat chats");
    console.log(chat);
    console.log(chatRef);
    if (user._id === chatRef.current.rescuerId) {
      setModo("rescatista");
    }
    buscarChat();
    customNames(user.name, petRef.current.rescuer.name);
  }, []);

  const customNames = (userCustom, rescuerCustom) => {
    if (userCustom.indexOf(" ") >= 0) {
      var index = userCustom.indexOf(" ");
      user.name = userCustom.substring(0, index);
    }

    if (rescuerCustom.indexOf(" ") >= 0) {
      var index = rescuerCustom.indexOf(" ");
      petRef.current.rescuer = rescuer.substring(0, index);
    }
  };

  const sendMessageAuto = (messages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    addDoc(collection(FIREBASE_DB, "messages"), {
      _id: messages._id,
      text: messages.text,
      createdAt: messages.createdAt,
      system: true,
      idChat: chatRef.current.idChat,
    });
  };

  const buscarChat = (props) => {
    console.log("Busco chats");
    console.log("idchat");
    console.log(idChat);
    console.log(pet);
    if (idChat == null) {
      const chats = [];
      const colRef = collection(FIREBASE_DB, "chats");
      const q = query(
        colRef,
        where("rescuerId", "==", chat?.rescuerId),
        where("userId", "==", chat?.userId),
        where("idPet", "==", chat?.idPet)
      );
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("docPet");
          console.log(doc.data());
          if (doc != null) {
            chats.push(
              (chatRef.current = {
                idChat: doc.id,
                date: doc.data().date,
                idPet: doc.data().idPet,
                imagePet: doc.data().imagePet,
                namePet: doc.data().namePet,
                nameUser1: doc.data().nameUser1,
                nameUser2: doc.data().nameUser2,
                rescuerId: doc.data().rescuerId,
                userId: doc.data().userId,
                required: doc.data().required,
              })
            );
            console.log("chatRef");
            console.log(chatRef);
            if (chatRef.current.idChat !== null) {
              searchMessages(chatRef.current.idChat);
            }
          }
        });
      });
    } else {
      console.log("esta pasando por aca otra vez?");
      searchMessages(idChat);
    }
  };

  const searchMessages = (id) => {
    console.log("Busco mensajes");
    console.log("idchat");
    console.log(id);
    var mensajes = [];
    const colRef = collection(FIREBASE_DB, "messages");
    const q = query(
      colRef,
      where("idChat", "==", id),
      orderBy("createdAt", "desc")
    );
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("docPet");
        console.log(doc.data());
        if (doc != null) {
          mensajes.push({
            _id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
            system: doc.data().system === undefined ? false : doc.data().system,
          });
        }
      });
    });
    console.log(messages);
  };

  const onSend = useCallback((messages = []) => {
    console.log(messages);
    var date = new Date();
    if (idChat === null) {
      addDoc(collection(FIREBASE_DB, "chats"), {
        date: date,
        idPet: petRef.current.id,
        imagePet: petRef.current.image_url,
        namePet: petRef.current.name,
        nameUser1: petRef.current.rescuer.name,
        nameUser2: user.name,
        rescuerId: petRef.current.rescuerId,
        userId: user._id,
        required: false,
      }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setidChat(docRef.id);
        console.log("messages");
        console.log(messages);
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, messages)
        );

        
        messages.forEach((item) => {
          addDoc(collection(FIREBASE_DB, "messages"), {
            text: item.text,
            createdAt: new Date(),
            user: item.user,
            idChat: docRef.id,
            system: false,
          });
        });
      });
    } else {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      console.log("messages sdas");
      console.log(messages);
      messages.forEach((item) => {
        addDoc(collection(FIREBASE_DB, "messages"), {
          text: item.text,
          createdAt: new Date(),
          user: item.user,
          idChat: chatRef.current.idChat,
          system: false,
        });
      });
    }
  });

  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        placeholder="Escribí tu mensaje..."
        containerStyle={{
          backgroundColor: "white",
          borderTopColor: "#9575cd",
          borderTopWidth: 1,
        }}
      />
    );
  };

  const customView = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#9575cd",
          },
          left: {
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#9575cd",
          },
        }}
        textStyle={{
          right: {
            color: "white",
          },
          left: {
            color: "black",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    console.log("props");
    console.log(props.renderSend);
    return (
      <Send {...props} containerStyle={{}}>
        <IconButton
          icon="paw"
          color="#000000"
          style={style.iconSend}
          size={33}
        />
      </Send>
    );
  };
  const customAvatar = (props) => {
    return (
      <Avatar
        {...props}
        imageStyle={{
          height: 30,
          width: 10,
        }}
      />
    );
  };

  const setDialog = (para) => {
    setAccion(para);
    switch (para) {
      case "cancelar":
        setTitulo("Cancelar solicitud");
        setMensaje("Estas seguro de cancelar la solicitud de adopción?");
        break;

      case "rechazar":
        setTitulo("Rechazar solicitud");
        setMensaje("Estas seguro de cancelar la solicitud de adopción?");
        break;
      case "solicitar":
        setTitulo("Solicitar adopción");
        setMensaje("Estas seguro de solicitar la adopción?");
        break;

      case "desvincular":
        setTitulo("Desvincular adoptante");
        setMensaje("Estas seguro de desvincular al adoptante?");
        break;
      case "vincular":
        setTitulo("Vincular adoptante");
        setMensaje("Estas seguro que quieres que vincuar al adoptante?");
        break;
      case "adoptado":
        setTitulo("Ups!");
        setMensaje(
          "Esta mascota fue adoptada! Pero no pierdas las esperanzas! Encontraremos otrx compa!"
        );
        break;
    }
    setVisible(true);
  };

  /*
  const reseteoSolicitudes = () => {
    //usco los chats con la mascota
    db.collection("chats")
      .where("idPet", "==", petRef.current.id)
      .where("required", "==", true)
      .get()
      .then((response) => {
        console.log("response.doc");
        console.log(response.doc);
        response.forEach((doc) => {
          sendMessageAuto({
            _id: Math.random().toString(36).substring(7),
            text: "La mascota solicitada, fue adoptada por otra persona! Otra mascota te esta esperando!",
            createdAt: new Date(),
            system: true,
            idChat: doc.id,
          });
          db.collection("chats").doc(doc.id).update({
            required: false,
          });
        });
      });
  };

  const updateChat = (accion, chatDoc) => {
    console.log("accion");
    console.log(accion);
    console.log(chatDoc);

    db.collection("chats").doc(chatDoc).update({
      required: accion,
    });
    chatRef.current.required = accion;
  };

  const asociarAdoptante = async (idAdoptante, id) => {
    console.log("idAdoptante");
    console.log(idAdoptante);
    console.log("id");
    console.log(id);

    const postAdoptante = { id, idAdoptante: idAdoptante };
    petRef.current.idAdoptante = idAdoptante;
    const url = constantes.BASE_URL + "asociarDesasociar";

    const resultado = await axios.post(url, postAdoptante);
    console.log("DATA " + resultado.data);
    petRef.current = resultado.data;
    console.log("idAdoptante");
    console.log(idAdoptante);
  };
*/
  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={globalStyles.header}>
          <IconButton
            icon="arrow-left"
            color="#FFFFFF"
            style={globalStyles.iconBack}
            onPress={() => navigation.goBack()}
            size={30}
          />
          {user._id === chat?.rescuerId && (
            <View style={style.viewR}>
              <Icon
                size={25}
                name="paw"
                type="material-community"
                color="#FFFFFF"
              />
              <Text style={style.title}>
                {namePet} | {nameUser2}
              </Text>
              <Icon
                size={25}
                name="account"
                type="material-community"
                color="#FFFFFF"
              />
            </View>
          )}
          {user._id === chat?.userId && (
            <View style={style.viewR}>
              <Icon
                size={25}
                name="paw"
                type="material-community"
                color="#FFFFFF"
              />
              <Text style={style.title}>
                {namePet} | {nameUser1}
              </Text>
              <Icon
                size={25}
                name="account"
                type="material-community"
                color="#FFFFFF"
              />
            </View>
          )}
          {idChat !== null &&
            petRef.current.idAdoptante === null &&
            chatRef.current.required === false &&
            modo === "adoptante" && (
              <IconButton
                icon="home-heart"
                color="#FFFFFF"
                style={globalStyles.viewR}
                onPress={() => setDialog("solicitar")}
                size={30}
              />
            )}
          {idChat === null && <View style={globalStyles.viewR} />}

          {petRef.current.idAdoptante === chatRef.current.userId &&
            modo === "rescatista" && (
              <IconButton
                icon="account-remove"
                color="#FFFFFF"
                style={globalStyles.viewR}
                onPress={() => setDialog("desvincular")}
                size={30}
              />
            )}

          {petRef.current.idAdoptante === null &&
            chatRef.current.required === true &&
            modo === "rescatista" && (
              <View style={{ position: "absolute", right: 15 }}>
                <IconButton
                  icon="check"
                  color="#4FC70F"
                  style={style.viewLIcon}
                  onPress={() => {
                    setDialog("vincular");
                  }}
                  size={30}
                />
                <IconButton
                  icon="close"
                  color="#F65842"
                  style={style.viewRIcon}
                  onPress={() => setDialog("rechazar")}
                  size={30}
                />
              </View>
            )}

          {petRef.current.idAdoptante !== null &&
            modo === "adoptante" && (
              <IconButton
                icon="home-heart"
                color="#F65842"
                style={globalStyles.viewR}
                onPress={() => setDialog("adoptado")}
                size={30}
              />
            )}

          {petRef.current.idAdoptante === null &&
            modo === "rescatista" && <View style={globalStyles.viewR} />}

          {petRef.current.idAdoptante === null &&
            chatRef.current.required === true &&
            modo === "adoptante" && (
              <IconButton
                icon="paw-off"
                color="#F65842"
                style={globalStyles.viewR}
                onPress={() => setDialog("cancelar")}
                size={30}
              />
            )}
        </View>
      </View>
      {petRef.current.idAdoptante === null &&
        chatRef.current.required === true &&
        modo === "adoptante" && (
          <View style={style.viewPopup}>
            <Text style={style.text}>
              Has solicitado la adopción! Estamos en la espera de la respuesta!
            </Text>
          </View>
        )}

      {petRef.current.idAdoptante === null &&
        chatRef.current.required === true &&
        modo === "rescatista" && (
          <View style={style.viewPopupSolc}>
            <Text style={style.text}>
              Te han solicitado la adopción! Estamos en la espera de tu
              respuesta!
            </Text>
          </View>
        )}

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={user}
        maxInputLength={200}
        renderInputToolbar={(props) => customtInputToolbar(props)}
        renderBubble={(props) => customView(props)}
        renderSend={(props) => renderSend(props)}
        renderAvatar={(props) => customAvatar(props, chat)}
      />
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    padding: 0,
    marginVertical: 0,
    alignItems: "baseline",
    textTransform: "capitalize",
    marginHorizontal: 3,
  },
  viewLIcon: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    right: 0,
    marginTop: 50,
    elevation: 6,
  },
  viewRIcon: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    right: 50,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    marginTop: 50,
    elevation: 6,
  },
  viewR: {
    flexDirection: "row",
    marginTop: 20,
  },
  renderMessage: {
    backgroundColor: "#9575cd",
  },
  sendIcon: {
    fontSize: 25,
    color: "#3A97F9",
  },
  iconSend: {
    marginVertical: "auto",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textAvatar: {
    backgroundColor: "#9575cd",
  },
  viewPopupSolc: {
    position: "absolute",
    marginHorizontal: "20%",
    marginTop: "25%",
    marginVertical: 10,
    top: 0,
    padding: 9,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderColor: "#9575cd",
    borderStyle: "solid",
    borderWidth: 1,
    elevation: 6,
  },
  viewPopup: {
    position: "absolute",
    marginHorizontal: "20%",
    marginTop: "23%",
    marginVertical: 10,
    top: 0,
    //bottom: 50,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderColor: "#9575cd",
    borderStyle: "solid",
    borderWidth: 1,
    elevation: 10,
  },
  text: {
    textAlign: "center",
    marginHorizontal: 4,
  },
  text1: {
    textAlign: "center",
    marginHorizontal: 5,
    marginTop: 10,
  },
});

export default ChatScreen;
