import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Color, FontFamily, Shadows } from '../GlobalStyles';

const ActivityCard = ({ activity, onPress }) => {
  const content = (
    <>
      {activity.image && (
        <Image source={activity.image} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{activity.title}</Text>
        <Text style={styles.time}>{activity.time}</Text>
      </View>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.6}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.card}>{content}</View>;
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Color.colorWhite,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
    ...Shadows.medium
  },
  image: {
    width: 70,
    height: 70,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Color.colorBlack
  },
  content: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
    paddingVertical: 10
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.textDark,
    paddingBottom: 5
  },
  time: {
    fontSize: 14,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray
  }
});

export default ActivityCard;
