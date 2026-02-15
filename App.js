import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import { ROUTES } from './constants/routes';
import Start from './pages/authorization/Start';
import StaffLogin from './pages/authorization/StaffLogin';
import FamilyLogin from './pages/authorization/FamilyLogin';
import Dashboard from './pages/nurse/Dashboard';
import PatientTabs from './pages/nurse/PatientTabs';
import Activity from './pages/nurse/Activity';
import AccountSettings from './pages/AccountSettings';
import FamilyTabs from './pages/family/FamilyTabs';
import Chat from './pages/Chat';

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
    <ErrorBoundary>
    <AuthProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={ROUTES.START}
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name={ROUTES.START} component={Start} options={{ animation: 'fade' }} />
          <Stack.Screen name={ROUTES.STAFF_LOGIN} component={StaffLogin} options={{ animation: 'fade' }} />
          <Stack.Screen name={ROUTES.FAMILY_LOGIN} component={FamilyLogin} options={{ animation: 'fade' }} />
          <Stack.Screen name={ROUTES.DASHBOARD} component={Dashboard} options={{ animation: 'fade_from_bottom' }} />
          <Stack.Screen name={ROUTES.PATIENT_TABS} component={PatientTabs} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name={ROUTES.ACTIVITY} component={Activity} options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name={ROUTES.ACCOUNT_SETTINGS} component={AccountSettings} options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name={ROUTES.FAMILY_TABS} component={FamilyTabs} options={{ animation: 'fade_from_bottom' }} />
          <Stack.Screen name={ROUTES.CHAT} component={Chat} options={{ animation: 'slide_from_bottom' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
