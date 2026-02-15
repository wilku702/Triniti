import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from '../GlobalStyles';

const Divider = ({ style }) => {
  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 2,
    backgroundColor: Color.dividerGray,
    marginVertical: 10
  }
});

export default Divider;
