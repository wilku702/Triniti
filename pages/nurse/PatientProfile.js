import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import ActivityCard from '../../components/ActivityCard';
import AddActivityModal from '../../components/AddActivityModal';
import Divider from '../../components/Divider';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Color, FontFamily, Shadows } from '../../GlobalStyles';
import EmptyState from '../../components/EmptyState';
import { ROUTES } from '../../constants/routes';
import { resolveImage } from '../../data/activityImages';
import useActivities from '../../hooks/useActivities';
import { addActivity, createTimestamp } from '../../services/firestore';
import { formatDate, getDateKey, getTodayKey, getFirstName } from '../../utils/dateFormatters';

export const PatientProfileContent = ({ patientName, patientId, navigation }) => {
  const { activitiesGroupedByDate, loading, error, refetch, addToGroupedState } = useActivities(patientId);
  const [modalVisible, setModalVisible] = useState(false);

  const todayStr = getTodayKey();

  const handleAddActivity = async (newActivity) => {
    try {
      const dateTimestamp = createTimestamp(new Date(
        newActivity.dateTime.getFullYear(),
        newActivity.dateTime.getMonth(),
        newActivity.dateTime.getDate()
      ));

      const activityData = {
        title: newActivity.title,
        time: newActivity.time,
        imageKey: newActivity.imageKey || 'defaultImg',
        date: dateTimestamp
      };

      const docId = await addActivity(patientId, activityData);

      const dateKey = getDateKey(newActivity.dateTime);
      addToGroupedState(dateKey, {
        id: docId,
        title: newActivity.title,
        time: newActivity.time,
        imageKey: activityData.imageKey,
        image: resolveImage(activityData.imageKey)
      });
    } catch (err) {
      Alert.alert('Error', 'Failed to add activity. Please try again.');
    }
  };

  if (loading) {
    return <LoadingState message="Loading activities..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <View style={styles.contentWrapper}>
      <AddActivityModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddActivity}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.6}>
        <MaterialIcons name="add" size={40} color="white" />
      </TouchableOpacity>

      <ScrollView style={styles.scrollBody}>
        <Text style={styles.scheduleTitle}>
          {' '}
          {getFirstName(patientName)}'s Schedule
        </Text>

        {Object.keys(activitiesGroupedByDate).length === 0 && (
          <EmptyState
            icon="calendar-outline"
            title="No activities yet"
            message="Tap the + button to schedule an activity."
          />
        )}

        <View style={styles.activityContainerPosts}>
          {Object.entries(activitiesGroupedByDate).map(
            ([date, activities], index) => {
              const isToday = date === todayStr;
              return (
                <View key={date}>
                  {index !== 0 && <Divider />}
                  <View style={styles.dateHeaderRow}>
                    <Text style={[styles.dateHeader, isToday && styles.dateHeaderToday]}>
                      {formatDate(date)}
                    </Text>
                    {isToday && (
                      <View style={styles.todayBadge}>
                        <Text style={styles.todayBadgeText}>Today</Text>
                      </View>
                    )}
                  </View>
                  {activities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      onPress={() =>
                        navigation.navigate(ROUTES.ACTIVITY, {
                          activityDocumentId: activity.id,
                          activityTitle: activity.title,
                          activityTime: activity.time,
                          activityImage: activity.image,
                          patientName: patientName,
                          patientId: patientId
                        })
                      }
                    />
                  ))}
                </View>
              );
            }
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const PatientProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { patientName, patientId } = route.params;

  return (
    <View style={styles.fullScreenContainer}>
      <Header
        headerName={patientName}
        leftIconName={'grid'}
        rightIconName={'person-circle-outline'}
      />
      <View style={styles.activityContainer}>
        <PatientProfileContent patientName={patientName} patientId={patientId} navigation={navigation} />
      </View>
      <NavBar
        navigation={navigation}
        patientName={patientName}
        patientId={patientId}
        specialIcon="house"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: Color.blue
  },
  contentWrapper: {
    flex: 1
  },
  activityContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...Shadows.container
  },
  scrollBody: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: Color.colorWhite
  },
  scheduleTitle: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 15
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray,
    textAlign: 'center',
    marginTop: 40
  },
  activityContainerPosts: {
    marginTop: 10,
    marginBottom: 130,
    marginLeft: 20
  },
  addButton: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 105,
    backgroundColor: Color.blue,
    width: 61,
    height: 61,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    ...Shadows.medium,
    zIndex: 1
  },
  dateHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  dateHeader: {
    fontSize: 18,
    color: Color.textGray,
    paddingBottom: 5
  },
  dateHeaderToday: {
    color: Color.blue,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600'
  },
  todayBadge: {
    backgroundColor: Color.blue,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 3
  },
  todayBadgeText: {
    color: Color.colorWhite,
    fontSize: 12,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600'
  }
});

export default PatientProfile;
