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

const Help = ({navigation}) => {
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
              <Text style={styles.headTitle}>Help</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.bottom}>
          <View>
            <Text style={styles.title}>FAQ</Text>
          </View>
          <View style={{flexGrow: 1}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
              <View style={styles.question}>
                <Text style={styles.questionText}>
                  How will I do black mood screens?
                </Text>
              </View>
              <View style={styles.question}>
                <Text style={styles.questionText}>
                  Can I add any person from contacts?
                </Text>
              </View>
              <View style={styles.question}>
                <Text style={styles.questionText}>
                  How to add people in freedom?
                </Text>
              </View>
              <View style={styles.question}>
                <Text style={styles.questionText}>
                  Is it translating voice in this app?
                </Text>
              </View>
              <View style={styles.question}>
                <Text style={styles.questionText}>
                  Auto translate is working?
                </Text>
              </View>
              <View style={styles.question}>
                <Text style={styles.questionText}>
                  Can I log out of freedom?
                </Text>
              </View>
              <View style={styles.question}>
                <Text style={styles.questionText}>
                  How to select voice language?
                </Text>
              </View>
              <View style={styles.question}>
                <Text style={styles.questionText}>
                  How to change my password?
                </Text>
              </View>
              <View style={styles.question}>
                <Text style={styles.questionText}>How to use freedom app?</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Help;

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
});
