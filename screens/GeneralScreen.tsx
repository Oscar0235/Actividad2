import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from './config/Config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function GeneralScreen() {
  const [imagen, setImagen] = useState(' ');

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, 'test/' + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg',
      });

      console.log('La imagen se subió con éxito');

      // Obtiene la URL de la imagen
      const imageURL = await getDownloadURL(storageRef);
      console.log('URL de desacarga de la imagen', imageURL);

      // Muestra el mensaje de éxito
      Alert.alert('Éxito', 'La imagen se subió con éxito');
    } catch (error) {
      console.error(error);

      // Muestra el mensaje de error
      Alert.alert('Error', 'Error al subir la imagen');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir una foto desde la cámara</Text>
      <TouchableOpacity onPress={() => pickImage()} style={styles.button}>
        <Text style={styles.buttonText}>Abrir Cámara</Text>
      </TouchableOpacity>
      <Image source={{ uri: imagen }} style={styles.img} />
      <TouchableOpacity onPress={() => subirImagen('Avatar2')} style={styles.button}>
        <Text style={styles.buttonText}>Subir imagen</Text>
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
    backgroundColor: '#f4b062',
    padding: 10,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
