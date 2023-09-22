import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/PerfilScreenStyle';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { base64_encode } from 'base-64';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

import { LinearGradient } from "expo-linear-gradient"; 


import { id_usuario } from './LoginScreen';
import { id_usuario2 } from './SigninScreen';


function PerfilScreen() {
  const navigation = useNavigation();
  const [showModalExterno, setShowModalExterno] = useState(false); //Visibilidad desactivada error externo
  const [data, setData] = useState({});
  const [imageUri, setImageUri] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [fb, setFB] = useState('');
  const [ig, setIG] = useState('');
  const [state, setState] = useState('');

  // ------ VENTANAS MODALES ---------
  const [showModalDatosActualizados, setShowModalDatosActualizados] = useState(false);
  const [showModalDatosNoActualizados, setShowModalDatosNoActualizados] = useState(false);
  const [showModalCancelado, setShowModalCancelado] = useState(false); // visibilidad desactivada, subir imagen cancelado
  const [showModalSubiendo, setShowModalSubiendo] = useState(false); //Visibilidad desactivada subir imagen subiendo
  const [showModalExito, setShowModalExito] = useState(false); //Visibilidad desactivada subir imagen Exito
  const [showModalNovalido, setShowModalNovalido] = useState(false); //Visibilidad desactivada subir imagen Formato no valido
  const [showModalError, setShowModalError] = useState(false); //Visibilidad desactivada subir imagen Error

  if (id_usuario === '') {
    aux = id_usuario2;
  } else {
    aux = id_usuario;
  }

  // Cambiar el título de la pantalla
  navigation.setOptions({
    title: 'Perfil',   
  });

  const image = Asset.fromModule(require('../assets/imgdefault.png')).uri;

  const estados = [
    { label: 'Colima', value: 'Colima' },
    { label: 'Jalisco', value: 'Jalisco' },
    { label: 'Michoacán', value: 'Michoacán' },
  ];
  // Función para abrir la cámara o galería del usuario y seleccionar una imagen
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      base64: false, 
      aspect: [4, 3],
    });

    if (result.canceled) {
      // alert('Cancelado...');
    } else {
      uploadImage(result.assets[0].uri); // llamar a la función que envía la imagen a la API
      setImageUri(result.assets[0].uri);
      // alert('subiendo...');
    }
  };

  // Función para enviar la imagen a la API
