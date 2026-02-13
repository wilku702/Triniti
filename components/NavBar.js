import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { Color } from '../GlobalStyles';

const NavBar = ({ navigation, patientName, specialIcon }) => {
  const getIconColor = (iconName) => {
    return iconName === specialIcon ? Color.navActive : Color.navDefault;
  };

  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PatientProfile', { patientName })}>
        <FontAwesome6 name="house" size={40} color={getIconColor('house')} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Calls', { patientName })}>
        <Ionicons name="calendar" size={40} color={getIconColor('calendar')} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Mood', { patientName })}>
        <FontAwesome6
          name="chart-line"
          size={40}
          color={getIconColor('chart-line')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('EditInfo', { patientName })}>
        <Ionicons
          name="person-sharp"
          size={40}
          color={getIconColor('person-sharp')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '12%',
    backgroundColor: Color.colorWhite,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: Color.colorBlack,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10
  }
});

export default NavBar;
