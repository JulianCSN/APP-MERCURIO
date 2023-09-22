import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Modal, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, StatusBar } from 'react-native';
import styles from '../styles/LoginScreenStyle';
import SigninScreen from './SigninScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';

//New import
import { LinearGradient } from "expo-linear-gradient"; 
import { BackHandler } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


let id_usuario = null;

const LoginScreen = ({ navigation }) => {
//FUNCION PARA LLAMAR LA VALIDACION
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModalVacios, setShowModalVacios] = useState(false); // visibilidad desactivada, campos vacios
  const [showModalEspeciales, setShowModalEspeciales] = useState(false); //Visibilidad desactivada caracteres espciales
  const [showModalExterno, setShowModalExterno] = useState(false); //Visibilidad desactivada caracteres 
  const [showModalNoEncontrado, setShowModalNoEncontrado] = useState(false); //Visibilidad desactivada caracteres 
  //VALIDACION DEL USUARIO EN LA API

  const login = async (username, password) => {
    const url = `https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=login&usuario=${username}&correo=${username}&contrasena=${password}`;
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  };

  //FUNCION PARA QUE EL BOTÓN BACK DEL CELULAR DEJE DE RESPONDER Y NO TE MANDE AL SPLASH NUEVAMENTE
  useFocusEffect(
  React.useCallback(() => {
    const onBackPress = () => {
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [])
  );

  //FUNCION DEL BOTÓN INICIAR SESIÓN
  const handleLogin = async () => {
    if(username ===''|| password===''){
      setShowModalVacios(true); // Mostrar modal
    }  else if (!/^[a-zA-Z0-9@.]+$/.test(username)) {
      setShowModalEspeciales(true);
    } else try {
      const response = await login(username, password);
      console.log(response.records.lengh);
      if (response.records.length === 1) { 
        id_usuario = response.records[0].id;
        navigation.navigate('Inicio');
      } else {
        setShowModalNoEncontrado(true);
      }
    } catch (error) {
      setShowModalExterno(true);
    }
  };

  //VISTA
  return (
    <View style={styles.container}>


      {/*INICIO DE SESIÓN*/}
      <LinearGradient
        colors={['#a811fa', '#f0d9fc']}
        start={[0, 0]}
        end={[0, 1]}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}> 

      <Image   //Logo
        source={require('../assets/Mercuriologocorte.png')}
        style={{width: 200, height: 200, alignSelf:'center',marginTop:15, marginBottom: 5}}
      />

      <Image  //LogoText
        source={require('../assets/mercurioTextv4.png')}
        style={{width: 220, height: 46, alignSelf:'center',marginTop: 5, marginBottom: 50}}
      />

      <TextInput style={styles.input} placeholder="Email o nombre de usuario" value={username} onChangeText={setUsername}  />
      <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry  />
      <TouchableOpacity style={styles.botonPersonalizado} onPress={  () =>  handleLogin()} >
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
          }}>INICIAR SESIÓN</Text>

           </LinearGradient> 
      </TouchableOpacity>

      <Text style={{
          color:'white',
          fontSize:14,
          textAlign:'center', 
          textAlignVertical:'center',
          fontWeight: 'bold',
          letterSpacing: .5,
      }}>- - - - - ¿NO TIENES UNA CUENTA? - - - - - </Text>

      <TouchableOpacity style={styles.botonPersonalizado2} 
        onPress={  () =>  navigation.navigate('Registrarse')}>
        <Text style={{
          color:'#940081',
          fontSize:15,
          textAlign:'center', 
          textAlignVertical:'center',
          fontWeight: 'bold',
          letterSpacing: .5,
          }}>REGISTRARSE</Text>
      </TouchableOpacity>

      </LinearGradient> 


      {/*VENTANA MODAL EN CASO DE CAMPOS VACIOS*/}
      <Modal visible={showModalVacios} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Campos vacíos</Text>
            <Text style={styles.modalText}>Por favor, completa todos los campos.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalVacios(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
      
      {/*VENTANA MODAL EN CASO DE CARACTERES ESPECIALES*/}
      <Modal visible={showModalEspeciales} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Caracteres especiales</Text>
            <Text style={styles.modalText}>El usuario solo acepta letras o numeros.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3}
              onPress={() => setShowModalEspeciales(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>

      {/*VENTANA MODAL EN CASO DE USUARIO NO ENCONTRADO*/}
      <Modal visible={showModalNoEncontrado} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Error al iniciar sesión</Text>
            <Text style={styles.modalText}>Revise que su usuario o contraseña sea correcto e intente de nuevo.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3}
              onPress={() => setShowModalNoEncontrado(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>

      {/*VENTANA MODAL EN CASO DE ERROR EXTERNO*/}
      <Modal visible={showModalExterno} animationType="fade" transparent={true}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Oops!</Text>
            <Text style={styles.modalText}>Estamos teniendo problemas para conectarnos, intenta de nuevo más tarde.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3}
              onPress={() => setShowModalExterno(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
       </LinearGradient>
      </Modal>

    </View>
  );
};
export {id_usuario};
export default LoginScreen;
