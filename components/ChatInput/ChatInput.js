import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import { sendMessage } from '../../api';
import assets from '../../assets';
import theme from '../../theme';


const ChatInput = ({ sendTo, refreshChat }) => {
  const [message, setMessage] = useState("");

  const onSendMessage = async () => {
    try {
      await sendMessage({ sendTo, messageBody: message })
      setMessage("")
      refreshChat()
    } catch (err) {
      console.log('err - ', err)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(val) => setMessage(val)}
          placeholderTextColor="#8FA8BD"
          placeholder="Type message"
          multiline
        />
        <View style={styles.iconContainer}>
          <Pressable style={{ marginLeft: 12 }} onPress={onSendMessage}>
            <Image
              style={{ width: 20, height: 20 }}
              source={assets.camera}
              resizeMode="cover"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexGrow: 1,
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#DEE5EB',
    flexDirection: 'row',
    borderRadius: 24,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flexGrow: 1,
    flexWrap: 'wrap',
    fontWeight: '400',
    fontFamily: 'Inter',
    width: '100%',
    color: theme.COLORS.black,
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
  },
  recordAudioContainer: {
    paddingHorizontal: 8,
  },
});
