import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { Color, FontFamily } from '../../GlobalStyles';

const EditInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { patientName } = route.params;

  const [name, setName] = useState(patientName);
  const [age, setAge] = useState('');
  const [room, setRoom] = useState('');
  const [notes, setNotes] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Patient name cannot be empty.');
      return;
    }

    setSaving(true);
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('name', '==', patientName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'users', userDoc.id), {
          name: name.trim(),
          age: age.trim(),
          room: room.trim(),
          notes: notes.trim(),
          emergencyContact: emergencyContact.trim()
        });
        Alert.alert('Saved', 'Patient information updated successfully.');
      } else {
        Alert.alert('Error', 'Patient not found in database.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
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
          <Text style={styles.sectionTitle}>Edit Patient Info</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Patient name"
          />

          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Age"
            keyboardType="number-pad"
          />

          <Text style={styles.label}>Room Number</Text>
          <TextInput
            style={styles.input}
            value={room}
            onChangeText={setRoom}
            placeholder="Room number"
          />

          <Text style={styles.label}>Emergency Contact</Text>
          <TextInput
            style={styles.input}
            value={emergencyContact}
            onChangeText={setEmergencyContact}
            placeholder="Phone number"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Additional notes..."
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={saving}>
            {saving ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.saveButtonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
      <NavBar
        navigation={navigation}
        patientName={patientName}
        specialIcon="person-sharp"
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
    shadowOpacity: 0.4,
    shadowRadius: 6
  },
  contentArea: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  scrollContent: {
    paddingTop: 30,
    paddingHorizontal: 24,
    paddingBottom: 120
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600',
    color: Color.colorBlack,
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontFamily: FontFamily.nunitoMedium,
    color: Color.textGray,
    marginBottom: 6,
    marginTop: 12
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: Color.dividerGray,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    backgroundColor: Color.colorWhite
  },
  notesInput: {
    height: 100,
    paddingTop: 12
  },
  saveButton: {
    backgroundColor: Color.blue,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24
  },
  saveButtonDisabled: {
    opacity: 0.7
  },
  saveButtonText: {
    color: Color.colorWhite,
    fontSize: 18,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: '600'
  }
});

export default EditInfo;
