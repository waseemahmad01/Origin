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

const Help = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#D8E3F3", '#B8F7FC',]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <SafeAreaView styles={{ flex: 1 }} >
        <View style={[styles.header]}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={assets.backChat} />
          </Pressable>
          <Text style={styles.messageText}>Help</Text>
          <View></View>
        </View>
        <LinearGradient colors={['#fff', "#FEF7F7", '#FCEBEF',]} style={styles.body}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
            <Text style={styles.title}>FAQ</Text>

            <Text style={styles.subtitle}>
              If you don’t share your last seen, you won’t be able to see other people’s last seen
            </Text>

            <View style={styles.question}>
              <Text style={styles.questionText}>
                How will I do black mood screens?
              </Text>
              <Image source={assets.addBlackIcon} />
            </View>
            <View style={styles.question}>
              <Text style={styles.questionText}>
                Can I add any person from contacts?
              </Text>
              <Image source={assets.addBlackIcon} />
            </View>
            <View style={styles.question}>
              <Text style={styles.questionText}>
                How to add people in freedom?
              </Text>
              <Image source={assets.addBlackIcon} />
            </View>
            <View style={styles.question}>
              <Text style={styles.questionText}>
                Is it translating voice in this app?
              </Text>
              <Image source={assets.addBlackIcon} />
            </View>
            <View style={styles.question}>
              <Text style={styles.questionText}>
                Auto translate is working?
              </Text>
              <Image source={assets.addBlackIcon} />
            </View>
            <View style={styles.question}>
              <Text style={styles.questionText}>
                Can I log out of freedom?
              </Text>
              <Image source={assets.addBlackIcon} />
            </View>
            <View style={styles.question}>
              <Text style={styles.questionText}>
                How to select voice language?
              </Text>
              <Image source={assets.addBlackIcon} />
            </View>
            <View style={styles.question}>
              <Text style={styles.questionText}>
                How to change my password?
              </Text>
              <Image source={assets.addBlackIcon} />
            </View>
            <View style={styles.question}>
              <Text style={styles.questionText}>How to use freedom app?</Text>
              <Image source={assets.addBlackIcon} />
            </View>
            <View style={{ height: 200 }}></View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Help;

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 24,
    marginTop: 10,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textNormal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0E0E2F',
    fontFamily: 'Inter',
  },
  messageText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3482',
    fontFamily: 'Inter',
    marginRight: 15
  },
  body: {
    height: '100%',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -10
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
    fontFamily: 'Inter',
    color: '#2697FF',
    marginBottom: 15,
  },
  subtitle: {
    color: '#63798B',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 20,
  },
  question: {
    width: '100%',
    height: 48,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#DEE5EB',
    borderRadius: 24,
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
