import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ChatMessage = ({ msg, my }) => {
  return (
    <View
      style={{ ...styles.container, flexDirection: my ? 'row-reverse' : 'row' }}>
      <LinearGradient
        style={{
          ...styles.messageContainer,
        }}
        colors={
          my ? ['#2697FF', '#7AD5FF'] : ['#63798B', '#63798B']}>
        <Text
          style={{
            ...styles.messageText,
            color: "white"
          }}>
          {msg.message}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageContainer: {
    maxWidth: '70%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  messageText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'Inter',
  },
});
