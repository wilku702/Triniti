import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color, FontFamily } from '../GlobalStyles';
import { ROUTES } from '../constants/routes';

const ICON_LABELS = {
  'grid': 'Go to dashboard',
  'chatbubble-ellipses': 'Open chat',
  'person-circle-outline': 'Account settings',
  'log-out-outline': 'Log out',
};

const Header = ({ headerName, leftIconName, rightIconName, onLeftPress, onRightPress }) => {
  const navigation = useNavigation();

  const handleLeftPress = onLeftPress || (() => navigation.navigate(ROUTES.DASHBOARD));
  const handleRightPress = onRightPress || (() => navigation.navigate(ROUTES.ACCOUNT_SETTINGS));

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={handleLeftPress}
        activeOpacity={0.6}
        accessibilityLabel={ICON_LABELS[leftIconName] || 'Navigate'}
        accessibilityRole="button">
        <Ionicons
          style={styles.leftIcon}
          name={leftIconName}
          size={32}
          color={Color.colorWhite}
        />
      </TouchableOpacity>

      <Text style={styles.headerTitle} accessibilityRole="header">
        {' '}{headerName}{' '}
      </Text>

      <TouchableOpacity
        onPress={handleRightPress}
        activeOpacity={0.6}
        accessibilityLabel={ICON_LABELS[rightIconName] || 'Settings'}
        accessibilityRole="button">
        <Ionicons
          style={styles.rightIcon}
          name={rightIconName}
          size={40}
          color={Color.colorWhite}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Color.blue,
    height: '14%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: '6%'
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: FontFamily.nunitoBold,
    color: Color.colorWhite,
    fontWeight: 'bold'
  },
  leftIcon: {},
  rightIcon: {}
});

export default Header;
