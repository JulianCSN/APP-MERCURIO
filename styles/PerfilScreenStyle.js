import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '90%',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  picker: {
    // Estilos para el selector
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 110,  // Ajusta el espacio lateral (por ejemplo, 5 unidades)
    marginVertical: 10,
    borderColor: '#ccc',  
  
  },

  button1: {
    height: 35,
    width: '55%',
    backgroundColor: 'purple',
    marginTop: 5,
    borderRadius: 7,
    justifyContent: 'center',
    marginBottom: 30,
  },

  button2: {
    height: 50,
    width: '90%',
    backgroundColor: 'purple',
    marginTop: 10,
    borderRadius: 7,
    justifyContent: 'center',
    marginBottom: 15,
  },

  button3: {
    height: 50,
    width: '90%',
    backgroundColor: 'purple',
    marginTop: 5,
    borderRadius: 7,
    justifyContent: 'center',
    marginBottom: 15,
  },

  texto: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },

  input2: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: 'transparent',
    //borderBottomColor: 'red',
    width: '90%',
    backgroundColor: '#E4B7FF',
    borderRadius:7,
    color: '#4f4f4f',
    caretColor: '#4f4f4f',
  },

  

  botonPersonalizado: {
    height: 50,
    width: '90%',
    backgroundColor: 'purple',
    marginTop: 5,
    borderRadius: 7,
    justifyContent: 'center',
    marginBottom: 30,
  },

  botonPersonalizado2: {
    marginTop: 10,
   
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalContent: {
    backgroundColor: '#E4B7FF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },

  botonPersonalizado3: {
    backgroundColor: 'purple',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 130,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },


  // NUEVOS DISEÑOS PARA DETALLEPRODUCTO

 image2: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },

  txt1: {
    paddingTop: 15, 
    paddingBottom: 5,
    fontFamily: 'Verdana', // Cambia la fuente según tu preferencia
    fontWeight: 'bold', // Hace que el texto sea negrita
    fontSize: 28,  // Tamaño de la fuente
    color: '#333', // Color del texto, puedes cambiarlo
    textTransform: 'uppercase', // Convierte el texto en mayúsculas
    letterSpacing: 1, // Espaciado entre letras
    textAlign: 'center',   
    // Puedes agregar más propiedades según tus necesidades
  },

  txt2: {
    paddingTop: 0, 
    paddingBottom: 0,
    fontFamily: 'Verdana', // Cambia la fuente según tu preferencia
    fontWeight: 'bold', // Hace que el texto sea negrita
    fontSize: 12,  // Tamaño de la fuente
    color: '#333', // Color del texto, puedes cambiarlo
    letterSpacing: 0, // Espaciado entre letras
    textAlign: 'center',   
    // Puedes agregar más propiedades según tus necesidades
  },

  txt3: {
    paddingTop: 45, 
    paddingBottom: 0,
    fontFamily: 'Verdana', // Cambia la fuente según tu preferencia
    fontWeight: 'bold', // Hace que el texto sea negrita
    fontSize: 14,  // Tamaño de la fuente
    color: '#333', // Color del texto, puedes cambiarlo
    letterSpacing: 0, // Espaciado entre letras
    textAlign: 'center',   
    // Puedes agregar más propiedades según tus necesidades
  },

  txt4: {
    paddingTop: 5, 
    paddingBottom: 0,
    fontFamily: 'Verdana', // Cambia la fuente según tu preferencia
    fontWeight: 'bold', // Hace que el texto sea negrita
    fontSize: 12,  // Tamaño de la fuente
    color: '#333', // Color del texto, puedes cambiarlo
    letterSpacing: 0, // Espaciado entre letras
    textAlign: 'center',   
    // Puedes agregar más propiedades según tus necesidades
  },

  socialIconsContainer: {
    flexDirection: 'row', // Alinea los elementos horizontalmente
    justifyContent: 'center', // Centra los elementos horizontalmente
    marginTop: 10, // Agrega margen superior según sea necesario
  },









  scrollView: {
    
  },
 
});

export default styles;
