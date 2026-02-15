import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { FamActivitiesContent } from './FamPatientProfile';
import { CallsContent } from '../nurse/Calls';
import { MoodContent } from '../nurse/Mood';
import { Color, Shadows } from '../../GlobalStyles';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';

const FAMILY_TABS = [
  { name: 'Activities', icon: 'house', iconSet: 'FontAwesome6', label: 'Activities' },
  { name: 'Appointments', icon: 'calendar', iconSet: 'Ionicons', label: 'Appointments' },
  { name: 'Mood', icon: 'chart-line', iconSet: 'FontAwesome6', label: 'Mood tracking' },
];

const TAB_TO_ICON = Object.fromEntries(FAMILY_TABS.map((t) => [t.name, t.icon]));

const FamilyTabs = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { patientName, patientId } = route.params;
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Activities');

  const handleLogout = async () => {
    try {
      await logout();
      // Auth guard in RootNavigator automatically shows login screen
    } catch {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Activities':
        return <FamActivitiesContent patientName={patientName} patientId={patientId} />;
      case 'Appointments':
        return <CallsContent patientName={patientName} patientId={patientId} />;
      case 'Mood':
        return <MoodContent patientName={patientName} patientId={patientId} />;
      default:
        return <FamActivitiesContent patientName={patientName} patientId={patientId} />;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        headerName="Family View"
        leftIconName="chatbubble-ellipses"
        rightIconName="log-out-outline"
        onLeftPress={() => navigation.navigate(ROUTES.CHAT, { patientName, patientId })}
        onRightPress={handleLogout}
      />
      <View style={styles.contentShadow}>
        {renderContent()}
      </View>
      <NavBar
        navigation={navigation}
        patientName={patientName}
        patientId={patientId}
        specialIcon={TAB_TO_ICON[activeTab]}
        onTabChange={setActiveTab}
        tabs={FAMILY_TABS}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.blue
  },
  contentShadow: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: Color.colorWhite,
    ...Shadows.container
  }
});

export default FamilyTabs;
