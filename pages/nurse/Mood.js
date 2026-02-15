import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { Color, FontFamily } from '../../GlobalStyles';
import EmptyState from '../../components/EmptyState';
import { getMoodEntries, addMoodEntry } from '../../services/firestore';
import { getFirstName, formatDisplayDate } from '../../utils/dateFormatters';

const MOOD_OPTIONS = [
  { label: 'Great', icon: 'sentiment-very-satisfied', color: Color.moodGreat },
  { label: 'Good', icon: 'sentiment-satisfied', color: Color.moodGood },
  { label: 'Okay', icon: 'sentiment-neutral', color: Color.moodOkay },
  { label: 'Low', icon: 'sentiment-dissatisfied', color: Color.moodLow },
  { label: 'Bad', icon: 'sentiment-very-dissatisfied', color: Color.moodBad }
];

export const MoodContent = ({ patientName, patientId }) => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);

  useEffect(() => {
    const fetchMoodEntries = async () => {
      try {
        setLoading(true);
        const entries = await getMoodEntries(patientId);
        setMoodEntries(entries);
      } catch (error) {
        console.error('Error fetching mood entries:', error);
      } finally {
        setLoading(false);
      }
    };
    if (patientId) fetchMoodEntries();
  }, [patientId]);

  const getMoodData = (moodLabel) => {
    return MOOD_OPTIONS.find((m) => m.label === moodLabel) || MOOD_OPTIONS[2];
  };

  const moodByDate = useMemo(() => {
    const map = {};
    moodEntries.forEach((entry) => {
      if (!map[entry.date]) {
        map[entry.date] = getMoodData(entry.mood);
      }
    });
    return map;
  }, [moodEntries]);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleDayPress = useCallback((day) => {
    setSelectedDate((prev) => (prev === day.dateString ? null : day.dateString));
  }, []);

  const renderCustomDay = useCallback(({ date, state }) => {
    const dateStr = date.dateString;
    const moodData = moodByDate[dateStr];
    const isSelected = dateStr === selectedDate;
    const isToday = dateStr === todayStr;
    const isDisabled = state === 'disabled';

    return (
      <TouchableOpacity
        style={[
          styles.dayContainer,
          isSelected && styles.daySelected
        ]}
        onPress={() => handleDayPress(date)}
        activeOpacity={0.6}>
        <Text
          style={[
            styles.dayText,
            isToday && !isSelected && styles.dayTextToday,
            isSelected && styles.dayTextSelected,
            isDisabled && styles.dayTextDisabled
          ]}>
          {date.day}
        </Text>
        {moodData && !isDisabled ? (
          <MaterialIcons
            name={moodData.icon}
            size={16}
            color={isSelected ? Color.colorWhite : moodData.color}
          />
        ) : (
          <View style={styles.dayIconPlaceholder} />
        )}
      </TouchableOpacity>
    );
  }, [moodByDate, selectedDate, todayStr, handleDayPress]);

  const handleLogMood = async (mood) => {
    const today = new Date().toISOString().split('T')[0];
    const existingEntry = moodEntries.find((e) => e.date === today);
    if (existingEntry) {
      Alert.alert('Already Logged', "Today's mood has already been recorded.");
      return;
    }

    setSelectedMood(mood.label);
    const entryData = {
      date: today,
      mood: mood.label,
      notes: ''
    };

    try {
      const docId = await addMoodEntry(patientId, entryData);
      const newEntry = { id: docId, ...entryData };
      setMoodEntries((prev) => [newEntry, ...prev]);
    } catch (error) {
      Alert.alert('Error', 'Failed to log mood. Please try again.');
    }
  };

  const displayedEntries = selectedDate
    ? moodEntries.filter((entry) => entry.date === selectedDate)
    : moodEntries;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Color.blue} />
        <Text style={styles.loadingText}>Loading mood entries...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.contentArea}
      contentContainerStyle={styles.scrollContent}>
      <Text style={styles.sectionTitle}>
        {getFirstName(patientName)}'s Mood
      </Text>

      <View style={styles.calendarContainer}>
        <Calendar
          dayComponent={renderCustomDay}
          theme={{
            backgroundColor: Color.colorWhite,
            calendarBackground: Color.colorWhite,
            textSectionTitleColor: Color.textGray,
            arrowColor: Color.blue,
            monthTextColor: Color.textDark,
            textMonthFontFamily: FontFamily.nunitoBold,
            textDayHeaderFontFamily: FontFamily.nunitoMedium,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 13
          }}
        />
      </View>

      <Text style={styles.promptText}>How is {getFirstName(patientName)} feeling today?</Text>
      <View style={styles.moodSelector}>
        {MOOD_OPTIONS.map((mood) => (
          <TouchableOpacity
            key={mood.label}
            style={[
              styles.moodOption,
              selectedMood === mood.label && {
                backgroundColor: mood.color + '20',
                borderColor: mood.color
              }
            ]}
            onPress={() => handleLogMood(mood)}>
            <MaterialIcons name={mood.icon} size={36} color={mood.color} />
            <Text style={styles.moodLabel}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
        {selectedDate ? `Entries for ${formatDisplayDate(selectedDate)}` : 'All Entries'}
      </Text>

      {displayedEntries.length === 0 && (
        <EmptyState
          icon="happy-outline"
          title="No entries"
          message="No mood entries for this date."
        />
      )}

      {displayedEntries.map((entry) => {
        const moodData = getMoodData(entry.mood);
        return (
          <View key={entry.id} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <View style={[styles.moodBadge, { backgroundColor: moodData.color + '20' }]}>
                <MaterialIcons
                  name={moodData.icon}
                  size={28}
                  color={moodData.color}
                />
              </View>
              <View style={styles.entryInfo}>
                <Text style={styles.entryMood}>{entry.mood}</Text>
                <Text style={styles.entryDate}>{formatDisplayDate(entry.date)}</Text>
              </View>
            </View>
            {entry.notes ? (
              <Text style={styles.entryNotes}>{entry.notes}</Text>
            ) : null}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentArea: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
  },
  scrollContent: {
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 120
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600',
    color: Color.colorBlack,
    marginBottom: 16
  },
  calendarContainer: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Color.colorBlack,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    backgroundColor: Color.colorWhite
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 44,
    borderRadius: 10
  },
  daySelected: {
    backgroundColor: Color.blue
  },
  dayText: {
    fontSize: 14,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textDark
  },
  dayTextToday: {
    color: Color.blue,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600'
  },
  dayTextSelected: {
    color: Color.colorWhite,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600'
  },
  dayTextDisabled: {
    color: Color.dividerGray
  },
  dayIconPlaceholder: {
    height: 16
  },
  promptText: {
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray,
    marginBottom: 12
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  moodOption: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    width: '18%'
  },
  moodLabel: {
    fontSize: 12,
    fontFamily: FontFamily.nunitoMedium,
    color: Color.textDark,
    marginTop: 4
  },
  entryCard: {
    backgroundColor: Color.colorWhite,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: Color.colorBlack,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  moodBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  entryInfo: {
    flex: 1
  },
  entryMood: {
    fontSize: 16,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600',
    color: Color.textDark
  },
  entryDate: {
    fontSize: 13,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray,
    marginTop: 2
  },
  entryNotes: {
    fontSize: 14,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray,
    marginTop: 10,
    lineHeight: 20,
    paddingLeft: 56
  },
});

export default MoodContent;
