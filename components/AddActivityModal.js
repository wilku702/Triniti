import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Color, FontFamily } from '../GlobalStyles';
import { ACTIVITY_IMAGES } from '../data/activityImages';
import { formatTimeRange } from '../utils/dateFormatters';

const CATEGORY_OPTIONS = [
  { label: 'Yoga', icon: 'self-improvement', imageKey: 'yoga', image: ACTIVITY_IMAGES.yoga },
  { label: 'Reading', icon: 'menu-book', imageKey: 'reading', image: ACTIVITY_IMAGES.reading },
  { label: 'Music', icon: 'music-note', imageKey: 'music', image: ACTIVITY_IMAGES.music },
  { label: 'Games', icon: 'extension', imageKey: 'games', image: ACTIVITY_IMAGES.games },
  { label: 'Painting', icon: 'palette', imageKey: 'painting', image: ACTIVITY_IMAGES.painting },
  { label: 'Walking', icon: 'directions-walk', imageKey: 'walking', image: ACTIVITY_IMAGES.walking },
  { label: 'Crafts', icon: 'content-cut', imageKey: 'crafts', image: ACTIVITY_IMAGES.crafts },
  { label: 'Garden', icon: 'local-florist', imageKey: 'garden', image: ACTIVITY_IMAGES.garden },
  { label: 'Meal', icon: 'restaurant', imageKey: 'breakfast', image: ACTIVITY_IMAGES.breakfast },
  { label: 'Movie', icon: 'movie', imageKey: 'movie', image: ACTIVITY_IMAGES.movie }
];

const AddActivityModal = ({ visible, onClose, onAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newActivity, setNewActivity] = useState({
    dateTime: new Date(),
    title: '',
    time: '',
    imageKey: 'defaultImg',
    image: ACTIVITY_IMAGES.defaultImg
  });

  const handleCancel = () => {
    setSelectedCategory(null);
    setNewActivity({ dateTime: new Date(), title: '', time: '', imageKey: 'defaultImg', image: ACTIVITY_IMAGES.defaultImg });
    onClose();
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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.label);
    setNewActivity((prev) => ({ ...prev, image: category.image, imageKey: category.imageKey }));
  };

  const handleAdd = () => {
    onAdd(newActivity);
    handleCancel();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Activity</Text>
            <TouchableOpacity onPress={handleCancel} style={styles.closeButton} activeOpacity={0.6}>
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
            selectionColor={Color.blue}
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
                onPress={() => handleCategorySelect(cat)}
                activeOpacity={0.6}>
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
            onPress={handleAdd}
            activeOpacity={0.6}
            disabled={!newActivity.title.trim()}>
            <MaterialIcons name="add-circle-outline" size={22} color={Color.colorWhite} />
            <Text style={styles.addActivityButtonText}>Add Activity</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.6}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default AddActivityModal;
