import React, { useState, useEffect } from 'react';
import {useNavigation } from '@react-navigation/native';
import { View, Text, Button, FlatList, Image, RefreshControl, TouchableWithoutFeedback , SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native'; 
import { id_usuario } from './LoginScreen';
import { id_usuario2 } from './SigninScreen';


//NEW IMPORTS V7
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient"; 
import { Feather } from '@expo/vector-icons'; 

let aux = null;
let idUsuarioPublicador = null;
let idProductoPublicado = null;


function SelfScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [idUsuarioPublicador, setIdUsuarioPublicador] = useState('');
  const [idProductoPublicado, setidProductoPublicado] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [longblobData, setLongblobData] = useState('');

  const [loading, setLoading] = useState(true); // Estado de carga inicialmente verdadero

  if (id_usuario === '' || id_usuario === null) {
    aux = id_usuario2;
  } else {
    aux = id_usuario;
  }

  // Cambiar el título de la pantalla
  navigation.setOptions({
    title: 'Tus productos',   
  });

  const onRefresh = React.useCallback( async() => {
    setRefreshing(true);
        try {
      const response = await fetch(`https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=home2&id=${aux}`);
      const json = await response.json();
      setData(json.registros);
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=home2&id=${aux}`);
        const json = await response.json();
        setData(json.registros);
        setLoading(false); // Indica que los datos se han cargado
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [aux]);

   const renderProduct = ({ item }) => (

    <View style={styles.productContainer}>

      {/*Aqui vamos a agregar el onclick*/}
      <TouchableOpacity style={styles.botonnavbar} onPress={() =>{
        setIdUsuarioPublicador([item.id_usuario]);
        setidProductoPublicado([item.id]);
        navigation.navigate('MyProducts', { productoId: item.id })}}>
      {item.foto ? (
        <Image  
          source={{ uri: `data:image/png;base64, ${escape(atob(item.foto))}`}}
          style={[styles.image, { width: Dimensions.get('window').width, aspectRatio: item.width / item.height }]}
        />
      ) : null}
        </TouchableOpacity>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text style={styles.desc}>{item.descripcion}</Text>
       {/* <Text style={styles.desc}>{item.id}</Text>*/}
      <Text style={styles.cant}>Cantidad: {item.cantidad}</Text>
       {/* <Text style={styles.cant}>{item.id_usuario}</Text>*/}
      {/*<Text style={styles.desc}>{item.foto}</Text>*/} 

      
    </View>
  );



    
/*

  ---------------------------------------------------- E S T I L O S -------------------------------------
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },


  productContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },

  image: {
    width: Dimensions.get('window').width - 20, 
    height: Dimensions.get('window').width - 90,
    marginHorizontal: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  desc: {
    fontSize: 14,
    color: 'gray',
  },

  cant: {
    fontSize: 14,
    color: 'gray',
  },

  botonnavbar: {
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: 'transparent',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }

});
  

    return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>

      
    <View style={styles.container}>

      {/* Condicional para mostrar el icono de carga */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={55} color="#940081" /> {/* Icono más grande */}
        </View> 
      ) : (
      <FlatList
          data={data}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          numColumns={1}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>

    </View>
    
  );
}

export {idUsuarioPublicador, idProductoPublicado};
export default SelfScreen;