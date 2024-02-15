import { FIREBASE_AUTH, FIREBASE_DB} from '../../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const NEW_PET = 'NEW_PET';

export const AddNewPet = (newPet) => {
  return async (dispatch) => {
  try {
    //GUARDO EN MI BASE DE DATOS PETS
    const newDoc = addDoc(collection(FIREBASE_DB, 'pets'), newPet);
    console.log(newDoc);
    console.log('newPet');
    setResultadoCrear(true);
  }
  catch(error){
      console.log("eeror al crear mascota" + error.code + error.message);
      console.log(error);
      setResultadoCrear(false);
    }

    dispatch({
      type: NEW_PET,
      pet: newDoc,
    });
  };
};
