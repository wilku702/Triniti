import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { Color } from '../GlobalStyles';

const NavBar = ({ navigation, patientName, patientId, specialIcon, onTabChange }) => {
  const getIconColor = (iconName) => {
    return iconName === specialIcon ? Color.navActive : Color.navDefault;
  };

  const handlePress = (tabName, routeName) => {
    if (onTabChange) {
      onTabChange(tabName);
    } else {
      navigation.navigate(routeName, { patientName, patientId });
    }
  };

  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity
        onPress={() => handlePress('PatientProfile', 'PatientProfile')}
        activeOpacity={0.6}
        accessibilityLabel="Home"
        accessibilityRole="tab">
        <FontAwesome6 name="house" size={40} color={getIconColor('house')} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('Calls', 'Calls')}
        activeOpacity={0.6}
        accessibilityLabel="Appointments"
        accessibilityRole="tab">
        <Ionicons name="calendar" size={40} color={getIconColor('calendar')} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('Mood', 'Mood')}
        activeOpacity={0.6}
        accessibilityLabel="Mood tracking"
        accessibilityRole="tab">
        <FontAwesome6
          name="chart-line"
          size={40}
          color={getIconColor('chart-line')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('EditInfo', 'EditInfo')}
        activeOpacity={0.6}
        accessibilityLabel="Patient info"
        accessibilityRole="tab">
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
