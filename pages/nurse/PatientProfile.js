import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Color, FontFamily } from '../../GlobalStyles';
import { ACTIVITIES, DEFAULT_ACTIVITIES, IMG } from '../../data/fakeData';

const CATEGORY_OPTIONS = [
  { label: 'Yoga', icon: 'self-improvement', image: IMG.yoga },
  { label: 'Reading', icon: 'menu-book', image: IMG.reading },
  { label: 'Music', icon: 'music-note', image: IMG.music },
  { label: 'Games', icon: 'extension', image: IMG.games },
  { label: 'Painting', icon: 'palette', image: IMG.painting },
  { label: 'Walking', icon: 'directions-walk', image: IMG.walking },
  { label: 'Crafts', icon: 'content-cut', image: IMG.crafts },
  { label: 'Garden', icon: 'local-florist', image: IMG.garden },
  { label: 'Meal', icon: 'restaurant', image: IMG.breakfast },
  { label: 'Movie', icon: 'movie', image: IMG.movie }
];

export const PatientProfileContent = ({ patientName, navigation }) => {

  const [activitiesGroupedByDate, setActivitiesGroupedByDate] = useState(
    ACTIVITIES[patientName] || DEFAULT_ACTIVITIES
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newActivity, setNewActivity] = useState({
    dateTime: new Date(),
    title: '',
    time: '',
    image: IMG.defaultImg
  });

  const handleCancelAddActivity = () => {
    setModalVisible(false);
    setSelectedCategory(null);
    setNewActivity({ dateTime: new Date(), title: '', time: '', image: IMG.defaultImg });
  };

  const formatTimeRange = (startDate, durationMinutes = 30) => {
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    const startTime = startDate.toLocaleTimeString('en-US', options);
    const endTime = endDate.toLocaleTimeString('en-US', options);

    return `${startTime} - ${endTime}`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const today = new Date();
  const todayStr = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toString();

  const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || newActivity.dateTime;

    setNewActivity((prev) => ({
      ...prev,
      dateTime: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ),
      time: formatTimeRange(currentDate)
    }));
  };

  const handleAddActivity = () => {
    const newActivities = { ...activitiesGroupedByDate };
    if (newActivities[newActivity.dateTime]) {
      newActivities[newActivity.dateTime].push({
        id:
          Math.max(
            ...Object.values(newActivities)
              .flat()
              .map((activity) => activity.id)
          ) + 1,
        title: newActivity.title,
        time: newActivity.time,
        image: newActivity.image
      });
    } else {
      newActivities[newActivity.dateTime] = [
        {
          id:
            Math.max(
              ...Object.values(newActivities)
                .flat()
                .map((activity) => activity.id)
            ) + 1,
          title: newActivity.title,
          time: newActivity.time,
          image: newActivity.image
        }
      ];
    }
    setActivitiesGroupedByDate(newActivities);
    setModalVisible(false);
    setSelectedCategory(null);
    setNewActivity({ dateTime: new Date(), title: '', time: '', image: IMG.defaultImg });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.label);
    setNewActivity((prev) => ({ ...prev, image: category.image }));
  };

  return (
    <View style={styles.contentWrapper}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancelAddActivity}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Activity</Text>
              <TouchableOpacity onPress={handleCancelAddActivity} style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color={Color.textGray} />
              </TouchableOpacity>
            </View>

            <View style={styles.fieldRow}>
              <MaterialIcons name="edit" size={20} color={Color.blue} />
              <Text style={styles.fieldLabel}>Activity Title</Text>
            </View>
            <TextInput
              style={styles.modalInput}
              onChangeText={(text) =>
                setNewActivity((prev) => ({ ...prev, title: text }))
              }
              placeholder="e.g. Morning Yoga, Reading Circle..."
              placeholderTextColor={Color.dividerGray}
              value={newActivity.title}
            />

            <View style={styles.fieldRow}>
              <MaterialIcons name="category" size={20} color={Color.blue} />
              <Text style={styles.fieldLabel}>Category</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}
              contentContainerStyle={styles.categoryScrollContent}>
              {CATEGORY_OPTIONS.map((cat) => (
                <TouchableOpacity
                  key={cat.label}
                  style={[
                    styles.categoryOption,
                    selectedCategory === cat.label && styles.categoryOptionSelected
                  ]}
                  onPress={() => handleCategorySelect(cat)}>
                  <MaterialIcons
                    name={cat.icon}
                    size={24}
                    color={selectedCategory === cat.label ? Color.blue : Color.textGray}
                  />
                  <Text
                    style={[
                      styles.categoryLabel,
                      selectedCategory === cat.label && styles.categoryLabelSelected
                    ]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.pickerRow}>
              <View style={styles.pickerSection}>
                <View style={styles.fieldRow}>
                  <MaterialIcons name="access-time" size={20} color={Color.blue} />
                  <Text style={styles.fieldLabel}>Time</Text>
                </View>
                <View style={styles.pickerWrapper}>
                  <DateTimePicker
                    value={newActivity.dateTime}
                    mode="time"
                    display="default"
                    onChange={handleDateChange}
                  />
                </View>
              </View>
              <View style={styles.pickerSection}>
                <View style={styles.fieldRow}>
                  <MaterialIcons name="calendar-today" size={20} color={Color.blue} />
                  <Text style={styles.fieldLabel}>Date</Text>
                </View>
                <View style={styles.pickerWrapper}>
                  <DateTimePicker
                    value={newActivity.dateTime}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.addActivityButton,
                !newActivity.title.trim() && styles.addActivityButtonDisabled
              ]}
              onPress={handleAddActivity}
              disabled={!newActivity.title.trim()}>
              <MaterialIcons name="add-circle-outline" size={22} color={Color.colorWhite} />
              <Text style={styles.addActivityButtonText}>Add Activity</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelAddActivity}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <MaterialIcons name="add" size={40} color="white" />
      </TouchableOpacity>

      <ScrollView style={styles.scrollBody}>
        <Text style={styles.scheduleTitle}>
          {' '}
          {getFirstName(patientName)}'s Schedule
        </Text>
        <View style={styles.activityContainerPosts}>
          {Object.entries(activitiesGroupedByDate).map(
            ([date, activities], index) => {
              const isToday = date === todayStr;
              return (
              <View key={date}>
                {index !== 0 && <View style={styles.divider} />}
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
                  <TouchableOpacity
                    key={activity.id}
                    style={styles.activityItem}
                    onPress={() =>
                      navigation.navigate('Activity', {
                        activityDocumentId: activity.id,
                        activityTitle: activity.title,
                        activityTime: activity.time,
                        activityImage: activity.image,
                        patientName: patientName
                      })
                    }>
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
                  </TouchableOpacity>
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
  const { patientName } = route.params;

  return (
    <View style={styles.fullScreenContainer}>
      <Header
        headerName={patientName}
        leftIconName={'grid'}
        rightIconName={'person-circle-outline'}
      />
      <View style={styles.activityContainer}>
        <PatientProfileContent patientName={patientName} navigation={navigation} />
      </View>
      <NavBar
        navigation={navigation}
        patientName={patientName}
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
    borderRadius: 40,

    shadowColor: Color.colorBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6
  },

  scrollBody: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: Color.colorWhite
  },

  scheduleTitle: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 15
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
    fontWeight: '500',
    color: Color.textDark,
    paddingBottom: 5
  },
  activityTime: {
    fontSize: 14,
    color: Color.textGray
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
    shadowColor: Color.colorBlack,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
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
  },
  divider: {
    height: 2,
    backgroundColor: Color.dividerGray,
    marginBottom: 10,
    marginTop: 10
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  modalView: {
    backgroundColor: Color.colorWhite,
    borderRadius: 20,
    padding: 24,
    shadowColor: Color.colorBlack,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600',
    color: Color.textDark
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Color.lightGray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8
  },
  fieldLabel: {
    fontSize: 15,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600',
    color: Color.textDark
  },
  modalInput: {
    width: '100%',
    height: 48,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: Color.dividerGray,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textDark,
    backgroundColor: Color.colorWhite
  },
  categoryScroll: {
    marginBottom: 18,
    maxHeight: 80
  },
  categoryScrollContent: {
    gap: 10
  },
  categoryOption: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Color.dividerGray,
    minWidth: 68
  },
  categoryOptionSelected: {
    borderColor: Color.blue,
    backgroundColor: Color.blue + '12'
  },
  categoryLabel: {
    fontSize: 11,
    fontFamily: FontFamily.nunitoMedium,
    color: Color.textGray,
    marginTop: 4
  },
  categoryLabelSelected: {
    color: Color.blue,
    fontFamily: FontFamily.nunitoBold
  },
  pickerRow: {
    flexDirection: 'row',
    marginBottom: 24
  },
  pickerSection: {
    flex: 1,
    alignItems: 'flex-start'
  },
  pickerWrapper: {
    marginLeft: -10
  },
  addActivityButton: {
    backgroundColor: Color.blue,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10
  },
  addActivityButtonDisabled: {
    opacity: 0.5
  },
  addActivityButtonText: {
    color: Color.colorWhite,
    fontSize: 18,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600'
  },
  cancelButton: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center'
  },
  cancelButtonText: {
    color: Color.textGray,
    fontSize: 16,
    fontFamily: FontFamily.nunitoMedium
  }
});

export default PatientProfile;