const uploadImage = async (uri) => {
  try {
    const response = await fetch(uri);
    const foto = await response.blob(); // obtener el objeto Blob a partir de la respuesta
    const formData = new FormData(); // crear un objeto FormData para enviar la imagen
    formData.append('foto', foto); // agregar la imagen al objeto FormData
    const fullUrl = `https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=editperfil&id=${aux}`; // agregar el ID del usuario a la URL
    const fetchOptions = {
      method: 'POST',
      body: formData
    };
    const result = await fetch(fullUrl, fetchOptions); // enviar la imagen al servidor con fetch
    const responseText = await result.text(); // obtener la respuesta del servidor en formato de texto
    const jsonResponse = JSON.parse(responseText); // Analizar la respuesta JSON
    // alert(responseText); //Respuesta del servidor
    if (jsonResponse.status === 'OK') {
      // Mostrar la ventana modal de éxito
      setShowModalExito(true);
    }else if(jsonResponse.status === 'Error: Tipo de imagen no válido'){
      setShowModalNovalido(true);
    }else if(jsonResponse.status === 'No se agregaron datos'){
      setShowModalError(true);
    }
  } catch (error){
    alert(error);
  }
};



  // Función para actualizar el usuario
  const updateUser = async () => {
    const url = `https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=editperfil2&id=${aux}&descripcion=${descripcion}&estado=${state}&socialfb=${fb}&socialig=${ig}`;
    const response = await fetch(url);
    //const data = await response.json();
    const response2 = await fetch(
      `https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=userdata&id=${aux}`
    );
    //Dejar los datos actualizados
    const json = await response2.json();
    setData(json.registros);
    if (json.registros.length > 0) {
      setShowModalDatosActualizados(true);
      setFB(json.registros[0].socialfb);
      setIG(json.registros[0].socialig);
      setDescripcion(json.registros[0].descripcion);
      setState(json.registros[0].estado);
    } else{
      setShowModalDatosNoActualizados(true);
    }
  };

  const handleUser = async () => {
    updateUser();
  };

  //TRAER TODOS LOS DATOS DEL USUARIO
  useState(async () => {
    try {
      const response = await fetch(
        `https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=userdata&id=${aux}`
      );
      const json = await response.json();
      setData(json.registros);
      if (json.registros.length > 0) {
        setFB(json.registros[0].socialfb);
        setIG(json.registros[0].socialig);
        setDescripcion(json.registros[0].descripcion);
        setState(json.registros[0].estado);
        
        setImageUri(`data:image/png;base64,${json.registros[0].foto}`);
      }
    } catch (error) {
      alert(error);
    }

  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <TouchableOpacity style={styles.button1} onPress={pickImage} >
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
          }}>ACTUALIZAR IMAGEN</Text>

           </LinearGradient> 
      </TouchableOpacity>

      
      <Text style={styles.texto}>Datos personales</Text>
      

      <TextInput
        style={styles.input}
        placeholder="Link para facebook"
        value={fb}
        onChangeText={setFB}
      />
      <TextInput
        style={styles.input}
        placeholder="Link para instagram"
        value={ig}
        onChangeText={setIG}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <RNPickerSelect
        style={{
          inputIOS: styles.input,
          inputAndroid: styles.input,
        }}
        onValueChange={(value) => setState(value)}
        value={state}
        placeholder={{ label: 'Seleccione su estado', value: null }}
        items={estados}
        useNativeAndroidPickerStyle={false} // Para personalizar el estilo en Android
        
      />

      <TouchableOpacity style={styles.button2} onPress={handleUser} >
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
          }}>ACTUALIZAR DATOS</Text>

           </LinearGradient> 
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button3} onPress={() => navigation.navigate('Inicio de sesión')} >
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
          }}>CERRAR SESIÓN</Text>

           </LinearGradient> 
      </TouchableOpacity>
      

       {/*-------------------------------- V E N T A N A S   M O D A L E S ------------------------------*/}

      {/*VENTANA MODAL EN CASO DE CANCELADO*/}
      <Modal visible={showModalCancelado} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Imagen seleccionada</Text>
            <Text style={styles.modalText}>Se ha cancelado el proceso.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalCancelado(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>

      {/*VENTANA MODAL EN CASO DE SUBIENDO*/}
      <Modal visible={showModalSubiendo} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Imagen seleccionada</Text>
            <Text style={styles.modalText}>Subiendo la imagen seleccionada...</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalSubiendo(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>

      {/*VENTANA MODAL EN CASO DE EXITO*/}
      <Modal visible={showModalExito} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Imagen seleccionada</Text>
            <Text style={styles.modalText}>Se ha cambiado correctamente la imagen de perfil.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalExito(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>

      {/*VENTANA MODAL EN CASO DE FORMATO NO VALIDO*/}
      <Modal visible={showModalNovalido} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Imagen seleccionada</Text>
            <Text style={styles.modalText}>El formato no es valido.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalNovalido(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>

      {/*VENTANA MODAL EN CASO DE ERROR INESPERADO*/}
      <Modal visible={showModalError} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Imagen seleccionada</Text>
            <Text style={styles.modalText}>Ocurrió un error al momento de cargar la imagen.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalError(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>

      {/*VENTANA MODAL EN CASO DE DATOS ACTUALIZADOS*/}
      <Modal visible={showModalDatosActualizados} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¡Hecho!</Text>
            <Text style={styles.modalText}>Datos actualizados correctamente</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalDatosActualizados(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>

      {/*VENTANA MODAL EN CASO DE DATOS NO ACTUALIZADOS*/}
      <Modal visible={showModalDatosNoActualizados} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Algo ha ido mal</Text>
            <Text style={styles.modalText}>Tus datos no se actualizaron, verifica tu conexión a internet e intenta de nuevo</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalDatosNoActualizados(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>


    </View>
  );
}

export default PerfilScreen;
