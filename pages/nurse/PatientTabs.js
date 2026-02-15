import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { PatientProfileContent } from './PatientProfile';
import { CallsContent } from './Calls';
import { MoodContent } from './Mood';
import { EditInfoContent } from './EditInfo';
import { Color, Shadows } from '../../GlobalStyles';
import { ROUTES } from '../../constants/routes';

const TAB_TO_ICON = {
  PatientProfile: 'house',
  Calls: 'calendar',
  Mood: 'chart-line',
  EditInfo: 'person-sharp'
};

const PatientTabs = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { patientName, patientId } = route.params;
  const [activeTab, setActiveTab] = useState('PatientProfile');

  const formatShortName = (fullName) => {
    const parts = fullName.split(' ');
    if (parts.length < 2) return fullName;
    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'PatientProfile':
        return <PatientProfileContent patientName={patientName} patientId={patientId} navigation={navigation} />;
      case 'Calls':
        return <CallsContent patientName={patientName} patientId={patientId} />;
      case 'Mood':
        return <MoodContent patientName={patientName} patientId={patientId} />;
      case 'EditInfo':
        return <EditInfoContent patientName={patientName} patientId={patientId} />;
      default:
        return <PatientProfileContent patientName={patientName} patientId={patientId} navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        headerName={formatShortName(patientName)}
        leftIconName={'chatbubble-ellipses'}
        rightIconName={'person-circle-outline'}
        onLeftPress={() => navigation.navigate(ROUTES.CHAT, { patientName, patientId })}
      />
      <View style={styles.contentShadow}>
        {renderContent()}
      </View>
      <NavBar
        navigation={navigation}
        patientName={patientName}
        specialIcon={TAB_TO_ICON[activeTab]}
        onTabChange={setActiveTab}
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

export default PatientTabs;
