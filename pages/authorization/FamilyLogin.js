import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color, FontFamily } from '../../GlobalStyles';

const FamilyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('FamPatientProfile');
  };

  const handleForgotPassword = () => {
    Alert.alert('Coming Soon', 'Password reset will be available in a future update.');
  };

  const handleCreateAccount = () => {
    Alert.alert('Coming Soon', 'Account creation will be available in a future update.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Family Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.linkText}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.linkText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Color.colorWhite
  },
  title: {
    fontSize: 24,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: 'bold',
    marginBottom: 30
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: FontFamily.nunitoRegular
  },
  loginButton: {
    width: '100%',
    backgroundColor: Color.buttonBlue,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20
  },
  loginButtonText: {
    color: Color.colorWhite,
    fontSize: 18,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: 'bold'
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  linkText: {
    color: Color.blue,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.nunitoRegular
  }
});

export default FamilyLogin;
