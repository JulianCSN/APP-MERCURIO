import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, RefreshControl, TouchableWithoutFeedback , SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { id_usuario } from './LoginScreen';
import { id_usuario2 } from './SigninScreen';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient"; 
import { Feather } from '@expo/vector-icons'; 


let aux = null;
let idUsuarioPublicador_g = null;
let idProductoPublicado_g = null;

function HomeScreen() {
  const [data, setData] = useState([]);
  const [idUsuarioPublicador, setIdUsuarioPublicador] = useState('');
  const [idProductoPublicado, setidProductoPublicado] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [loading, setLoading] = useState(true); // Estado de carga inicialmente verdadero

  if (id_usuario === '' || id_usuario === null) {
    aux = id_usuario2;
  } else {
    aux = id_usuario;
  }


  const onRefresh = React.useCallback( async() => {
    setRefreshing(true);
        try {
      const response = await fetch(`https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=home&id=${aux}`);
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
        const response = await fetch(`https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=home&id=${aux}`);
        const json = await response.json();
        setData(json.registros);
        setLoading(false); // Indica que los datos se han cargado
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [aux]);

  const setvariables = async (x, y) => {
    idUsuarioPublicador_g = x;
    idProductoPublicado_g = y;
  }

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      {/* Aqui vamos a agregar el onclick */}
      <TouchableOpacity
        style={styles.botonnavbar}
        onPress={() => {
          const x = (item.id_usuario);
          const y = (item.id);
          setvariables(x, y);
          navigation.navigate('DetalleProducto');
        }}
      >
        {item.foto ? (
          <Image
            source={{ uri: `data:image/png;base64, ${escape(atob(item.foto))}`}}
            style={[styles.image, { width: Dimensions.get('window').width, aspectRatio: item.width / item.height }]}
          />
        ) : null}
      </TouchableOpacity>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text style={styles.desc}>{item.descripcion}</Text>
      <Text style={styles.cant}>Cantidad: {item.cantidad}</Text>
    </View>
  );

  const navigation = useNavigation();
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>



  
    <View style={styles.container2}>
    
      <View style={styles.left}>
        <TouchableOpacity style={styles.botonnavbar} onPress={() => navigation.navigate('SelfScreen')}>
          <AntDesign name="profile" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    
      <View style={styles.middle}> 
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddScreen')}>
        <LinearGradient
          colors={['#940081', '#c400ab']}
          start={[1, 0]}
          end={[0, 0]}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50,
            borderRadius: 25,
        }}> 
         <AntDesign name="plus" size={40} color="white" />
        </LinearGradient> 
        </TouchableOpacity>
      </View>

      <View style={styles.right}>
        <TouchableOpacity style={styles.botonnavbar} onPress={() => navigation.navigate('PerfilScreen')}>
          <Feather name="user" size={26} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
     
    <View style={styles.container}>
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
/*

  ---------------------------------------------------- E S T I L O S -------------------------------------
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container2:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
    backgroundColor: '#ebebeb',
    //paddingHorizontal: 40,
    paddingTop: 30,
    paddingHorizontal: '100%',
    // paddingHorizontal: '100%', // Ajusta el valor según el margen que desees
    // paddingTop: '2%', // Ajusta el valor según el margen que desees
  },

  left: {
    flex: 1,
    alignItems: 'flex-start',
    
  },

  middle: {
    flex: 1,
    alignItems: 'center',
  },

  right: {
    flex: 1,
    alignItems: 'flex-end',
  },

  button: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#940081',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 18,
    fontWeight: 'bold',
  },

  desc: {
    fontSize: 14,
    color: 'gray',
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
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

});
export {idUsuarioPublicador_g, idProductoPublicado_g};
export default HomeScreen;
