import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Pressable,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import assets from '../../../assets';
import theme from '../../../theme';

const isIos = Platform.OS === 'ios';

const Privacy = ({ navigation }) => {
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
          <Text style={styles.messageText}>Privacy Policy</Text>
          <View></View>
        </View>
        <LinearGradient colors={['#fff', "#FEF7F7", '#FCEBEF',]} style={styles.body}>

          <View style={styles.bottom}>
            <Text style={styles.title}>Who can see my Info</Text>
            <Text style={styles.subtitle}>
              If you don’t share your last seen, you won’t be able to see other
              people’s last seen
            </Text>
            <View style={styles.filter}>
              <Text style={styles.key}>Last seen</Text>
              <Text style={styles.value}>Value</Text>
            </View>
            <View style={styles.filter}>
              <Text style={styles.key}>Profile photo</Text>
              <Text style={styles.value}>Value</Text>
            </View>
            <View style={styles.filter}>
              <Text style={styles.key}>About</Text>
              <Text style={styles.value}>Value</Text>
            </View>
            <View style={styles.filter}>
              <Text style={styles.key}>Status</Text>
              <Text style={styles.value}>Value</Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate('Blocked')}
              style={styles.filter}>
              <Text style={styles.key}>Blocked persons</Text>
              <Text style={styles.value}>8 Persons</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Privacy;

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 19,
  },
  key: {
    color: '#63798B',
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'Inter',
    marginLeft: 5,
  },
  value: {
    color: '#0E0E2F',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Inter',
  },
});
