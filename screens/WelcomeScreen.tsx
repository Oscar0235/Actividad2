import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();

export default function WelcomeScreen({ navigation }: any) {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        
        navigation.navigate('Login'); 
      })
      .catch((error) => {
       
        console.error('Logout error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
   
      <Button title="Salir" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#76e9f4',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});
