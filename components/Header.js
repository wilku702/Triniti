import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color, FontFamily } from '../GlobalStyles';

const Header = ({ headerName, leftIconName, rightIconName }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Ionicons
          style={styles.leftIcon}
          name={leftIconName}
          size={32}
          color={Color.colorWhite}
        />
      </TouchableOpacity>

      <Text style={styles.headerTitle}> {headerName} </Text>

      <TouchableOpacity onPress={() => navigation.navigate('AccountSettings')}>
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
    height: '18%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  headerTitle: {
    fontSize: 34,
    fontFamily: FontFamily.nunitoBold,
    color: Color.colorWhite,
    fontWeight: 'bold',
    top: '7%'
  },
  leftIcon: {
    left: '60%',
    top: '18%'
  },
  rightIcon: {
    right: '60%',
    top: '18%'
  }
});

export default Header;
