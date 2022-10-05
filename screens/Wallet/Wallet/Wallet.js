import React, {useState, useEffect} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';
import IconButton from '../../../components/IconButton/IconButton';
import TransactionsTab from './TransactionsTab';
import {useSelector, useDispatch} from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
  Modal,
  Alert,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import Clipboard from '@react-native-community/clipboard';
import {object, string} from 'yup';

import theme from '../../../theme';
import assets from '../../../assets';
import AssetsTab from './AssetsTab';
import RewardsTab from './RewardsTab';
import Input from '../../../components/Input/Input';
import Button from '../../../components/GButton/GButton';

import {truncateString} from '../../../utils';
import {validate} from '../../../utils/validations';

const isIos = Platform.OS === 'ios';

const schema = object({
  target_wallet_address: string().required().label('Wallet address'),
  amount_of_tokens: string().required().label('Amount'),
});

const Wallet = ({navigation}) => {
  const dispatch = useDispatch();
  const wallet = useSelector(state => state.wallet.publicAddress);
  const balance = useSelector(state => state.wallet.balance);
  const loading = useSelector(state => state.wallet.loading);
  const [tab, setTab] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [add, setAdd] = useState(false);

  const [formData, setFormData] = useState({
    target_wallet_address: wallet || '',
    amount_of_tokens: '',
  });

  const [errors, setErrors] = useState(null);

  const handleChange = (text, name) => {
    setFormData(prev => ({...prev, [name]: text}));
    setErrors(prev => ({...prev, [name]: null}));
  };

  const handleCopyAddress = val => {
    Alert.alert('Success', 'Wallet address copied to clipboard');
    Clipboard.setString(val);
  };

  const handleGainToken = async () => {
    const validationErrors = await validate(schema, formData);
    if (validationErrors) {
      return setErrors(validationErrors);
    }
    dispatch.wallet.addTokens({formData, setAdd});
  };

  useEffect(() => {
    dispatch.wallet.getBalance();
    dispatch.users.getAllUsers();
  }, []);

  return (
    <>
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
            <TouchableOpacity
              onPress={() => handleCopyAddress(wallet)}
              style={styles.walletAddress}>
              <Text style={styles.walletAddressText}>
                {truncateString(wallet)}
              </Text>
              <Image
                source={assets.copyIcon}
                style={{
                  height: 16,
                  width: 16,
                  marginLeft: 8,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.balance}>{balance} GCoins</Text>
            <View style={styles.actionContainer}>
              <View style={styles.action}>
                <IconButton onPress={() => setModalVisible(true)}>
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
                <IconButton onPress={() => navigation.navigate('Send-Search')}>
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
              <Pressable
                style={{marginHorizontal: 12}}
                onPress={() => setTab(1)}>
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
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            {add ? (
              <>
                <Image source={assets.success2} style={{marginTop: 24}} />
                <LinearTextGradient
                  style={styles.transactTitle}
                  locations={[0, 1]}
                  colors={[theme.COLORS.primary, theme.COLORS.secondary]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <Text>Transaction Successful</Text>
                </LinearTextGradient>
                <Text style={styles.subtitle}>
                  You just added
                  <Text style={{fontWeight: '500'}}>5.00 Gcoins</Text> to your
                  wallet from this wallet{' '}
                  <Text style={{fontWeight: '500'}}>@johnsmith 0x...4A1F</Text>
                </Text>
                <View style={{width: '100%', marginTop: 48}}>
                  <Button
                    label="Done"
                    onPress={() => {
                      setAdd(false);
                      setModalVisible(false);
                    }}
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Add Gcoins</Text>
                <View style={{width: '100%'}}>
                  <View>
                    <Input
                      title="Enter Your Wallet Address (0x….)"
                      value={formData.target_wallet_address}
                      onChangeText={text =>
                        handleChange(text, 'target_wallet_address')
                      }
                      error={errors?.target_wallet_address}
                    />
                  </View>
                  <View style={{marginTop: 20}}>
                    <Input
                      title="Amount"
                      value={formData.amount_of_tokens}
                      onChangeText={text =>
                        handleChange(text, 'amount_of_tokens')
                      }
                      error={errors?.amount_of_tokens}
                      keyboardType="number-pad"
                    />
                  </View>
                  <View style={{marginTop: 24}}>
                    <Button
                      label="Send Me"
                      loading={loading}
                      onPress={handleGainToken}
                    />
                  </View>
                </View>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}>
                  <Image
                    source={assets.crossIcon}
                    style={{
                      height: 12,
                      width: 12,
                    }}
                    resizeMode="cover"
                  />
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
      {modalVisible && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: StatusBar.currentHeight,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}></View>
      )}
    </>
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
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    width: '100%',
    paddingBottom: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'relative',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  modalTitle: {
    ...theme.TYPOGRAPHY.h2,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 34,
    fontFamily: 'Inter',
    marginBottom: 24,
  },
  closeButton: {
    position: 'absolute',
    height: 32,
    width: 32,
    borderRadius: 32 / 2,
    backgroundColor: '#EDEDEF',
    top: 16,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  transactTitle: {
    ...theme.TYPOGRAPHY.h2,
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    marginBottom: 16,
    marginTop: -15,
  },
  subtitle: {
    ...theme.TYPOGRAPHY.subtitle1,
    fontWeight: '400',
    color: '#6E6E7E',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
