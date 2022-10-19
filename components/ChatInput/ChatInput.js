import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import { sendMessage } from '../../api';
import assets from '../../assets';
import theme from '../../theme';


const ChatInput = ({ sendTo, refreshChat }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSendMessage = async () => {
    if (!message) return
    try {
      setLoading(true);
      await sendMessage({ sendTo, messageBody: message })
      setMessage("")
      refreshChat()
    } catch (err) {
      console.log('err - ', err)
    } finally {
      setLoading(false);
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
        <Pressable disabled={loading} style={styles.iconContainer} onPress={onSendMessage}>
          <Image
            style={{ width: 20, height: 20 }}
            source={assets.arrowRight}
            resizeMode="cover"
          />
        </Pressable>

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
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
    right: 20,
  },
  recordAudioContainer: {
    paddingHorizontal: 8,
  },
});
