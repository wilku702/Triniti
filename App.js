import * as React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Color } from './GlobalStyles';

import Start from './pages/authorization/Start';
import StaffLogin from './pages/authorization/StaffLogin';
import FamilyLogin from './pages/authorization/FamilyLogin';
import Dashboard from './pages/nurse/Dashboard';
import PatientProfile from './pages/nurse/PatientProfile';
import Activity from './pages/nurse/Activity';
import Calls from './pages/nurse/Calls';
import Mood from './pages/nurse/Mood';
import EditInfo from './pages/nurse/EditInfo';
import AccountSettings from './pages/AccountSettings';
import FamPatientProfile from './pages/family/FamPatientProfile';

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator
    initialRouteName="Start"
    screenOptions={{ headerShown: false, animation: 'default' }}>
    <AuthStack.Screen name="Start" component={Start} />
    <AuthStack.Screen name="StaffLogin" component={StaffLogin} />
    <AuthStack.Screen name="FamilyLogin" component={FamilyLogin} />
  </AuthStack.Navigator>
);

const AppNavigator = () => (
  <AppStack.Navigator
    initialRouteName="Dashboard"
    screenOptions={{ headerShown: false, animation: 'default' }}>
    {/* Nurse View */}
    <AppStack.Screen name="Dashboard" component={Dashboard} />
    <AppStack.Screen name="PatientProfile" component={PatientProfile} />
    <AppStack.Screen name="Activity" component={Activity} />
    <AppStack.Screen name="Calls" component={Calls} />
    <AppStack.Screen name="Mood" component={Mood} />
    <AppStack.Screen name="EditInfo" component={EditInfo} />
    <AppStack.Screen name="AccountSettings" component={AccountSettings} />

    {/* Family View */}
    <AppStack.Screen name="FamPatientProfile" component={FamPatientProfile} />
  </AppStack.Navigator>
);

const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Color.blue} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const App = () => {
  const [fontsLoaded, error] = useFonts({
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Medium': require('./assets/fonts/Nunito-Medium.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf')
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.colorWhite
  }
});

export default App;
