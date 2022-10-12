import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import theme from '../../theme';
import assets from '../../assets';

const ChatMessage = ({msg}) => {
  const {my, text} = msg;
  return (
    <View
      style={{...styles.container, flexDirection: my ? 'row-reverse' : 'row'}}>
      <Image
        source={assets.user}
        style={{
          height: 24,
          width: 24,
        }}
      />
      <LinearGradient
        style={{
          ...styles.messageContainer,
          marginRight: my ? 8 : 0,
          marginLeft: my ? 0 : 8,
        }}
        colors={[
          my ? theme.COLORS.primary : '#EBFAF3',
          my ? theme.COLORS.secondary : '#EBFAF3',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text
          style={{
            ...styles.messageText,
            color: my ? theme.COLORS.white : '#1D1D35',
          }}>
          {text}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageContainer: {
    // flex: 1,
    maxWidth: '70%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    marginLeft: 8,
  },
  messageText: {
    ...theme.TYPOGRAPHY.body2,
    lineHeight: 20,
  },
});
