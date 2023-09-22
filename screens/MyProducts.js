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

const MyProducts = ({ route }) => {
  const { productoId } = route.params;
  const navigation = useNavigation();
  if (id_usuario === '' || id_usuario === null) {
    aux = id_usuario2;
  } else {
    aux = id_usuario;
  }

   // Cambiar el título de la pantalla
  navigation.setOptions({
    title: 'Editar producto',   
  });

  
  const [image, setImage] = useState([]);
  const [productName, setProductName] = useState('');
  const [desc, setDesc] = useState('');
  const [quantity, setQuantity] = useState('');
  const [responseId, setResponseId] = useState(0);
  const [imageUri, setImageUri] = useState(null);

  const [showModalGuardado, setShowModalGuardado] = useState(false); //ventana modal
  const [showModalRetira, setShowModalRetira] = useState(false); //ventana modal
  const [showModalValidacion, setShowModalValidacion] = useState(false); //ventana modal


  
  const [isAvaible, setIsAvaible] = useState('1');

    //TRAER TODOS LOS DATOS DEL USUARIO
  useState(async () => {
    try {
      const response = await fetch(
        `https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=OneProduct&id=${productoId}`
      );
      const json = await response.json();
      if (json.registros.length > 0) {
        //setFB(json.registros[0].socialfb);
        setProductName(json.registros[0].nombre);
        setDesc(json.registros[0].descripcion);
        setQuantity(json.registros[0].cantidad);
        //setImageUri(`data:image/png;base64,${json.registros[0].foto}`);
        const newImages = [...image, `data:image/png;base64,${escape(atob(json.registros[0].foto))}`];
        setImage(newImages);
        setImageUri(`data:image/png;base64,${escape(atob(json.registros[0].foto))}`);

        if(json.registros[0].existencia == 0){
          setIsAvaible('0');
        }
        else{
          setIsAvaible('1');
        }
        
      }
    } catch (error) {
      alert(error);
    }
  });

  
  const handleNumberChangeQuantity = (text) => {
    if (/^\d+$/.test(text)) {
      // Validar que solo se ingresen números
      setQuantity(text);
    }
  };

  const pickImage = async () => {
    if (image.length >= 1) {
      // alert('Has excedido el limite de imagenes');
      setShowModalRetira(true); //Mostrar mdoal

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
      const url = `https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=editproduct&id=${productoId}&nombre=${productName}&descripcion=${desc}&cantidad=${quantity}&existencia=${isAvaible}`;
      const fetchOptions = {
        method: 'POST',
        body: formData
      };
      const result = await fetch(url, fetchOptions); // enviar la imagen al servidor con fetch
      const responseText = await result.text(); // obtener la respuesta del servidor en formato de texto
      // alert(responseText); //Respuesta del servidor
      const jsonResponse = JSON.parse(responseText); // Analizar la respuesta JSON
      
      return;
    } catch (error) {
    alert(error);
  }
  };


  
  const upload = () => {
    //modificar esta parte image.length < 1
    if (image.length > 1) {
      // alert('Inserta por lo menos una imagen');
      setShowModalValidacion(true); //Mostrar mdoal
    } else if (productName == '') {
      // alert('Introduce texto en el nombre del producto');
      setShowModalValidacion(true); //Mostrar mdoal
    } else if (desc == '') {
      // alert('Introduce texto en la descripción');
      setShowModalValidacion(true); //Mostrar mdoal
    } else if (quantity == '') {
      // alert('Inserta algo en la cantidad');
      setShowModalValidacion(true); //Mostrar mdoal
    } else {
      try {
        productData();
        
      } catch (error) {
        alert(error)

      }finally {
        setShowModalGuardado(true); //Mostrar mdoal
          
          //alert(responseId);
          // navigation.navigate('SelfScreen');
      }

    }
  };

  
  const deleteImage = (index) => {
    const newImages = [...image];
    newImages.splice(index, 1);
    setImage(newImages);
  };

  const setAvaible = (number) => {
    setIsAvaible(number);
  };

  const Avaible = () => {
    setIsAvaible('1');
  };

  const InAvaible = () => {
    setIsAvaible('0');
  };

  //https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=addproduct&id=189&&nombre=variable6&descripcion=variable&existencia=1&cantidad=1&contador=2&foto=hola

  return (
    <View style={styles.container}>
    {/* <Text>{productoId}</Text>*/}

      <TouchableOpacity style={styles.button5} onPress={pickImage} >
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
          }}>CAMBIAR IMAGEN</Text>

           </LinearGradient> 
      </TouchableOpacity>


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
      
      <Text style={styles.txt}>   Nombre del producto</Text>
      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={setProductName}
      />
      
      <Text style={styles.txt}>   Descripción</Text>
      <TextInput
        style={styles.input}
        value={desc}
        onChangeText={setDesc}
      />

      <Text style={styles.txt}>   Estado de la publicacion</Text>
      <Picker
        style={styles.input}
        selectedValue={isAvaible}
        onValueChange={(itemValue) => setAvaible(itemValue)}>
        <Picker.Item key="1" label="Activo" value="1" />
        <Picker.Item key="0" label="Inactivo" value="0" />
        ))
      </Picker>

      <Text style={styles.txt}>   Cantidad</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={handleNumberChangeQuantity}
        keyboardType="number-pad"
      />

      <TouchableOpacity style={styles.button4} onPress={upload} >
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
          }}>GUARDAR CAMBIOS</Text>

           </LinearGradient> 
      </TouchableOpacity>

       {/*<Button title="Subir producto" onPress={upload} /> */}
       


       {/*-------------------------------- V E N T A N A S   M O D A L E S ------------------------------*/}

      {/*VENTANA MODAL EN CASO DE CAMBIOS GUARDADOS*/}
      <Modal visible={showModalGuardado} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¡Bien!</Text>
            <Text style={styles.modalText}>Se han actualizado los datos correctamente.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalGuardado(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>

      {/*VENTANA MODAL EN CASO DE CAMBIOS LIMITE IMAGEN*/}
      <Modal visible={showModalRetira} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cambiar imagen</Text>
            <Text style={styles.modalText}>Elimina la imagen actual antes de agregar una nueva.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalRetira(false)}>
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

  
    </View>
  );
};

export default MyProducts;