import React, { useState } from 'react';
import { View, TextInput, Button, Modal, Text, Picker, TouchableOpacity } from 'react-native';
import styles from '../styles/SigninScreenStyle';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

//New import
import { LinearGradient } from "expo-linear-gradient"; 
import { BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



let id_usuario2 = null;

const SigninScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('');
  const [passwordcheck, setPasswordCheck] = useState('');
  const [showModalVacios, setShowModalVacios] = useState(false); // visibilidad desactivada, campos vacios
  const [showModalEspeciales, setShowModalEspeciales] = useState(false); //Visibilidad desactivada caracteres
  const [showModalExterno, setShowModalExterno] = useState(false); //Visibilidad desactivada error externo 
  const [showModalContra, setShowModalContra] = useState(false);
  const [showModalCorrecto, setShowModalCorrecto] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);
  //FUNCION PARA LA VALIDACION EN LA API
  const register = async (username, email, password, state) => {
    const url = `https://mercurio-donaciones.000webhostapp.com/api/api.php?comando=signin&usuario=${username}&correo=${email}&contrasena=${password}&estado=${state}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const navigation = useNavigation();

  const estados = [
    { label: 'Colima', value: 'Colima' },
    { label: 'Jalisco', value: 'Jalisco' },
    { label: 'Michoacán', value: 'Michoacán' },
  ];

  const handleRegister = async () => {
    if(username === '' || email === '' || password === '' || state === ''){
      setShowModalVacios(true); // mostramos la modal si los campos están vacíos
    }else if(!/^[a-zA-Z0-9]+$/.test(username)){
      setShowModalEspeciales(true);
    }else if(passwordcheck !== password){
      setShowModalContra(true);
    }else if(!/\S+@\S+.\S+/.test(email)){
      setShowModalEmail(true); // mostramos la modal si el formato del correo electrónico es inválido
    }else{
      try {
        const response = await register(username, email, password, state);
        if (response.status === 'ok') {
          setShowModalCorrecto(true);
          id_usuario2 = response.id_usuario;
        }
      } catch (error) {
        setShowModalExterno(true);
      }
    }
  };

  
  return (
    <View style={styles.container}>
    <LinearGradient
        colors={['#a811fa', '#f0d9fc']}
        start={[0, 0]}
        end={[0, 1]}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}> 
        
      <TextInput style={styles.input} placeholder="Usuario" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmar contraseña" value={passwordcheck} onChangeText={setPasswordCheck} secureTextEntry />

      <View style={{ alignItems: 'center'}}>
      <RNPickerSelect
        onValueChange={(value) => setState(value)}
        placeholder={{ label: 'Seleccione su estado', value: null }}
        items={estados}
        style={{
          inputIOS: {
            fontSize: 14,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'transparent',
            borderRadius: 7,
            color: '#4f4f4f',
            paddingRight: 184,
            paddingLeft: 184,
            backgroundColor: '#ecd2fc',
            marginTop: 15,
            marginBottom: 20,
          },
          inputAndroid: {
            fontSize: 14,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'transparent',
            borderRadius: 7,
            color: '#4f4f4f',
            paddingRight: 184,
            paddingLeft: 184,
            backgroundColor: '#ecd2fc',
            marginTop: 15,
            marginBottom: 20,
          },
          placeholder: {
            color: '#4f4f4f'
          }
        }}
        placeholderTextColor="gray"
      />
      </View>

      <TouchableOpacity style={styles.botonPersonalizado} onPress={  () =>  handleRegister()} >
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
          }}>REGISTRARME</Text>

        </LinearGradient> 
      </TouchableOpacity>
      </LinearGradient> 
      
      {/*VENTANA MODAL EN CASO DE CAMPOS VACIOS*/}
      <Modal visible={showModalVacios} animationType="fade" transparent={true}>
      <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Campos vacíos</Text>
            <Text style={styles.modalText}>Por favor, completa todos los campos.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalVacios(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
        </LinearGradient>
      </Modal>
      
      {/*VENTANA MODAL EN CASO DE CARACTERES ESPECIALES*/}
      <Modal visible={showModalEspeciales} animationType="fade" transparent={true}>
      <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Caracteres especiales</Text>
            <Text style={styles.modalText}>Los campos no aceptan caracteres especiales</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalEspeciales(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
        </LinearGradient>
      </Modal>

      {/*VENTANA MODAL EN CASO DE CONTRASEÑAS DIFERENTES*/}
      <Modal visible={showModalContra} animationType="fade" transparent={true}>
      <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Intenta de nuevo</Text>
            <Text style={styles.modalText}>Las contraseñas no coinciden.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalContra(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
        </LinearGradient>
      </Modal>

      {/*VENTANA MODAL EN CASO DE ERROR EXTERNO*/}
      <Modal visible={showModalExterno} animationType="fade" transparent={true}>
      <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Oops!</Text>
            <Text style={styles.modalText}>Estamos teniendo problemas para conectarnos, intenta de nuevo más tarde.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalExterno(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
        </LinearGradient>
      </Modal>

      {/*VENTANA MODAL EN CASO DE ERROR FORMATO EMAIL*/}
      <Modal visible={showModalEmail} animationType="fade" transparent={true}>
      <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Email incorrecto!</Text>
            <Text style={styles.modalText}>Revise que el email ingresado tenga un formato correcto.</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => setShowModalEmail(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
        </LinearGradient>
      </Modal>

      {/*VENTANA MODAL USUARIO REGISTRADO*/}
      <Modal visible={showModalCorrecto} animationType="fade" transparent={true}>
      <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']} style={styles.modalContainer}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>!Usuario registrado!</Text>
            <Text style={styles.modalText}>Tu usuario fue registrado con éxito</Text>
            <TouchableOpacity 
              style={styles.botonPersonalizado3} 
              onPress={() => {setShowModalCorrecto(false); navigation.navigate('Inicio de sesión'); }}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
        </LinearGradient>
      </Modal>

    </View>
  );
};
export {id_usuario2};
export default SigninScreen;