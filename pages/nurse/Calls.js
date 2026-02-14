import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { Color, FontFamily } from '../../GlobalStyles';
import { APPOINTMENTS, DEFAULT_APPOINTMENTS } from '../../data/fakeData';

export const CallsContent = ({ patientName }) => {
  const [appointments] = useState(
    APPOINTMENTS[patientName] || DEFAULT_APPOINTMENTS
  );

  const getIconForType = (type) => {
    switch (type) {
      case 'video':
        return 'videocam';
      case 'phone':
        return 'call';
      default:
        return 'people';
    }
  };

  return (
    <ScrollView
      style={styles.contentArea}
      contentContainerStyle={styles.scrollContent}>
      <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
      {appointments.map((appointment) => (
        <View key={appointment.id} style={styles.appointmentCard}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={getIconForType(appointment.type)}
              size={28}
              color={Color.blue}
            />
          </View>
          <View style={styles.appointmentDetails}>
            <Text style={styles.appointmentTitle}>{appointment.title}</Text>
            <Text style={styles.appointmentDate}>{appointment.date}</Text>
            <Text style={styles.appointmentTime}>{appointment.time}</Text>
          </View>
        </View>
      ))}
      {appointments.length === 0 && (
        <Text style={styles.emptyText}>No upcoming appointments</Text>
      )}
    </ScrollView>
  );
};

const Calls = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { patientName } = route.params;

  return (
    <View style={styles.container}>
      <Header
        headerName={patientName}
        leftIconName={'grid'}
        rightIconName={'person-circle-outline'}
      />
      <View style={styles.contentShadow}>
        <CallsContent patientName={patientName} />
      </View>
      <NavBar
        navigation={navigation}
        patientName={patientName}
        specialIcon="calendar"
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: Color.colorWhite,
    shadowColor: Color.colorBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6
  },
  contentArea: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  scrollContent: {
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 120
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600',
    color: Color.colorBlack,
    marginBottom: 20
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: Color.colorWhite,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Color.colorBlack,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Color.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14
  },
  appointmentDetails: {
    flex: 1,
    justifyContent: 'center'
  },
  appointmentTitle: {
    fontSize: 17,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600',
    color: Color.textDark,
    marginBottom: 4
  },
  appointmentDate: {
    fontSize: 14,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray,
    marginBottom: 2
  },
  appointmentTime: {
    fontSize: 14,
    fontFamily: FontFamily.nunitoMedium,
    color: Color.blue
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray,
    textAlign: 'center',
    marginTop: 40
  }
});

export default Calls;
