import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import Firebase from '../firebaseConfig'

const HomeScreen = () => {

  const {user, logout} = useContext(AuthContext);

  console.log(user)

  Firebase.database().ref(`/Admin/${user.uid}`).set({
    id:user.uid,
    email:user.email,
    password:user.providerId,
    displayName:user.displayName,
    phoneNumber:user.phoneNumber,
    })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {user.uid}</Text>
      
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333'
  }
});