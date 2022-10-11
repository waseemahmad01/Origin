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

const Privacy = ({navigation}) => {
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
              <Text style={styles.headTitle}>Privacy</Text>
            </Pressable>
          </View>
        </View>
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
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Privacy;

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...theme.TYPOGRAPHY.h3,
    fontSize: 18,
    fontWeight: '500',
    color: '#1D1D35',
  },
  subtitle: {
    ...theme.TYPOGRAPHY.body2,
    marginTop: 12,
    color: '#6E6E7E',
    lineHeight: 24,
    marginBottom: 24,
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 19,
  },
  key: {
    ...theme.TYPOGRAPHY.subtitle1,
    fontWeight: '400',
    color: '#1D1D35',
  },
  value: {
    ...theme.TYPOGRAPHY.body2,
  },
});
