import { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, IconButton } from "react-native-paper";
import CardChat from "../components/ui/CardChat";
import globalStyles from "../styles/global";
import { FIREBASE_DB } from "../FirebaseConfig";
import { collection, query, getDocs, where } from "firebase/firestore";

const ChatsList = (props) => {
  const { navigation } = props;
  const [myPetsChats, setMyPetsChats] = useState([]);
  const [myQuestionChats, setMyQuestionsChats] = useState([]);
  const [userId, gUserId] = useState(null);
  const [usernombre, gNombre] = useState(null);
  const [searchType, setSearchType] = useState("myPets");

  const user = { _id: userId, name: usernombre };
  useEffect(() => {
    if (userId !== null) {
      searchByType(userId, searchType);
    } else {
      obtenerDatosStorage();
    }
  }, [userId]);

  const obtenerDatosStorage = async () => {
    await AsyncStorage.getItem("uid").then((value) => {
      gUserId(value);
    });

    await AsyncStorage.getItem("name").then((value) => {
      gNombre(
        value.substring(0, 1).toUpperCase() + value.substr(1, value.length - 1)
      );
    });
  };

  const searchByType = (id, searchType) => {
    console.log("Busco chats");
    console.log("idchat");
    setSearchType(searchType);

    console.log("userId");
    console.log(id);
    if (searchType == "myQuestions") {
      const allChats = [];
      const colRef = collection(FIREBASE_DB, "chats");
      const q = query(colRef, where("userId", "==", id));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("mis preguntas");
          console.log(doc.data());

          if (doc != null) {
            allChats.push({
              _id: doc.id,
              chat: doc.data(),
            });
          }
          setMyQuestionsChats(allChats);
        });
      });
    } else {
      const allChats = [];
      const colRef = collection(FIREBASE_DB, "chats");
      const q = query(colRef, where("rescuerId", "==", id));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("mis otrasss");
          console.log(doc.data());
          if (doc != null) {
            allChats.push({
              _id: doc.id,
              chat: doc.data(),
            });
          }
          setMyPetsChats(allChats);
        });
      });
    }
  };

  return (
    <View>
      <View style={globalStyles.header}>
        <IconButton
          icon="arrow-left"
          color="#FFFFFF"
          style={globalStyles.iconBack}
          onPress={() => navigation.goBack()}
          size={30}
        />
        <Text style={globalStyles.title}>Chats</Text>
        <View style={globalStyles.viewR} />
      </View>
      <View style={styles.searchByType}>
        <Button
          style={styles.buttonGL}
          mode="contained"
          color={searchType === "myPets" ? "#9575cd" : "#ffffff"}
          labelStyle={styles.labelStyleGroup}
          onPress={() => searchByType(userId, "myPets")}
        >
          Mis Mascotas
        </Button>
        <Button
          style={styles.buttonGR}
          mode="contained"
          color={searchType === "myQuestions" ? "#9575cd" : "#ffffff"}
          labelStyle={styles.labelStyleGroup}
          onPress={() => searchByType(userId, "myQuestions")}
        >
          Mis Preguntas
        </Button>
      </View>
      {searchType === "myQuestions" && myQuestionChats.length <= 0 && (
        <Text style={globalStyles.msjAdvertencia}>No tienes chats</Text>
      )}
      {searchType === "myPets" && myPetsChats.length <= 0 && (
        <Text style={globalStyles.msjAdvertencia}>No tienes chats</Text>
      )}
      <View style={{ paddingVertical: 15 }}>
        {searchType === "myQuestions" && (
          <View>
            <FlatList
              data={myQuestionChats}
              renderItem={({ item }) => (
                <CardChat item={item} navigation={navigation} user={user} />
              )}
              keyExtractor={(item) => item._id}
            />
          </View>
        )}

        {searchType === "myPets" && (
          <View>
            <FlatList
              data={myPetsChats}
              renderItem={({ item }) => (
                <CardChat item={item} navigation={navigation} user={user} />
              )}
              keyExtractor={(item) => item._id}
            />
          </View>   
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchByType: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  buttonGL: {
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    flex: 2,
  },
  buttonGR: {
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    flex: 2,
  },
});

export default ChatsList;
