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
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { Color, FontFamily } from '../../GlobalStyles';

const FamPatientProfile = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const [activitiesGroupedByDate] = useState({
    'Wed Apr 17 2024 18:00:00 GMT-0500': [
      {
        id: 1,
        title: 'Reading Books',
        time: '9:30 AM - 10:00 AM',
        image: {
          uri: 'https://neighborsdc.org/wp-content/uploads/2019/04/the-neighbors-of-dunn-county-senior-reading-1024x585.png'
        }
      },
      {
        id: 2,
        title: "Martha's Birthday Party",
        time: '1:00 PM - 3:00 PM',
        image: {
          uri: 'https://images.pexels.com/photos/18459203/pexels-photo-18459203/free-photo-of-caregiver-serving-food-for-elderly-people-in-retirement-house.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
      },
      {
        id: 3,
        title: 'Karaoke Night',
        time: '8:00 PM - 10:00 PM',
        image: require('../../assets/activity/karaoke.png')
      }
    ],
    'Tue Apr 16 2024 18:00:00 GMT-0500': [
      {
        id: 4,
        title: 'Eating Breakfast',
        time: '8:00 AM - 9:00 AM',
        image: {
          uri: 'https://images.pexels.com/photos/18429461/pexels-photo-18429461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
      },
      {
        id: 5,
        title: "An's Birthday Party",
        time: '2:00 PM - 4:00 PM',
        image: {
          uri: 'https://images.pexels.com/photos/18459203/pexels-photo-18459203/free-photo-of-caregiver-serving-food-for-elderly-people-in-retirement-house.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
      }
    ]
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const patientName = 'Your Loved One';

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
            try {
              await logout();
            } catch (e) {}
          }}
        />
      </View>

      <ScrollView style={styles.contentArea}>
        <Text style={styles.scheduleTitle}>Activity Schedule</Text>

        <View style={styles.activityContainerPosts}>
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
