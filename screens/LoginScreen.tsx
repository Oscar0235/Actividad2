import { Alert, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config/Config';

export default function LoginScreen({ navigation }: any) {
  const [correo, Setcorreo] = useState('');
  const [contrasenia, Setcontrasenia] = useState('');

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Drawer_Welcome');
      
        Setcorreo('');
        Setcontrasenia('');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case 'auth/invalid-credential':
            Alert.alert('Error', 'Credenciales Incorrectas');
            break;

          case 'auth/missing-password':
            Alert.alert('Error', 'Credenciales Perdidas');
            break;

          default:
            Alert.alert('Error', errorMessage);
            break;
        }
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(texto) => Setcorreo(texto)} 
        value={correo} 
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        onChangeText={(texto) => Setcontrasenia(texto)} 
        value={contrasenia} 
      />

      <Button title="Ingresar" onPress={() => login()} />

      <Text style={styles.Link} onPress={() => navigation.navigate('Registro')}>
        👉 Regístrate aquí 👈
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7fca6',
    padding: 20,
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    borderWidth: 3,
    paddingHorizontal: 10,
    borderColor: '#fb2d2d',
  },
  input: {
    height: 50,
    borderColor: '#000000eb',
    borderWidth: 5,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 16,
    width: '100%',
    fontSize: 16,
  },
  Link: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
});
