import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator
} from 'react-native';
import Header from '../../components/Header';
import PatientButton from '../../components/PatientButton';
import EmptyState from '../../components/EmptyState';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Color, FontFamily, Shadows } from '../../GlobalStyles';
import { ROUTES } from '../../constants/routes';
import { COLLECTIONS } from '../../constants/collections';

const Dashboard = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError(null);
        const querySnapshot = await getDocs(collection(db, COLLECTIONS.USERS));
        const patientList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || 'Unknown',
          image: doc.data().image
        }));
        patientList.sort((a, b) => a.name.localeCompare(b.name));
        setPatients(patientList);
      } catch (err) {
        setError('Failed to load patients. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    (patient.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onPatientPress = (patient) => {
    navigation.navigate(ROUTES.PATIENT_TABS, {
      patientName: patient.name,
      patientId: patient.id
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <Header
        headerName={'Dashboard'}
        leftIconName={'grid'}
        rightIconName={'person-circle-outline'}
      />
      <View style={styles.patientContainerShadow}>
        <View style={styles.patientContainer}>
          <ScrollView contentContainerStyle={styles.patientsScrollContainer}>
            <View style={styles.searchBarContainer}>
              <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {loading && (
              <View style={styles.centerContent}>
                <ActivityIndicator size="large" color={Color.blue} />
                <Text style={styles.loadingText}>Loading patients...</Text>
              </View>
            )}

            {error && !loading && (
              <View style={styles.centerContent}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {!loading && !error && filteredPatients.length === 0 && (
              <EmptyState
                icon={searchQuery ? 'search' : 'people'}
                title={searchQuery ? 'No matches' : 'No patients'}
                message={searchQuery ? 'No patients match your search.' : 'No patients found.'}
              />
            )}

            {!loading && !error && filteredPatients.length > 0 && (
              <View style={styles.patientButtonContainer}>
                {filteredPatients.map((patient) => (
                  <PatientButton
                    key={patient.id}
                    patientName={patient.name}
                    image={patient.image}
                    onPress={() => onPatientPress(patient)}
                  />
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.blue,
    flex: 1
  },
  patientContainerShadow: {
    backgroundColor: Color.lightGray,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    ...Shadows.container
  },
  patientContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '100%',
    overflow: 'hidden'
  },
  searchBarContainer: {
    width: '100%',
    alignItems: 'center'
  },
  searchBar: {
    height: 44,
    width: '90%',
    marginTop: 40,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: Color.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontFamily: FontFamily.nunitoRegular,
    backgroundColor: Color.inputBg
  },
  patientsScrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  patientButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    marginBottom: 40,
    width: '100%'
  },
  centerContent: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 40
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray
  },
  errorText: {
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.errorRed,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray,
    textAlign: 'center',
    paddingHorizontal: 20
  }
});

export default Dashboard;
