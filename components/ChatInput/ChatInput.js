import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import assets from '../../assets';
import theme from '../../theme';

const ChatInput = () => {
  return (
    <View style={styles.container}>
      <View style={styles.recordAudioContainer}>
        <Pressable>
          <Image
            source={assets.recordIcon}
            style={{
              height: 16,
              width: 11,
            }}
          />
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <Pressable style={styles.moodIcon}>
          <Image
            source={assets.mood}
            style={{
              height: 20,
              width: 20,
            }}
            resizeMode="cover"
          />
        </Pressable>

        <TextInput
          style={styles.input}
          placeholderTextColor="#6E6E7E"
          placeholder="Type message"
          multiline
        />
        <View style={styles.iconContainer}>
          <Pressable>
            <Image
              source={assets.clip}
              style={{
                height: 18,
                width: 16,
              }}
              resizeMode="cover"
            />
          </Pressable>
          <Pressable style={{marginLeft: 12}}>
            <Image
              source={assets.camera}
              style={{
                height: 17,
                width: 20,
              }}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flexGrow: 1,
    minHeight: 52,
    backgroundColor: '#F5FCF9',
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
    color: theme.COLORS.black,
    maxWidth: 240,
    paddingHorizontal: 12,
  },
  recordAudioContainer: {
    paddingHorizontal: 8,
  },
  moodIcon: {},
  iconContainer: {
    flexDirection: 'row',
  },
});
