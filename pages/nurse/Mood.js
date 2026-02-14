import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { Color, FontFamily } from '../../GlobalStyles';

const MOOD_OPTIONS = [
  { label: 'Great', icon: 'sentiment-very-satisfied', color: '#4CAF50' },
  { label: 'Good', icon: 'sentiment-satisfied', color: '#8BC34A' },
  { label: 'Okay', icon: 'sentiment-neutral', color: '#FFC107' },
  { label: 'Low', icon: 'sentiment-dissatisfied', color: '#FF9800' },
  { label: 'Bad', icon: 'sentiment-very-dissatisfied', color: '#F44336' }
];

const Mood = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { patientName } = route.params;

  const [moodEntries] = useState([
    { id: 1, date: 'April 17, 2024', mood: 'Great', notes: 'Very active and social today' },
    { id: 2, date: 'April 16, 2024', mood: 'Good', notes: 'Enjoyed reading time' },
    { id: 3, date: 'April 15, 2024', mood: 'Okay', notes: 'Quiet day, ate well' },
    { id: 4, date: 'April 14, 2024', mood: 'Good', notes: 'Participated in group activity' },
    { id: 5, date: 'April 13, 2024', mood: 'Great', notes: 'Birthday celebration, very happy' }
  ]);

  const [selectedMood, setSelectedMood] = useState(null);

  const getMoodData = (moodLabel) => {
    return MOOD_OPTIONS.find((m) => m.label === moodLabel) || MOOD_OPTIONS[2];
  };

  const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
  };

  const handleLogMood = (mood) => {
    setSelectedMood(mood.label);
  };

  return (
    <View style={styles.container}>
      <Header
        headerName={patientName}
        leftIconName={'grid'}
        rightIconName={'person-circle-outline'}
      />
      <View style={styles.contentShadow}>
        <ScrollView
          style={styles.contentArea}
          contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>
            {getFirstName(patientName)}'s Mood
          </Text>

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

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Recent Entries</Text>
          {moodEntries.map((entry) => {
            const moodData = getMoodData(entry.mood);
            return (
              <View key={entry.id} style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <MaterialIcons
                    name={moodData.icon}
                    size={28}
                    color={moodData.color}
                  />
                  <Text style={styles.entryMood}>{entry.mood}</Text>
                  <Text style={styles.entryDate}>{entry.date}</Text>
                </View>
                {entry.notes && (
                  <Text style={styles.entryNotes}>{entry.notes}</Text>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <NavBar
        navigation={navigation}
        patientName={patientName}
        specialIcon="chart-line"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.blue
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  scrollContent: {
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 120
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600',
    color: Color.colorBlack,
    marginBottom: 16
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
  entryMood: {
    fontSize: 16,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600',
    color: Color.textDark,
    marginLeft: 8,
    flex: 1
  },
  entryDate: {
    fontSize: 13,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray
  },
  entryNotes: {
    fontSize: 14,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray,
    marginTop: 8,
    lineHeight: 20
  }
});

export default Mood;
