import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import Header from '../../components/Header';
import { Color, FontFamily } from '../../GlobalStyles';
import { COLLECTIONS } from '../../constants/collections';

const Activity = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    activityDocumentId,
    activityTitle,
    activityTime,
    activityImage,
    patientName,
    patientId
  } = route.params;

  const handleDelete = () => {
    Alert.alert(
      'Delete Activity',
      `Are you sure you want to delete "${activityTitle}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(
                doc(db, COLLECTIONS.USERS, patientId, COLLECTIONS.ACTIVITIES, activityDocumentId)
              );
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting activity:', error);
              Alert.alert('Error', 'Failed to delete activity. Please try again.');
            }
          }
        }
      ]
    );
  };

  const handleEdit = () => {
    Alert.alert('Coming Soon', 'Activity editing will be available in a future update.');
  };

  return (
    <View style={styles.container}>
      <Header
        headerName={patientName || 'Activity'}
        leftIconName={'grid'}
        rightIconName={'person-circle-outline'}
      />
      <ScrollView style={styles.contentArea}>
        {activityImage && (
          <Image
            source={typeof activityImage === 'string' ? { uri: activityImage } : activityImage}
            style={styles.heroImage}
          />
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{activityTitle}</Text>
          <View style={styles.timeRow}>
            <MaterialIcons name="access-time" size={20} color={Color.textGray} />
            <Text style={styles.timeText}>{activityTime}</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionLabel}>Details</Text>
            <Text style={styles.descriptionText}>
              Activity scheduled for {patientName || 'the patient'}.
            </Text>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <MaterialIcons name="edit" size={20} color={Color.colorWhite} />
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <MaterialIcons name="delete" size={20} color={Color.colorWhite} />
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.blue
  },
  contentArea: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: Color.colorWhite
  },
  heroImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  detailsContainer: {
    padding: 24
  },
  title: {
    fontSize: 28,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: 'bold',
    color: Color.colorBlack,
    marginBottom: 12
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  timeText: {
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray,
    marginLeft: 8
  },
  sectionLabel: {
    fontSize: 18,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600',
    color: Color.textDark,
    marginBottom: 8
  },
  descriptionContainer: {
    marginBottom: 32
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray,
    lineHeight: 24
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Color.blue,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Color.errorRed,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  buttonText: {
    color: Color.colorWhite,
    fontSize: 16,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600'
  }
});

export default Activity;
