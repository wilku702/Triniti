import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Color, FontFamily } from '../../GlobalStyles';
import useActivities from '../../hooks/useActivities';
import { formatDate } from '../../utils/dateFormatters';
import ActivityCard from '../../components/ActivityCard';
import Divider from '../../components/Divider';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';

export const FamActivitiesContent = ({ patientName, patientId }) => {
  const { activitiesGroupedByDate, loading, error, refetch } = useActivities(patientId);

  if (loading) return <LoadingState message="Loading activities..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <ScrollView
      style={styles.scrollArea}
      contentContainerStyle={styles.scrollContent}>
      <Text style={styles.scheduleTitle}>Activity Schedule</Text>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollArea: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  scrollContent: {
    paddingBottom: 120
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

export default FamActivitiesContent;
