import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { Color } from '../GlobalStyles';

const DEFAULT_TABS = [
  { name: 'PatientProfile', icon: 'house', iconSet: 'FontAwesome6', label: 'Home' },
  { name: 'Calls', icon: 'calendar', iconSet: 'Ionicons', label: 'Appointments' },
  { name: 'Mood', icon: 'chart-line', iconSet: 'FontAwesome6', label: 'Mood tracking' },
  { name: 'EditInfo', icon: 'person-sharp', iconSet: 'Ionicons', label: 'Patient info' },
];

const NavBar = ({ navigation, patientName, patientId, specialIcon, onTabChange, tabs = DEFAULT_TABS }) => {
  const getIconColor = (iconName) => {
    return iconName === specialIcon ? Color.navActive : Color.navDefault;
  };

  const handlePress = (tabName) => {
    if (onTabChange) {
      onTabChange(tabName);
    } else {
      navigation.navigate(tabName, { patientName, patientId });
    }
  };

  return (
    <View style={styles.navbarContainer}>
      {tabs.map((tab) => {
        const IconComponent = tab.iconSet === 'FontAwesome6' ? FontAwesome6 : Ionicons;
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => handlePress(tab.name)}
            activeOpacity={0.6}
            accessibilityLabel={tab.label}
            accessibilityRole="tab">
            <IconComponent name={tab.icon} size={40} color={getIconColor(tab.icon)} />
          </TouchableOpacity>
        );
      })}
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
