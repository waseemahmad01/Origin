import React, {useState, useEffect, useRef} from 'react';

import {Pressable, View, StyleSheet, Animated, Easing} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import theme from '../../theme';

const Checkbox = () => {
  const [active, setActive] = useState(false);

  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: active ? 1 : 0,
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [active]);
  return (
    <Pressable onPress={() => setActive(!active)}>
      <LinearGradient
        style={styles.container}
        colors={[
          active ? theme.COLORS.primary : '#EDEDEF',
          active ? theme.COLORS.secondary : '#EDEDEF',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Animated.View
          style={{
            ...styles.indiCator,
            left: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [1.42, 15.42],
            }),
          }}></Animated.View>
      </LinearGradient>
    </Pressable>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    height: 22,
    width: 36,
    backgroundColor: '#EDEDEF',
    borderRadius: 22,
    position: 'relative',
  },
  indiCator: {
    position: 'absolute',
    height: 19.6,
    width: 19.16,
    borderRadius: 19.16 / 2,
    backgroundColor: theme.COLORS.white,
    left: 1.42,
    top: 1.42,
  },
});
