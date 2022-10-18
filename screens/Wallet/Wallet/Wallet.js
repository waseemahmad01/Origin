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
  ImageBackground,
  Dimensions,
} from 'react-native';

import {packageImages} from '../../../app.config';

import Clipboard from '@react-native-community/clipboard';
import {object, string} from 'yup';

import theme from '../../../theme';
import assets from '../../../assets';
import AssetsTab from './AssetsTab';
import RewardsTab from './RewardsTab';
import InputField from '../../../components/InputField/InputField';
import Button from '../../../components/Button/Button';
import {truncateString} from '../../../utils';
import {validate} from '../../../utils/validations';

const isIos = Platform.OS === 'ios';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const schema = object({
  target_wallet_address: string().required().label('Wallet address'),
  amount_of_tokens: string().required().label('Amount'),
});

const Wallet = ({navigation}) => {
  const dispatch = useDispatch();
  const wallet = useSelector(state => state.wallet.publicAddress);
  const balance = useSelector(state => state.wallet.balance);
  const loading = useSelector(state => state.wallet.loading);
  const user = useSelector(state => state.auth.user);
  console.log('user ====> ', user);
  const activePackage = useSelector(state => state.sfts.active);
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
    <ImageBackground
      source={assets.background}
      resizeMode="cover"
      style={{flex: 1}}>
      <SafeAreaView style={{flexGrow: 1}}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />

        <View style={{...styles.bundle}}>
          <Image
            source={packageImages[activePackage?.name]}
            style={{
              width: 30,
              height: 30,
              marginRight: 8.5,
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              ...theme.TYPOGRAPHY.body1,
              lineHeight: 24,
              fontWeight: '600',
              fontSize: 18,
              color: theme.COLORS.grey900,
            }}>
            {activePackage?.name}
          </Text>
        </View>

        {/* <View style={[styles.header, styles.row]}>
          <Text style={styles.headerTitle}>Wallet</Text>

          <View style={styles.package}>
            <View style={styles.packageNameContainer}>
              <LinearTextGradient
                style={styles.gradientText}
                locations={[0, 1]}
                colors={[theme.COLORS.primary, theme.COLORS.secondary]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text>{activePackage?.name?.split(' ')[0]}</Text>
              </LinearTextGradient>
            </View>
            <LinearGradient
              style={styles.logoContainer}
              colors={[theme.COLORS.primary, theme.COLORS.secondary]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Image
                style={{
                  height: 16,
                  width: 16,
                }}
                resizeMode="contain"
                source={packageImages[activePackage?.name]}
              />
            </LinearGradient>
            </View>
          </View>
        </View> */}
        {/* <View style={styles.walletLogo}>
          <Image source={assets.wallet} />
        </View> */}
        <ImageBackground
          source={assets.containerBox}
          style={{
            marginHorizontal: 24,
            padding: 24,
            borderRadius: 24,
            overflow: 'hidden',
            marginTop: 20,
            marginBottom: 24,
            alignItems: 'center',
          }}>
          <Text
            style={{...theme.TYPOGRAPHY.body1, color: theme.COLORS.grey700}}>
            Your balance
          </Text>
          <Text style={styles.balance}>{balance} GCoins</Text>
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
          <View style={styles.actionContainer}>
            <View style={styles.action}>
              <IconButton
                style={{height: 60, width: 60}}
                onPress={() => setModalVisible(true)}>
                <Image
                  source={assets.plus}
                  resizeMode="center"
                  style={{
                    height: 32,
                    width: 32,
                  }}
                />
              </IconButton>
              <Text style={styles.actionText}>Add</Text>
            </View>
            <View style={styles.action}>
              <IconButton
                style={{height: 60, width: 60}}
                onPress={() => navigation.navigate('Send-Search')}>
                <Image
                  source={assets.send}
                  resizeMode="center"
                  style={{
                    height: 32,
                    width: 32,
                  }}
                />
              </IconButton>
              <Text style={styles.actionText}>Send</Text>
            </View>
            <View style={styles.action}>
              <IconButton
                onPress={() => navigation.navigate('Marketplace')}
                style={{height: 60, width: 60}}>
                <Image
                  source={assets.store}
                  resizeMode="center"
                  style={{
                    height: 32,
                    width: 32,
                  }}
                />
              </IconButton>
              <Text style={styles.actionText}>Marketplace</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.mainContainer}>
          {/* tabs */}
          <LinearGradient
            style={{
              borderRadius: 24,
              width: '100%',
              borderWidth: 1,
              borderColor: theme.COLORS.white,
            }}
            colors={['#FFFFFF', '#FFFFFF33']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <View style={styles.tabs}>
              <Pressable onPress={() => setTab(0)}>
                <LinearGradient
                  style={styles.tab}
                  colors={
                    tab === 0
                      ? [theme.COLORS.blue, theme.COLORS.blue]
                      : ['transparent', 'transparent']
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
                      ? [theme.COLORS.blue, theme.COLORS.blue]
                      : ['transparent', 'transparent']
                  }
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <Text
                    style={{
                      ...styles.tabLabel,
                      color:
                        tab === 1 ? theme.COLORS.white : theme.COLORS.grey700,
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
                      ? [theme.COLORS.blue, theme.COLORS.blue]
                      : ['transparent', 'transparent']
                  }
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <Text
                    style={{
                      ...styles.tabLabel,
                      color:
                        tab === 2 ? theme.COLORS.white : theme.COLORS.grey700,
                    }}>
                    Rewards
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          </LinearGradient>

          {/* tabs view */}
          <View style={styles.tabsView}>
            {tab === 0 && <TransactionsTab />}
            {tab === 1 && <AssetsTab />}
            {tab === 2 && <RewardsTab />}
          </View>
        </View>
      </SafeAreaView>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modal}>
          <View style={{...styles.modalContent, height: add ? '100%' : 'auto'}}>
            {add ? (
              <ImageBackground
                source={assets.background}
                style={{
                  height,
                  width,
                  position: 'absolute',
                }}>
                <SafeAreaView style={{flex: 1}}>
                  <View
                    style={{
                      paddingHorizontal: 24,

                      flex: 1,
                    }}>
                    <ImageBackground
                      source={assets.containerBox}
                      style={{
                        flex: 1,
                        marginBottom: 24,
                        marginTop: isIos ? 40 : 40 + StatusBar.currentHeight,
                        borderRadius: 24,
                        overflow: 'hidden',
                        alignItems: 'center',
                        padding: 24,
                      }}>
                      <View style={{alignItems: 'center'}}>
                        <Image
                          source={assets.success2}
                          style={{marginTop: 44, marginBottom: 51}}
                        />

                        <Text style={styles.transactTitle}>
                          Transaction Successful
                        </Text>

                        <Text style={styles.subtitle}>
                          You just added
                          <Text
                            style={{
                              fontWeight: '600',
                              color: theme.COLORS.grey900,
                            }}>
                            5.00 Gcoins
                          </Text>{' '}
                          to your wallet from this wallet{' '}
                          <Text
                            style={{
                              fontWeight: '600',
                              color: theme.COLORS.grey900,
                            }}>
                            @johnsmith 0x...4A1F
                          </Text>
                        </Text>
                      </View>
                      <View style={{width: '100%', marginTop: 'auto'}}>
                        <Button
                          label="Done"
                          onPress={() => {
                            setAdd(false);
                            setModalVisible(false);
                          }}
                        />
                      </View>
                    </ImageBackground>
                  </View>
                </SafeAreaView>
              </ImageBackground>
            ) : (
              <>
                <Text style={styles.modalTitle}>Add Gcoins</Text>
                <View style={{width: '100%'}}>
                  <View>
                    <InputField
                      label="Enter Your Wallet Address (0x….)"
                      value={formData.target_wallet_address}
                      onChangeText={text =>
                        handleChange(text, 'target_wallet_address')
                      }
                      error={errors?.target_wallet_address}
                    />
                  </View>
                  <View style={{marginTop: 20}}>
                    <InputField
                      label="Amount"
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
                    source={assets.close}
                    style={{
                      height: 24,
                      width: 24,
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
    </ImageBackground>
  );
};

export default Wallet;

const styles = StyleSheet.create({
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
    // backgroundColor: '#ffffff',
    flexGrow: 1,
    // paddingTop: 76,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  walletAddress: {
    backgroundColor: theme.COLORS.blue,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletAddressText: {
    ...theme.TYPOGRAPHY.body2,
    fontWeight: '500',
    color: theme.COLORS.white,
  },
  balance: {
    ...theme.TYPOGRAPHY.h2,
    lineHeight: 44,
    fontWeight: '700',
    color: theme.COLORS.grey900,
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'space-between',
    width: '100%',
  },
  action: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 8,
    color: theme.COLORS.grey900,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  tabs: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 23,
  },
  tabLabel: {
    ...theme.TYPOGRAPHY.body1,
    lineHeight: 24,
    fontWeight: '600',
  },
  tabsView: {
    flexGrow: 1,
    width: '100%',
    marginTop: 16,
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
    ...theme.TYPOGRAPHY.h3,
    fontWeight: '700',
    lineHeight: 32,
    fontFamily: 'Inter',
    marginBottom: 24,
    color: theme.COLORS.blue,
  },
  closeButton: {
    position: 'absolute',

    top: 16,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  transactTitle: {
    ...theme.TYPOGRAPHY.h3,

    fontWeight: '700',
    fontFamily: 'Inter',
    marginBottom: 8,
    color: theme.COLORS.green,
  },
  subtitle: {
    ...theme.TYPOGRAPHY.body1,
    fontWeight: '400',
    color: theme.COLORS.grey700,
    lineHeight: 24,
    textAlign: 'center',
  },
  bundle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: isIos ? 27 : 27 + StatusBar.currentHeight,
  },
});
