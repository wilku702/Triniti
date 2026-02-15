import React from 'react';
import { Image } from 'expo-image';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Color, FontFamily, Shadows } from '../GlobalStyles';

const PatientButton = React.memo(({ onPress, patientName, image }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.6}
      accessibilityLabel={`View ${patientName}'s profile`}
      accessibilityRole="button">
      <View style={styles.topSection}>
        <Image source={{ uri: image }} style={styles.image} contentFit="cover" />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.text}>{patientName}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    borderColor: Color.colorBlack,
    borderRadius: 12,
    margin: '3%',
    width: '42%',
    height: 120,
    backgroundColor: Color.colorWhite,
    ...Shadows.small
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden'
  },
  topSection: {
    flex: 1,
    backgroundColor: Color.patientCardBlue,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  bottomSection: {
    height: 40,
    backgroundColor: Color.colorWhite,
    justifyContent: 'center',
    borderRadius: 12
  },
  text: {
    left: 10,
    fontSize: 16,
    fontFamily: FontFamily.nunitoMedium,
    fontWeight: '600'
  }
});

export default PatientButton;
