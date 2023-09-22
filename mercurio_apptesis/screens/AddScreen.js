import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Picker,
  Modal,
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/AddScreenStyle';
import { id_usuario } from './LoginScreen';
import { id_usuario2 } from './SigninScreen';
import { base64_encode } from 'base-64';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient'; // Importar LinearGradient desde expo-linear-gradient


let aux = null;

const AddScreen = () => {
  const navigation = useNavigation();
  if (id_usuario === '' || id_usuario === null) {
    aux = id_usuario2;
  } else {
    aux = id_usuario;
  }


   // Cambiar el título de la pantalla
  navigation.setOptions({
    title: 'Nuevo producto',   
  });
  
  const [image, setImage] = useState([]);
  const [productName, setProductName] = useState('');
  const [desc, setDesc] = useState('');
  const [quantity, setQuantity] = useState('');
  const [responseId, setResponseId] = useState(0);
  const [imageUri, setImageUri] = useState(null);
  
  const [isAvaible, setIsAvaible] = useState('1');
  const [showModalVacios, setShowModalVacios] = useState(false); // visibilidad desactivada, campos vacios
  const [showModalEspeciales, setShowModalEspeciales] = useState(false); //Visibilidad desactivada caracteres
  const [showModalExterno, setShowModalExterno] = useState(false); //Visibilidad desactivada error externo 
  const [showModalContra, setShowModalContra] = useState(false);
  const [showModalCorrecto, setShowModalCorrecto] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);

  const [showModalLimite, setShowModalLimite] = useState(false);
  const [showModalValidacion, setShowModalValidacion] = useState(false);
  const [showModalExito, setShowModalExito] = useState(false);

  



  
  const handleNumberChangeQuantity = (text) => {
    if (/^\d+$/.test(text)) {
      // Validar que solo se ingresen números
      setQuantity(text);
    }
  };

  const pickImage = async () => {
    if (image.length >= 1) {
      // alert('Has excedido el limite de imagenes');
      setShowModalLimite(true); //Mostramos la ventana modal
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0,
        allowsMultipleSelection: false,
        base64: false, 
        aspect: [4, 3],
      });

      if (!result.canceled) {
        const newImages = [...image, result.assets[0].uri];
        setImage(newImages);
        setImageUri(result.assets[0].uri);
      }
    }
  };

  const productData = async () => {
    try {
      const response = await fetch(image[0]);
      const foto = await response.blob(); // obtener el objeto Blob a partir de la respuesta
      const formData = new FormData(); // crear un objeto FormData para enviar la imagen
      formData.append('foto', foto); // agregar la imagen al objeto FormData
      const url = `https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=addproduct&id=${aux}&nombre=${productName}&descripcion=${desc}&cantidad=${quantity}&existencia=${isAvaible}`;
      const fetchOptions = {
        method: 'POST',
        body: formData
      };
      const result = await fetch(url, fetchOptions); // enviar la imagen al servidor con fetch
      const responseText = await result.text(); // obtener la respuesta del servidor en formato de texto
      // alert(responseText); //Respuesta del servidor
      return;
    } catch (error) {
    alert(error);
  }
  };


  
  const upload = () => {
    //modificar esta parte image.length < 1
    if (image.length > 1) {
      // alert('Inserta por lo menos una imagen');
      setShowModalValidacion(true); //Mostramos la ventana modal
    } else if (productName == '') {
      // alert('Introduce texto en el nombre del producto');
      setShowModalValidacion(true); //Mostramos la ventana modal
    } else if (desc == '') {
      // alert('Introduce texto en la descripción');
      setShowModalValidacion(true); //Mostramos la ventana modal
    } else if (quantity == '') {
      // alert('Inserta algo en la cantidad');
      setShowModalValidacion(true); //Mostramos la ventana modal
    } else {
      try {
        productData();
        
      } catch (error) {
        alert(error)

      }finally {
        // alert("Guardado con exito");
        setShowModalExito(true); //Mostramos la ventana modal
          //alert(responseId);
      }

    }
  };

  
  const deleteImage = (index) => {
    const newImages = [...image];
    newImages.splice(index, 1);
    setImage(newImages);
  };

  //https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=addproduct&id=189&&nombre=variable6&descripcion=variable&existencia=1&cantidad=1&contador=2&foto=hola

  return (
    <View style={styles.container}>
      

       <TouchableOpacity style={styles.button2} onPress={pickImage} >
        <LinearGradient
          colors={['#940081', '#c400ab']}
          start={[1, 0]}
          end={[0, 0]}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 7,
        }}> 

        <Text style={{
          color:'white',
          fontSize:15,
          textAlign:'center', 
          textAlignVertical:'center',
          fontWeight: 'bold',
          letterSpacing: .5,
          }}>SELECCIONAR IMAGEN</Text>

           </LinearGradient> 
      </TouchableOpacity>
        
      <Image   // IMG DEFAULT //condición para renderizar la imagen solo si no hay imágenes en el estado image.
          source={require('../assets/imgico.png')}
          style={image.length === 0 ? { width: 120, height: 120, opacity: 0.3 } : { display: 'none' }} 
      />
      
      <ScrollView horizontal centerContent>
        {image.map((image, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteImage(index)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>-</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: image }}
              style={{ width: 120, height: 120, margin: 10}}
            />
          </View>
        ))}
      </ScrollView>
      
      
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={productName}
        onChangeText={setProductName}
      />
      
      <TextInput
        style={styles.input3}
        placeholder="Descripción"
        value={desc}
        onChangeText={setDesc}
      />

      <Text style={styles.txt}>   Estado de la publicacion</Text>
      <Picker
        style={styles.input}
        selectedValue={isAvaible}
        onValueChange={(itemValue, itemIndex) => setIsAvaible(itemValue)}>
        <Picker.Item key="1" label="Activo" value="1" />
        <Picker.Item key="0" label="Inactivo" value="0" />
        ))
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        value={quantity}
        onChangeText={handleNumberChangeQuantity}
        keyboardType="number-pad"
      />


      <TouchableOpacity style={styles.button3} onPress={upload} >
        <LinearGradient
          colors={['#940081', '#c400ab']}
          start={[1, 0]}
          end={[0, 0]}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 7,
        }}> 

        <Text style={{
          color:'white',
          fontSize:15,
          textAlign:'center', 
          textAlignVertical:'center',
          fontWeight: 'bold',
          letterSpacing: .5,
          }}>PUBLICAR PRODUCTO</Text>

           </LinearGradient> 
      </TouchableOpacity>
      

      {/*-------------------------------- V E N T A N A S   M O D A L E S ------------------------------*/}

      {/*VENTANA MODAL EN CASO DE LIMITE*/}
      <Modal visible={showModalLimite} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selección de imagen</Text>
            <Text style={styles.modalText}>Solo es posible seleccionar una imagen por producto.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalLimite(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>

      {/*VENTANA MODAL EN CASO DE VALIDACION*/}
      <Modal visible={showModalValidacion} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Error</Text>
            <Text style={styles.modalText}>Faltan campos por llenar.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalValidacion(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>

      {/*VENTANA MODAL EN CASO DE EXITO AL PUBLICAR*/}
      <Modal visible={showModalExito} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¡Bien!</Text>
            <Text style={styles.modalText}>El producto ha sido publicado con éxito. Recuerda colocar los links de tus redes socuiales para que se puedan contactar contigo.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => {
                setShowModalExito(false); // Cierra el modal
                navigation.navigate('HomeScreen'); // Navega a HomeScreen
              }}>  
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
       
      
    </View>
  );
};

export default AddScreen;
