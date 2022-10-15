import React, {useState} from 'react';

import {View, Image, Pressable} from 'react-native';

import assets from '../../assets';
import theme from '../../theme';

const CheckBoxTic = () => {
  const [active, setActive] = useState(false);
  return (
    <Pressable onPress={() => setActive(!active)}>
      {active ? (
        <Image
          style={{
            height: 24,
            width: 24,
          }}
          source={assets.checkbox}
          resizeMode="cover"
        />
      ) : (
        <View
          style={{
            height: 24,
            width: 24,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: theme.COLORS.grey200,
            backgroundColor: theme.COLORS.white,
          }}></View>
      )}
    </Pressable>
  );
};

export default CheckBoxTic;
