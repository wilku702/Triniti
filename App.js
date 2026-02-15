import * as React from 'react';
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
    <ErrorBoundary>
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={ROUTES.START}
          screenOptions={{ headerShown: false, animation: 'default' }}>
          <Stack.Screen name={ROUTES.START} component={Start} />
          <Stack.Screen name={ROUTES.STAFF_LOGIN} component={StaffLogin} />
          <Stack.Screen name={ROUTES.FAMILY_LOGIN} component={FamilyLogin} />
          <Stack.Screen name={ROUTES.DASHBOARD} component={Dashboard} />
          <Stack.Screen name={ROUTES.PATIENT_TABS} component={PatientTabs} />
          <Stack.Screen name={ROUTES.ACTIVITY} component={Activity} />
          <Stack.Screen name={ROUTES.ACCOUNT_SETTINGS} component={AccountSettings} />
          <Stack.Screen name={ROUTES.FAM_PATIENT_PROFILE} component={FamPatientProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
