import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import assets from '../../../assets';
import theme from '../../../theme';

const AboutUs = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#D8E3F3", '#B8F7FC',]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <SafeAreaView styles={{ flex: 1 }} >
        <View style={[styles.header]}>
          <Pressable hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }} onPress={() => navigation.goBack()}>
            <Image source={assets.backChat} />
          </Pressable>
          <Text style={styles.messageText}>About Us</Text>
          <View></View>
        </View>
        <LinearGradient colors={['#fff', "#FEF7F7", '#FCEBEF',]} style={styles.body}>
          <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, paddingBottom: 200 }}>
              <Text style={styles.title}>Know about freedom app</Text>
              <Image
                source={assets.aboutImage}
                style={{
                  width: '100%',
                  height: 163,
                }}
                resizeMode="cover"
              />
              <Text style={{ ...styles.subtitle, marginTop: 24, marginBottom: 20 }}>
                It is a long established fact that a reader will be distracted by
                the readable content of a page when looking at its layout. The
                point of using lorem ipsum is that it has a more normal
                distribution.
              </Text>
              <Text style={{ ...styles.title, marginBottom: 12 }}>Chatting</Text>
              <Text style={{ ...styles.subtitle }}>
                It is a long established fact that a reader will be distracted by
                the readable content of a page when looking.
              </Text>
              <Text style={{ ...styles.subtitle, marginTop: 20 }}>
                The point of using lorem ipsum is that it has a more normal
                distribution.
              </Text>
            </ScrollView>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AboutUs;

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
    fontWeight: '600',
    lineHeight: 28,
    fontFamily: 'Inter',
    color: '#2697FF',
    marginBottom: 15,
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
    color: '#63798B',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
});

