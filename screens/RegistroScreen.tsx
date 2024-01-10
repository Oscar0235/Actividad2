import { Alert, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config/Config';

export default function RegistroScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  function register() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
  
        clearFields();
        navigation.navigate("Login");
  
        
        Alert.alert('Éxito', 'Registro exitoso');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        switch (errorCode) {
          case 'auth/weak-password':
            Alert.alert('Error', 'La contraseña es débil. Debe tener al menos 6 caracteres.');
            break;
  
          case 'auth/email-already-in-use':
            Alert.alert('Error', 'La dirección de correo electrónico ya está en uso por otra cuenta.');
            break;
  
          default:
            Alert.alert('Error', errorMessage);
            break;
        }
      });
  }

  function clearFields() {
    setCorreo('');
    setContrasenia('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder='Ingresar email'
        keyboardType='email-address'
        onChangeText={(texto) => setCorreo(texto)}
        value={correo}
      />
      <TextInput
        style={styles.input}
        placeholder='Ingresar contraseña'
        onChangeText={(texto) => setContrasenia(texto)}
        value={contrasenia}
        secureTextEntry={true}
      />

      <Button title='Registrarte' onPress={() => register()} />

      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>👈 Volver al inicio de sesión</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#d7fca6',
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    borderWidth: 3,
    paddingHorizontal: 10,
    borderColor: '#fb2d2d',
  },
  input: {
    height: 40,
    width: '90%',
    borderColor: '#000000eb',
    borderWidth: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    
  },
  link: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
});
