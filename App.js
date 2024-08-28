import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './pages/authorization/Start';
import StaffLogin from './pages/authorization/StaffLogin';
import FamilyLogin from './pages/authorization/FamilyLogin';
import Dashboard from './pages/nurse/Dashboard';
import PatientProfile from './pages/nurse/PatientProfile';
import { useFonts } from 'expo-font';

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

        {/* Nurses View */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="PatientProfile" component={PatientProfile} />

        {/* Family View */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
