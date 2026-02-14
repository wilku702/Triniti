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
import { Color, FontFamily } from '../GlobalStyles';

const AccountSettings = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Start' }]
          });
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
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color={Color.textDark} />
            <Text style={styles.menuText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color={Color.textGray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={24} color={Color.textDark} />
            <Text style={styles.menuText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color={Color.textGray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="shield-outline" size={24} color={Color.textDark} />
            <Text style={styles.menuText}>Privacy</Text>
            <Ionicons name="chevron-forward" size={20} color={Color.textGray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color={Color.textDark} />
            <Text style={styles.menuText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={Color.textGray} />
          </TouchableOpacity>
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
    height: '18%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  headerTitle: {
    fontSize: 34,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: 'bold',
    color: Color.colorWhite,
    top: '7%'
  },
  leftIcon: {
    left: '60%',
    top: '18%'
  },
  contentShadow: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: Color.colorWhite,
    shadowColor: Color.colorBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6
  },
  contentArea: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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
