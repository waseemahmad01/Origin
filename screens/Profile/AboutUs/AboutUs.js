import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import assets from '../../../assets';
import theme from '../../../theme';

const isIos = Platform.OS === 'ios';

const AboutUs = ({navigation}) => {
  return (
    <LinearGradient
      style={{
        ...styles.gradient,
        paddingTop: isIos ? 0 : StatusBar.currentHeight,
      }}
      colors={[theme.COLORS.primary, theme.COLORS.secondary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <View style={styles.top}>
          <View
            style={{
              ...styles.row,
              justifyContent: 'space-between',
            }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={assets.chevronLeft}
                style={{
                  height: 20,
                  width: 8,
                  marginRight: 20,
                }}
                resizeMode="contain"
              />
              <Text style={styles.headTitle}>About us</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.bottom}>
          <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            <Text style={styles.title}>Know about freedom app</Text>
            <Image
              source={assets.aboutImage}
              style={{
                width: '100%',
                height: 163,
              }}
              resizeMode="cover"
            />
            <Text style={{...styles.subtitle, marginTop: 24, marginBottom: 20}}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using lorem ipsum is that it has a more normal
              distribution.
            </Text>
            <Text style={{...styles.title, marginBottom: 12}}>Chatting</Text>
            <Text style={{...styles.subtitle}}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking.
            </Text>
            <Text style={{...styles.subtitle, marginTop: 20}}>
              The point of using lorem ipsum is that it has a more normal
              distribution.
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  gradient: {flex: 1},
  top: {
    paddingHorizontal: 24,
    marginTop: 27.74,
    paddingBottom: 19,
  },
  headTitle: {
    ...theme.TYPOGRAPHY.h3,
    fontWeight: '700',
    color: theme.COLORS.white,
  },
  bottom: {
    paddingHorizontal: 24,
    flexGrow: 1,
    backgroundColor: theme.COLORS.white,
    paddingTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 28,
    fontFamily: 'Inter',
    color: '#1D1D35',
    marginBottom: 24,
  },
  question: {
    width: '100%',
    backgroundColor: '#EBFAF3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginBottom: 16,
  },
  questionText: {
    ...theme.TYPOGRAPHY.body2,
    color: '#1D1D35',
  },
  subtitle: {
    ...theme.TYPOGRAPHY.body2,
    lineHeight: 24,
  },
});
