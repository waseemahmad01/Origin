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
import AsyncStorage from '@react-native-async-storage/async-storage';

import assets from '../../assets';
import theme from '../../theme';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const isIos = Platform.OS === 'ios' ? true : false;

const data = [
  {
    id: 0,
    title: 'Connect with your friends',
    text: 'on a secure network',
    img: assets.onBoarding1,
  },
  {
    id: 1,
    title: 'Communicate with',
    text: 'your family',
    img: assets.onBoarding2,
  },
  {
    id: 2,
    title: 'Never miss a',
    text: 'moment',
    img: assets.onBoarding3,
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
      navigation.navigate('Notification');
      return;
    }
    const newActiveIndex = activeSlide + 1;
    const offset = newActiveIndex * width;
    slider.current.scrollToOffset({offset});
    setActiveSlide(newActiveIndex);
  };

  return (
    <View style={{height}}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={styles.paginationContainer}></View>
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
            {/* <View style={styles.layer}>
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
                        ? () => {
                            AsyncStorage.setItem('visited', 'true');
                            navigation.reset({
                              index: 0,
                              routes: [{name: 'Notification'}],
                            });
                          }
                        : goToNextSlide
                    }
                  />
                </View>
              </SafeAreaView>
            </View> */}
          </ImageBackground>
        )}
      />
      <View style={styles.content}>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              ...styles.contentView,
              paddingTop: isIos ? 0 : StatusBar.currentHeight,
            }}>
            <Text style={styles.skipBtn}>Skip</Text>
            <View style={styles.whiteBox}>
              <Text style={styles.text}>
                {data[activeSlide].title}{' '}
                <Text style={{color: theme.COLORS.blue}}>
                  {data[activeSlide].text}
                </Text>
              </Text>
              <Button
                label={activeSlide === 2 ? 'Get Started' : 'Next'}
                onPress={goToNextSlide}
              />
              <View
                style={{
                  justifyContent: 'center',
                  marginTop: 16,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    ...styles.indicator,
                    backgroundColor:
                      activeSlide === 0
                        ? theme.COLORS.green
                        : theme.COLORS.grey500,
                  }}></View>
                <View
                  style={{
                    ...styles.indicator,
                    marginHorizontal: 12,
                    backgroundColor:
                      activeSlide === 1
                        ? theme.COLORS.green
                        : theme.COLORS.grey500,
                  }}></View>
                <View
                  style={{
                    ...styles.indicator,
                    backgroundColor:
                      activeSlide === 2
                        ? theme.COLORS.green
                        : theme.COLORS.grey500,
                  }}></View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
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
    height: 8,
    width: 8,
    borderRadius: 8 / 2,
    backgroundColor: theme.COLORS.grey500,
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    height,
    width,
    zIndex: 1,
    paddingBottom: isIos ? 0 : 24,
  },
  contentView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  skipBtn: {
    ...theme.TYPOGRAPHY.body1,
    marginTop: 23,
    color: theme.COLORS.white,
    fontWeight: '600',
  },
  whiteBox: {
    width: '100%',
    backgroundColor: theme.COLORS.white,
    marginTop: 'auto',
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  text: {
    ...theme.TYPOGRAPHY.h2,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 44,
    color: theme.COLORS.grey900,
  },
});
