import React, {useState} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';
import IconButton from '../../../components/IconButton/IconButton';
import TransactionsTab from './TransactionsTab';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
} from 'react-native';

const isIos = Platform.OS === 'ios';

import theme from '../../../theme';
import assets from '../../../assets';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AssetsTab from './AssetsTab';
import RewardsTab from './RewardsTab';

const Wallet = () => {
  const [tab, setTab] = useState(0);

  return (
    <LinearGradient
      style={{
        ...styles.gradient,
        paddingTop: isIos ? 0 : StatusBar.currentHeight,
      }}
      colors={[theme.COLORS.primary, theme.COLORS.secondary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <SafeAreaView style={{flexGrow: 1}}>
        <View style={[styles.header, styles.row]}>
          <Text style={styles.headerTitle}>Wallet</Text>

          <View style={styles.package}>
            <View style={styles.packageNameContainer}>
              <LinearTextGradient
                style={styles.gradientText}
                locations={[0, 1]}
                colors={[theme.COLORS.primary, theme.COLORS.secondary]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text>Legendary</Text>
              </LinearTextGradient>
            </View>
            <LinearGradient
              style={styles.logoContainer}
              colors={[theme.COLORS.primary, theme.COLORS.secondary]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Image source={assets.starLeg} />
            </LinearGradient>
            {/* </View> */}
          </View>
        </View>
        <View style={styles.walletLogo}>
          <Image source={assets.wallet} />
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.walletAddress}>
            <Text style={styles.walletAddressText}>0x9E7e...4A1F</Text>
            <Image
              source={assets.copyIcon}
              style={{
                height: 16,
                width: 16,
                marginLeft: 8,
              }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.balance}>10,000 GCoins</Text>
          <View style={styles.actionContainer}>
            <View style={styles.action}>
              <IconButton>
                <Image
                  source={assets.plus}
                  resizeMode="center"
                  style={{
                    height: 18,
                    width: 18,
                  }}
                />
              </IconButton>
              <Text style={styles.actionText}>Add</Text>
            </View>
            <View style={styles.action}>
              <IconButton>
                <Image
                  source={assets.send}
                  resizeMode="center"
                  style={{
                    height: 18,
                    width: 18,
                  }}
                />
              </IconButton>
              <Text style={styles.actionText}>Send</Text>
            </View>
            <View style={styles.action}>
              <IconButton>
                <Image
                  source={assets.store}
                  resizeMode="center"
                  style={{
                    height: 18,
                    width: 18,
                  }}
                />
              </IconButton>
              <Text style={styles.actionText}>Marketplace</Text>
            </View>
          </View>
          {/* tabs */}

          <View style={styles.tabs}>
            <Pressable onPress={() => setTab(0)}>
              <LinearGradient
                style={styles.tab}
                colors={
                  tab === 0
                    ? [theme.COLORS.primary, theme.COLORS.secondary]
                    : ['#F5FCF9', '#F5FCF9']
                }
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text
                  style={{
                    ...styles.tabLabel,
                    color: tab === 0 ? '#F5FCF9' : '#4A4A5D',
                  }}>
                  Transactions
                </Text>
              </LinearGradient>
            </Pressable>
            <Pressable style={{marginHorizontal: 12}} onPress={() => setTab(1)}>
              <LinearGradient
                style={styles.tab}
                colors={
                  tab === 1
                    ? [theme.COLORS.primary, theme.COLORS.secondary]
                    : ['#F5FCF9', '#F5FCF9']
                }
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text
                  style={{
                    ...styles.tabLabel,
                    color: tab === 1 ? '#F5FCF9' : '#4A4A5D',
                  }}>
                  Assets
                </Text>
              </LinearGradient>
            </Pressable>
            <Pressable onPress={() => setTab(2)}>
              <LinearGradient
                style={styles.tab}
                colors={
                  tab === 2
                    ? [theme.COLORS.primary, theme.COLORS.secondary]
                    : ['#F5FCF9', '#F5FCF9']
                }
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text
                  style={{
                    ...styles.tabLabel,
                    color: tab === 2 ? '#F5FCF9' : '#4A4A5D',
                  }}>
                  Rewards
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
          {/* tabs view */}
          <View style={styles.tabsView}>
            {tab === 0 && <TransactionsTab />}
            {tab === 1 && <AssetsTab />}
            {tab === 2 && <RewardsTab />}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  gradient: {
    height: '100%',
  },
  header: {
    paddingHorizontal: 24,
  },
  headerTitle: {
    ...theme.TYPOGRAPHY.h3,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: theme.COLORS.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  package: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  packageNameContainer: {
    backgroundColor: theme.COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    paddingRight: 20,
    borderRadius: 16,
  },
  gradientText: {
    ...theme.TYPOGRAPHY.body2,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  logoContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.COLORS.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -18,
  },
  walletLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: -98,
    marginBottom: '-25%',
    zIndex: 1,
    elevation: 1,
  },
  mainContainer: {
    backgroundColor: '#ffffff',
    flexGrow: 1,
    paddingTop: 76,
    alignItems: 'center',
  },
  walletAddress: {
    backgroundColor: '#F5FCF9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletAddressText: {
    ...theme.TYPOGRAPHY.body2,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#4A4A5D',
  },
  balance: {
    ...theme.TYPOGRAPHY.h2,
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#1D1D35',
    marginTop: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    marginVertical: 24,
    paddingHorizontal: 48,
    justifyContent: 'space-between',
    width: '100%',
  },
  action: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 8,
    color: '#4A4A5D',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  tabs: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 24,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 23,
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'Inter',
    lineHeight: 18,
    fontWeight: '400',
  },
  tabsView: {
    flexGrow: 1,
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 24,
  },
});
