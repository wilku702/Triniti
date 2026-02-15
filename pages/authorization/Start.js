import * as React from 'react';
import { Image } from 'expo-image';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Border, Color, FontFamily, FontSize } from '../../GlobalStyles';
import { ROUTES } from '../../constants/routes';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const StartPage = ({ navigation }) => {
  const handleStaffLoginPress = () => {
    navigation.navigate(ROUTES.STAFF_LOGIN);
  };

  const handleFamilyLoginPress = () => {
    navigation.navigate(ROUTES.FAMILY_LOGIN);
  };

  return (
    <View style={styles.startPage}>
      <Image
        style={styles.nursingHomeBro1}
        contentFit="cover"
        source={require('../../assets/start/welcome_image.png')}
      />
      <View style={styles.screenBodyContent}>
        <LinearGradient
          style={styles.screenBodyContentChild}
          locations={[0, 1]}
          colors={[Color.gradientStart, Color.gradientEnd]}
        />
        <Image
          style={styles.whitelogoIcon}
          contentFit="cover"
          source={require('../../assets/start/whitelogo.png')}
        />
      </View>
      <TouchableOpacity
        style={[styles.familyLoginButton, styles.loginLayout]}
        onPress={handleFamilyLoginPress}>
        <Text style={styles.loginText}>Family Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.staffLoginButton, styles.loginLayout]}
        onPress={handleStaffLoginPress}>
        <Text style={styles.loginText}>Staff Login</Text>
      </TouchableOpacity>
      <Text style={styles.welcome}>Welcome</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  startPage: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    overflow: 'hidden',
    width: '100%'
  },
  nursingHomeBro1: {
    top: 0,
    left: 0,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    position: 'absolute',
    overflow: 'hidden'
  },
  screenBodyContent: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.375,
    left: 0,
    right: 0,
    bottom: 0
  },
  screenBodyContentChild: {
    position: 'absolute',
    top: '3.5%',
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 8,
    elevation: 8,
    shadowOpacity: 1,
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    backgroundColor: Color.colorWhite
  },
  whitelogoIcon: {
    position: 'absolute',
    bottom: '7%',
    left: '33%',
    width: '34%',
    height: '8%',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'hidden'
  },
  loginLayout: {
    borderRadius: Border.br_md,
    width: '52%',
    height: 48,
    position: 'absolute',
    alignSelf: 'center',
    left: '24%',
    overflow: 'hidden',
    backgroundColor: Color.colorWhite,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    color: Color.colorBlack,
    fontFamily: FontFamily.nunitoMedium,
    fontWeight: '500',
    fontSize: FontSize.size_base,
    textAlign: 'center'
  },
  staffLoginButton: {
    top: '60%'
  },
  familyLoginButton: {
    top: '68%'
  },
  welcome: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.51,
    alignSelf: 'center',
    fontSize: FontSize.size_welcome,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.colorWhite,
    textAlign: 'center'
  }
});

export default StartPage;
