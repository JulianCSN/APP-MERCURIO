import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4B7FF',
  },
  
  input: {
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

});

export default styles;
