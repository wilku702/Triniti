import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Color, FontFamily } from '../GlobalStyles';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import useChat from '../hooks/useChat';
import { formatChatTimestamp } from '../utils/dateFormatters';
import { getFirstName } from '../utils/dateFormatters';

const Chat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { patientName, patientId } = route.params;
  const { user, userRole } = useAuth();
  const { messages, loading, sendMessage } = useChat(patientId);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const insets = useSafeAreaInsets();

  const handleSend = async () => {
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      await sendMessage({
        text: text.trim(),
        senderId: user.uid,
        senderName: user.displayName || user.email,
        senderRole: userRole,
      });
      setText('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const renderMessage = ({ item }) => {
    const isOwn = item.senderId === user.uid;
    return (
      <View style={[styles.messageBubble, isOwn ? styles.ownBubble : styles.otherBubble]}>
        {!isOwn && (
          <Text style={styles.senderName}>
            {item.senderName} ({item.senderRole})
          </Text>
        )}
        <Text style={[styles.messageText, isOwn ? styles.ownText : styles.otherText]}>
          {item.text}
        </Text>
        <Text style={[styles.timestamp, isOwn ? styles.ownTimestamp : styles.otherTimestamp]}>
          {formatChatTimestamp(item.timestamp)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}
          accessibilityLabel="Go back"
          accessibilityRole="button">
          <Ionicons name="arrow-back" size={28} color={Color.colorWhite} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat - {getFirstName(patientName)}</Text>
        <View style={{ width: 28 }} />
      </View>

      <KeyboardAvoidingView
        style={styles.chatArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Color.blue} />
          </View>
        ) : (
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            inverted
            contentContainerStyle={styles.messageList}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <EmptyState
                  icon="chatbubbles-outline"
                  title="No messages yet"
                  message="Say hello to start the conversation!"
                />
              </View>
            }
          />
        )}

        <View style={[styles.inputArea, { paddingBottom: 10 + insets.bottom }]}>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="Type a message..."
            placeholderTextColor={Color.textGray}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, !text.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!text.trim() || sending}
            activeOpacity={0.6}
            accessibilityLabel="Send message"
            accessibilityRole="button">
            <Ionicons name="send" size={20} color={Color.colorWhite} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    height: '14%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: '6%'
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: FontFamily.nunitoBold,
    fontWeight: 'bold',
    color: Color.colorWhite
  },
  chatArea: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageList: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    transform: [{ scaleY: -1 }]
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    color: Color.textGray
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    marginVertical: 4,
  },
  ownBubble: {
    alignSelf: 'flex-end',
    backgroundColor: Color.blue,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4
  },
  otherBubble: {
    alignSelf: 'flex-start',
    backgroundColor: Color.lightGray,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 4
  },
  senderName: {
    fontSize: 12,
    fontFamily: FontFamily.nunitoMedium,
    color: Color.textGray,
    marginBottom: 2
  },
  messageText: {
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    lineHeight: 22
  },
  ownText: {
    color: Color.colorWhite
  },
  otherText: {
    color: Color.textDark
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'right'
  },
  ownTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)'
  },
  otherTimestamp: {
    color: Color.textGray
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Color.dividerGray,
    backgroundColor: Color.colorWhite
  },
  textInput: {
    flex: 1,
    backgroundColor: Color.lightGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    maxHeight: 100,
    marginRight: 8
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.blue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButtonDisabled: {
    backgroundColor: Color.dividerGray
  }
});

export default Chat;
