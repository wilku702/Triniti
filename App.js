import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import Start from './pages/authorization/Start';
import StaffLogin from './pages/authorization/StaffLogin';
import FamilyLogin from './pages/authorization/FamilyLogin';
import Dashboard from './pages/nurse/Dashboard';
import PatientTabs from './pages/nurse/PatientTabs';
import Activity from './pages/nurse/Activity';
import AccountSettings from './pages/AccountSettings';
import FamPatientProfile from './pages/family/FamPatientProfile';

const Stack = createNativeStackNavigator();

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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{ headerShown: false, animation: 'default' }}>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="StaffLogin" component={StaffLogin} />
        <Stack.Screen name="FamilyLogin" component={FamilyLogin} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="PatientTabs" component={PatientTabs} />
        <Stack.Screen name="Activity" component={Activity} />
        <Stack.Screen name="AccountSettings" component={AccountSettings} />
        <Stack.Screen name="FamPatientProfile" component={FamPatientProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
