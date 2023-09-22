import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, Image, TouchableOpacity, Linking } from 'react-native';
import styles from '../styles/PerfilScreenStyle'; 
import { idUsuarioPublicador_g, idProductoPublicado_g } from './HomeScreen';
import { useNavigation } from '@react-navigation/native';


function DetalleProducto() {

  const [imageUri, setImageUri] = useState(null);
  const [nameProduct, setNameProduct] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [cantidad, setCantidad] = useState('');

  const [user, setUser] = useState('');
  const [state, setState] = useState('');
  const [fb, setFB] = useState('');
  const [ig, setIG] = useState('');
  const [data, setData] = useState('');

  const navigation = useNavigation();

  //Funciones para abrir el link de las redes sociales en el navegador
  const handleFacebookClick = () => {
    Linking.openURL(fb);
  };

  const handleInstagramClick = () => {
    Linking.openURL(ig);
  };


  // Cambiar el título de la pantalla
  navigation.setOptions({
    title: 'Detalles y contacto',   
  });

useState(async () => {
  

    try {
      const response = await fetch(
        `https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=detalleproducto&id_usuario=${idUsuarioPublicador_g}&id_producto=${idProductoPublicado_g}`
      );
      const json = await response.json();
      setData(json.registros);
      if (json.registros.length > 0) {
        setImageUri(`data:image/png;base64,${atob(json.registros[0].foto)}`);
        setNameProduct(json.registros[0].nombre_producto);
        setDescription(json.registros[0].descripcion);
        setCategory(json.registros[0].categoria);
        setCantidad(json.registros[0].cantidad);
        setUser(json.registros[0].usuario);
        setFB(json.registros[0].socialfb);
        setIG(json.registros[0].socialig);
        setState(json.registros[0].estado);
      }
    } catch (error) {
      alert(error);
    }
  }); 
  
  

  return (
    <View style={styles.container}>
      {imageUri && <Image source={{ uri: imageUri  }} style={styles.image2} />}
      <Text style={styles.txt1}>{nameProduct}</Text>
      <Text style={styles.txt2}>{description}</Text>
      {/*<Text>Categoría: {category}</Text>*/}
      <Text style={styles.txt4}>Cantidad: {cantidad}</Text>
      <Text style={styles.txt3}>Nombre de usuario: {user}</Text>
      <Text style={styles.txt4}>Contacto:</Text>
      
      <View style={styles.socialIconsContainer}>
        <TouchableOpacity onPress={handleFacebookClick}>
        <Image   // Logo FACEBOOK
          source={require('../assets/fb.png')}
          style={{ width: 70, height: 70,}}
        />
        </TouchableOpacity> 

        <TouchableOpacity onPress={handleInstagramClick}>
        <Image   // Logo INSTAGRAM
          source={require('../assets/ig.png')}
          style={{ width: 50, height: 50, marginTop: 10, marginLeft: 5}}
        />
        </TouchableOpacity>
      </View>
      
      {/*
      <Text style={styles.txt4}>{fb}</Text>
      <Text style={styles.txt4}>{ig}</Text>
      */}
      <Text style={styles.txt4}>{state}</Text>
    </View>
  );
}

export default DetalleProducto;