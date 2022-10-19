import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Modal,
  Pressable,
  StatusBar,
  Platform,
  Alert,
  ImageBackground,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {useDispatch, useSelector} from 'react-redux';
import {LinearTextGradient} from 'react-native-text-gradient';
import Button from '../../../components/Button/Button';
import assets from '../../../assets';
import theme from '../../../theme';
import {truncateString} from '../../../utils';

const isIos = Platform.OS === 'ios';

const WalletGeneration = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.wallet.loading);
  const walletAddress = useSelector(state => state.wallet.publicAddress);
  const [showModal, setShowModal] = useState(false);

  const handleCopyAddress = val => {
    Alert.alert('Success', 'Wallet address copied to clipboard');

    Clipboard.setString(val);
  };

  const handleGenerateWallet = () => {
    dispatch.wallet.createWallet({setShowModal});
  };
  const handleGetRewards = () => {
    dispatch.wallet.getRewardTokens({navigation, setShowModal});
  };

  return (
    <>
      {!showModal && (
        <ImageBackground
          source={assets.background}
          resizeMode="cover"
          style={styles.imageBackground}>
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingTop: isIos ? 0 : StatusBar.currentHeight,
            }}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <ImageBackground
              style={styles.gradientContainer}
              source={assets.genWalletBg}>
              <Image
                style={{marginTop: '-35%'}}
                resizeMode="contain"
                source={assets.walletGenerate}
              />
              <Text style={styles.title}>Generate Wallet</Text>
              <Text style={styles.subtitle}>
                Generate your wallet and get{' '}
                <Text style={{fontWeight: '600'}}>10,000 Gcoins</Text> for your
                very first wallet.
              </Text>
              <View style={styles.buttonContainer}>
                <Button
                  label="Generate Origen Wallet"
                  onPress={handleGenerateWallet}
                  loading={loading}
                />
              </View>
            </ImageBackground>
          </SafeAreaView>
        </ImageBackground>
      )}

      <Modal visible={showModal} transparent={true} animationType="fade">
        <ImageBackground
          source={assets.background}
          resizeMode="cover"
          style={{flex: 1}}>
          <Pressable style={styles.modal}>
            <View style={styles.modalView}>
              <Image source={assets.reward} />
              <Text
                style={{
                  ...theme.TYPOGRAPHY.h3,
                  color: theme.COLORS.blue,
                  marginTop: 32,
                }}>
                Get Your Rewards!
              </Text>
              <Text style={{...styles.subtitle}}>
                Press confirm to received{' '}
                <Text style={{fontWeight: '600'}}>10,000 Gcoins</Text> for your
                very first wallet.
              </Text>

              <View style={{width: '100%', marginTop: 32}}>
                <Button
                  label="Confirm 10,000 Gcoins"
                  onPress={handleGetRewards}
                  loading={loading}
                />
              </View>
            </View>
          </Pressable>
        </ImageBackground>
      </Modal>
    </>

    // <>
    //   <View style={{flex: 1, backgroundColor: theme.COLORS.white}}>
    //     <SafeAreaView style={{flex: 1}}>
    //       <StatusBar translucent={true} backgroundColor="transparent" />
    //       <View
    //         style={{
    //           ...styles.main,
    //           marginTop: isIos ? 0 : StatusBar.currentHeight,
    //         }}>
    //         <Text style={styles.title}>Wallet</Text>
    //       </View>
    //       <View style={styles.infoContainer}>
    //         <Image source={assets.walletGenerate} />

    //         <LinearTextGradient
    //           style={styles.gradientText}
    //           locations={[0, 1]}
    //           colors={[theme.COLORS.primary, theme.COLORS.secondary]}
    //           start={{x: 0, y: 0}}
    //           end={{x: 1, y: 0}}>
    //           <Text>10,000 Gcoins Rewards!</Text>
    //         </LinearTextGradient>
    //         <Text style={styles.subtitle}>
    //           Generate your wallet so that you can trade or send the token and
    //           received 10,000 Gcoins for your very first wallet.
    //         </Text>

    //         <View style={styles.buttonContainer}>
    //           <GButton
    //             label="Generate Origen Wallet"
    //             onPress={handleGenerateWallet}
    //             loading={loading}
    //             // onPress={() => setShowModal(true)}
    //           />
    //         </View>
    //       </View>
    //     </SafeAreaView>
    //   </View>

    // </>
  );
};

export default WalletGeneration;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  gradientContainer: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.primary,
  },
  main: {
    paddingHorizontal: 24,
  },
  title: {
    ...theme.TYPOGRAPHY.h3,
    marginTop: 27,
    color: theme.COLORS.blue,
  },
  infoContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCF9',
  },
  gradientText: {
    ...theme.TYPOGRAPHY.h3,
    marginTop: -25,
  },
  subtitle: {
    ...theme.TYPOGRAPHY.body1,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 8,
    color: theme.COLORS.grey700,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 32,
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalView: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#F5FCF9',
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
  },
});
