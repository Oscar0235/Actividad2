import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from './config/Config';

import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true);

export default function RecursosScreen() {
  const [image, setImagen] = useState(' ');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, 'usuarios/' + nombre);

    try {
      const response = await fetch(image);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg',
      });

      console.log('La imagen se subió con éxito');
      Alert.alert('Mensaje', 'La imagen se subió con éxito');

      Alert.alert('Éxito', 'La imagen se subió con éxito');
    } catch (error) {
      console.error(error);

      Alert.alert('Error', 'Error al subir la imagen');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir imagen desde la galería</Text>
      <TouchableOpacity style={styles.button} onPress={() => pickImage()}>
        <Text style={styles.buttonText}>Seleccionar imagen</Text>
      </TouchableOpacity>
      <Image source={{ uri: image }} style={styles.img} />
      <TouchableOpacity style={styles.button} onPress={() => subirImagen('Avatar1')}>
        <Text style={styles.buttonText}>Cargar imagen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#76e9f4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  img: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    borderRadius: 20,
    marginVertical: 20,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#f49c76',
    padding: 10,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000', 
    fontSize: 19,
    fontWeight: 'bold',
  },
});
