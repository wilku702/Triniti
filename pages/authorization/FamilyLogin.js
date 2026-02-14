import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../Firebase';
import { Color, FontFamily } from '../../GlobalStyles';

const FamilyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Required', 'Please enter both email and password.');
      return;
    }

    setLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);

      // After auth succeeds, look up Betty Johnson's patient record
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('name', '==', 'Betty Johnson'));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const patientDoc = snapshot.docs[0];
        navigation.navigate('FamPatientProfile', {
          patientName: patientDoc.data().name,
          patientId: patientDoc.id
        });
      } else {
        Alert.alert('Error', 'Could not find patient data.');
      }
    } catch (error) {
      let message = 'Login failed. Please try again.';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        message = 'Invalid email or password.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many failed attempts. Please try again later.';
      }
      Alert.alert('Login Failed', message);
    } finally {
      setLoggingIn(false);
    }
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
        style={[styles.loginButton, loggingIn && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loggingIn}>
        {loggingIn ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
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
