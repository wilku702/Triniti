import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Color, FontFamily } from '../GlobalStyles';

const ErrorState = ({ message = 'Something went wrong.', onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry} activeOpacity={0.6}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  text: {
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.errorRed,
    textAlign: 'center'
  },
  retryButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: Color.blue,
    borderRadius: 12
  },
  retryText: {
    color: Color.colorWhite,
    fontSize: 16,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600'
  }
});

export default ErrorState;
