import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Color, FontFamily, Shadows } from '../GlobalStyles';
import { useAuth } from '../context/AuthContext';

const AccountSettings = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
            // Auth guard in RootNavigator automatically shows login screen
          } catch {
            Alert.alert('Error', 'Failed to log out. Please try again.');
          }
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            style={styles.leftIcon}
            name="arrow-back"
            size={32}
            color={Color.colorWhite}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.contentShadow}>
      <View style={styles.contentArea}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={80} color={Color.blue} />
          </View>
          <Text style={styles.emailText}>Staff Member</Text>
        </View>

        <View style={styles.menuSection}>
          <View style={[styles.menuItem, styles.menuItemDisabled]}>
            <Ionicons name="person-outline" size={24} color={Color.dividerGray} />
            <Text style={[styles.menuText, styles.menuTextDisabled]}>Edit Profile</Text>
          </View>

          <View style={[styles.menuItem, styles.menuItemDisabled]}>
            <Ionicons name="notifications-outline" size={24} color={Color.dividerGray} />
            <Text style={[styles.menuText, styles.menuTextDisabled]}>Notifications</Text>
          </View>

          <View style={[styles.menuItem, styles.menuItemDisabled]}>
            <Ionicons name="shield-outline" size={24} color={Color.dividerGray} />
            <Text style={[styles.menuText, styles.menuTextDisabled]}>Privacy</Text>
          </View>

          <View style={[styles.menuItem, styles.menuItemDisabled]}>
            <Ionicons name="help-circle-outline" size={24} color={Color.dividerGray} />
            <Text style={[styles.menuText, styles.menuTextDisabled]}>Help & Support</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={Color.errorRed} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.blue
  },
  header: {
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
    fontWeight: 'bold',
    color: Color.colorWhite
  },
  leftIcon: {},
  contentShadow: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: Color.colorWhite,
    ...Shadows.container
  },
  contentArea: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 30,
    paddingHorizontal: 24
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30
  },
  avatarContainer: {
    marginBottom: 12
  },
  emailText: {
    fontSize: 16,
    fontFamily: FontFamily.nunitoMedium,
    color: Color.textGray
  },
  menuSection: {
    marginBottom: 30
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Color.dividerGray
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontFamily: FontFamily.nunitoMedium,
    color: Color.textDark,
    marginLeft: 14
  },
  menuItemDisabled: {
    opacity: 0.4
  },
  menuTextDisabled: {
    color: Color.textGray
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.errorRed
  },
  logoutText: {
    fontSize: 16,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600',
    color: Color.errorRed,
    marginLeft: 8
  }
});

export default AccountSettings;
