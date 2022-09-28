import React, {useState, useRef} from 'react';

import {
  ImageBackground,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';

import Button from '../../components/Button/Button';

import assets from '../../assets';
import theme from '../../theme';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const isIos = Platform.OS === 'ios' ? true : false;

const data = [
  {
    id: 0,
    title: 'Connect with your friends on a secure network',
    img: assets.onBoarding1,
  },
  {
    id: 1,
    title: 'Communicate with your family',
    img: assets.onBoarding1,
  },
  {
    id: 2,
    title: 'Never miss a moment',
    img: assets.onBoarding2,
  },
];

const Onboarding = ({navigation}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slider = useRef(null);

  const onSlideUpdate = e => {
    const contentOffSetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffSetX / width);
    setActiveSlide(currentIndex);
  };

  const goToNextSlide = () => {
    if (activeSlide === 2) {
      return;
    }
    const newActiveIndex = activeSlide + 1;
    const offset = newActiveIndex * width;
    slider.current.scrollToOffset({offset});
    setActiveSlide(newActiveIndex);
  };

  return (
    <View style={{height}}>
      <View style={styles.paginationContainer}>
        <View
          style={{
            ...styles.indicator,
            backgroundColor:
              activeSlide === 0 ? theme.COLORS.primary : theme.COLORS.white,
          }}></View>
        <View
          style={{
            ...styles.indicator,
            marginHorizontal: 21,
            backgroundColor:
              activeSlide === 1 ? theme.COLORS.primary : theme.COLORS.white,
          }}></View>
        <View
          style={{
            ...styles.indicator,
            backgroundColor:
              activeSlide === 2 ? theme.COLORS.primary : theme.COLORS.white,
          }}></View>
      </View>
      <FlatList
        ref={slider}
        style={{flex: 1, zIndex: 1}}
        data={data}
        horizontal
        onMomentumScrollEnd={onSlideUpdate}
        disableIntervalMomentum
        keyExtractor={item => item.id}
        pagingEnabled={true}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <ImageBackground source={item.img} style={{height, width}}>
            <View style={styles.layer}>
              <SafeAreaView style={{flex: 1}}>
                <View style={styles.main}>
                  <Text
                    style={{
                      ...theme.TYPOGRAPHY.h1,
                      color: theme.COLORS.white,
                    }}>
                    {item.title}
                  </Text>
                  <Button
                    label="Get Started"
                    onPress={
                      activeSlide === 2
                        ? () =>
                            navigation.reset({
                              index: 0,
                              routes: [{name: 'Notification'}],
                            })
                        : goToNextSlide
                    }
                  />
                </View>
              </SafeAreaView>
            </View>
          </ImageBackground>
        )}
      />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  layer: {
    position: 'absolute',
    zIndex: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    bottom: 0,
    height,
    width,
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: isIos ? 40 : 62,
    paddingTop: isIos ? 60 : 80,
  },
  paginationContainer: {
    position: 'absolute',
    top: isIos ? 60 : 30,
    width,
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 100,
  },
  indicator: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    backgroundColor: theme.COLORS.white,
  },
});
