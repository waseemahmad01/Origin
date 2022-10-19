import React, {useCallback, useState} from 'react';

import {useFocusEffect} from '@react-navigation/native';

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  Pressable,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';

import assets from '../../../assets';
import theme from '../../../theme';
import {userCallHistory} from '../../../api';

const isIos = Platform.OS === 'ios';

const CallDetails = ({navigation, route}) => {
  const {callee} = route.params;
  console.log('newxkansldv ===>', callee);

  const [history, setHistory] = useState([]);

  const handleGetCallHistory = async () => {
    try {
      const {data} = await userCallHistory(callee.phone_number);
      setHistory(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useFocusEffect(
    useCallback(() => {
      handleGetCallHistory();
    }, []),
  );
  return (
    <ImageBackground
      resizeMode="cover"
      source={assets.background}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={assets.chevronLeft}
                style={{
                  height: 32,
                  width: 32,
                }}
              />
            </Pressable>
            <Text style={styles.headerTitle}>Details</Text>
            <View style={{width: 32}} />
          </View>
        </View>
        <ImageBackground source={assets.bgg} style={styles.body}>
          <View style={{...styles.transactionDetails, paddingHorizontal: 24}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  source={assets.user}
                  style={{height: 48, width: 48, borderRadius: 48 / 2}}
                  resizeMode="cover"
                />
              </View>
              <View style={{marginLeft: 16}}>
                <Text style={styles.transactionType}>{callee?.username}</Text>

                <Text style={styles.transactionInfo}>
                  {callee?.phone_number}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  ...styles.btn,
                  marginRight: 12,
                }}>
                <Image
                  source={assets.calls}
                  style={{
                    height: 24,
                    width: 24,
                  }}
                />
              </View>
              <View
                style={{
                  ...styles.btn,
                }}>
                <Image
                  source={assets.videoCamera}
                  style={{
                    height: 24,
                    width: 24,
                  }}
                />
              </View>
            </View>
          </View>
          <ImageBackground
            source={assets.containerBox}
            style={styles.mainContainer}>
            <ScrollView style={{flex: 1}}>
              <Text style={styles.title}>Today</Text>
              {history.map((call, i) => (
                <View
                  key={i}
                  style={{...styles.transactionDetails, marginBottom: 24}}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        ...styles.iconContainer,
                        backgroundColor: theme.COLORS.blue,
                      }}>
                      <Image
                        source={assets.incomingWhite}
                        style={{height: 24, width: 24}}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={{marginLeft: 16}}>
                      <Text
                        style={{
                          ...styles.transactionType,
                          fontSize: 16,
                          color: theme.COLORS.grey900,
                        }}>
                        Outgoing call
                      </Text>

                      <Text
                        style={{
                          ...styles.transactionInfo,
                          fontSize: 14,
                          color: theme.COLORS.grey700,
                          fontWeight: '400',
                        }}>
                        59 seconds . 36 GCoins
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      ...theme.TYPOGRAPHY.body2,
                      color: theme.COLORS.grey700,
                    }}>
                    1:27 PM
                  </Text>
                </View>
              ))}
            </ScrollView>
          </ImageBackground>
        </ImageBackground>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CallDetails;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: isIos ? 31 : 31 + StatusBar.currentHeight,
  },
  headerTitle: {
    ...theme.TYPOGRAPHY.h3,
    color: theme.COLORS.darkBlue,
    fontWeight: '700',
    lineHeight: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    paddingTop: 24,
    flexGrow: 1,
  },
  transactionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  transactionType: {
    ...theme.TYPOGRAPHY.body1,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Inter',
    color: theme.COLORS.darkBlue,
  },
  transactionInfo: {
    ...theme.TYPOGRAPHY.body1,
    fontWeight: '600',
    lineHeight: 18,
    color: theme.COLORS.blue,
    marginTop: 4,
  },
  amount: {
    ...theme.TYPOGRAPHY.body1,
    fontSize: 18,
    lineHeight: 24,
    color: theme.COLORS.grey900,
    fontWeight: '600',
  },
  btn: {
    height: 48,
    width: 48,
    borderRadius: 48 / 2,
    backgroundColor: theme.COLORS.pastelBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flexGrow: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    padding: 24,
    flexGrow: 1,
  },
  title: {
    ...theme.TYPOGRAPHY.body1,
    fontSize: 18,
    fontWeight: '600',
    color: theme.COLORS.grey500,
    marginBottom: 16,
  },
  iconContainer: {
    height: 48,
    width: 48,
    borderRadius: 48 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
