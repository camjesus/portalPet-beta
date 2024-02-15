
import AsyncStorage from '@react-native-async-storage/async-storage';

const Report = (props, route) => {
  const {params} = route;
  console.log(props.route.params);
  const {navigation} = props;
  const {pet} = props.route.params;
  const [denuncias, guardarDenuncias] = useState([]);
  const [userId, gUserId] = useState();
  const [otro, gOtro] = useState('');
  const [motivoID, gMotivoID] = useState(0);
  const [consultoDenuncias, gConsultoDenuncias] = useState(true);
  const [estilo, gEstilo] = useState(true);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    console.log('pase por el effect');
    if  (consultoDenuncias) {
      obtenerDatosStorage();
      gConsultoDenuncias(false);
    }
  }, [consultoDenuncias]); //cuando la pantalla tiene el foco

  const obtenerDatosStorage = async () => {
    try {
      await AsyncStorage.getItem('userId');
      AsyncStorage.getItem('userId').then((value) => {
        gUserId(parseInt(value));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const enviarDenuncia = async () => {
    var newDenuncia = new FormData();
    newDenuncia.append('idMotivo', motivoID);
    newDenuncia.append('idMascota', pet.id);
    newDenuncia.append('idPersona', userId);
    newDenuncia.append('otro', otro);

    const urdenuncia = constantes.BASE_URL + 'addDenuncia/';
    console.log(newDenuncia);

    const resultado = await axios.post(urdenuncia, newDenuncia);
    console.log(resultado);

    setAlert(true);
  };

  return (
    <View>
      
    </View>
  );
};
export default Report;
