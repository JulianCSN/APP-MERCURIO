import React, { useEffect, useState, useFocusEffect  } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import styles from '../styles/LoginScreenStyle';

//New import
import { LinearGradient } from "expo-linear-gradient"; 
import ProgressCircle from 'react-native-progress/Circle';
import { ProgressBar } from 'react-native-paper';




const SplashScreen = ({ navigation }) => {
  
  //Tiempo para el splash
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Inicio de sesión');
    }, 1500);
  }, []);



  //Tiempo para la barra de carga, solo es diseño
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(0.25);
    }, 1000);

    const timer2 = setTimeout(() => {
      setProgress(0.5);
    }, 2000);

    const timer3 = setTimeout(() => {
      setProgress(0.75);
    }, 2000);

    const timer4 = setTimeout(() => {
      setProgress(1);
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);



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
        
      <Image
        source={require('../assets/Mercuriologocorte.png')}
        style={{width: 150, height: 150, alignSelf:'center',marginTop:15, marginBottom: 5}}
      />
      </LinearGradient>

     

    </View>
  );
};



export default SplashScreen;

