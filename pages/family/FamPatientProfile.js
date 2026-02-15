import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Color, FontFamily, Shadows } from '../../GlobalStyles';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';
import useActivities from '../../hooks/useActivities';
import { formatDate } from '../../utils/dateFormatters';
import ActivityCard from '../../components/ActivityCard';
import Divider from '../../components/Divider';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';

const FamPatientProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { patientName, patientId } = route.params;
  const { logout } = useAuth();
  const { activitiesGroupedByDate, loading, error, refetch } = useActivities(patientId);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 28 }} />
        <Text style={styles.headerTitle}>Family View</Text>
        <Ionicons
          name="log-out-outline"
          size={28}
          color={Color.colorWhite}
          onPress={async () => {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: ROUTES.START }]
            });
          }}
        />
      </View>

      <ScrollView style={styles.contentArea}>
        <Text style={styles.scheduleTitle}>Activity Schedule</Text>

        {loading ? (
          <LoadingState message="Loading activities..." />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : (
          <View style={styles.activityContainerPosts}>
            {Object.entries(activitiesGroupedByDate).length === 0 && (
              <Text style={styles.emptyText}>No activities found</Text>
            )}
            {Object.entries(activitiesGroupedByDate).map(
              ([date, activities], index) => (
                <View key={date}>
                  {index !== 0 && <Divider />}
                  <Text style={styles.dateHeader}>{formatDate(date)}</Text>
                  {activities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </View>
              )
            )}
          </View>
        )}
      </ScrollView>
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
    height: '16%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: '8%'
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: 'bold',
    color: Color.colorWhite
  },
  contentArea: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: Color.colorWhite
  },
  scheduleTitle: {
    fontSize: 24,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 24
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
    marginBottom: 40,
    marginHorizontal: 24
  },
  dateHeader: {
    fontSize: 18,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray,
    paddingBottom: 5
  }
});

export default FamPatientProfile;
