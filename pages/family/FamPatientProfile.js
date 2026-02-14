import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Color, FontFamily } from '../../GlobalStyles';
import { db } from '../../Firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { resolveImage } from '../../data/activityImages';

const FamPatientProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { patientName, patientId } = route.params;
  const [activitiesGroupedByDate, setActivitiesGroupedByDate] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activitiesRef = collection(db, 'users', patientId, 'activities');
        const q = query(activitiesRef, orderBy('date', 'desc'));
        const snapshot = await getDocs(q);

        const grouped = {};
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const dateObj = data.date.toDate();
          const dateKey = new Date(
            dateObj.getFullYear(),
            dateObj.getMonth(),
            dateObj.getDate()
          ).toString();

          if (!grouped[dateKey]) grouped[dateKey] = [];
          grouped[dateKey].push({
            id: doc.id,
            title: data.title,
            time: data.time,
            image: resolveImage(data.imageKey)
          });
        });
        setActivitiesGroupedByDate(grouped);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };
    if (patientId) fetchActivities();
  }, [patientId]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 28 }} />
        <Text style={styles.headerTitle}>Family View</Text>
        <Ionicons
          name="log-out-outline"
          size={28}
          color={Color.colorWhite}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Start' }]
            });
          }}
        />
      </View>

      <ScrollView style={styles.contentArea}>
        <Text style={styles.scheduleTitle}>Activity Schedule</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Color.blue} />
            <Text style={styles.loadingText}>Loading activities...</Text>
          </View>
        ) : (
          <View style={styles.activityContainerPosts}>
            {Object.entries(activitiesGroupedByDate).length === 0 && (
              <Text style={styles.emptyText}>No activities found</Text>
            )}
            {Object.entries(activitiesGroupedByDate).map(
              ([date, activities], index) => (
                <View key={date}>
                  {index !== 0 && <View style={styles.divider} />}
                  <Text style={styles.dateHeader}>{formatDate(date)}</Text>
                  {activities.map((activity) => (
                    <View key={activity.id} style={styles.activityItem}>
                      {activity.image && (
                        <Image
                          source={activity.image}
                          style={styles.activityImage}
                        />
                      )}
                      <View style={styles.activityContent}>
                        <Text style={styles.activityTitle}>
                          {activity.title}
                        </Text>
                        <Text style={styles.activityTime}>{activity.time}</Text>
                      </View>
                    </View>
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
  loadingContainer: {
    alignItems: 'center',
    marginTop: 40
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray
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
  },
  divider: {
    height: 2,
    backgroundColor: Color.dividerGray,
    marginBottom: 10,
    marginTop: 10
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: Color.colorWhite,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
    shadowColor: Color.colorBlack,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  activityImage: {
    width: 70,
    height: 70,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Color.colorBlack
  },
  activityContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
    paddingVertical: 10
  },
  activityTitle: {
    fontSize: 18,
    fontFamily: FontFamily.nunitoMedium,
    fontWeight: '500',
    color: Color.textDark,
    paddingBottom: 5
  },
  activityTime: {
    fontSize: 14,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray
  }
});

export default FamPatientProfile;
