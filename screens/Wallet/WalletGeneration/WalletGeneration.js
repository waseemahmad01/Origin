import React, {useState} from 'react';

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
} from 'react-native';
import {LinearTextGradient} from 'react-native-text-gradient';
import GButton from '../../../components/GButton/GButton';
import assets from '../../../assets';
import theme from '../../../theme';

const isIos = Platform.OS === 'ios';

const WalletGeneration = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <View style={{flex: 1, backgroundColor: theme.COLORS.white}}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar translucent={true} backgroundColor="transparent" />
          <View
            style={{
              ...styles.main,
              marginTop: isIos ? 0 : StatusBar.currentHeight,
            }}>
            <Text style={styles.title}>Wallet</Text>
          </View>
          <View style={styles.infoContainer}>
            <Image source={assets.walletGenerate} />

            <LinearTextGradient
              style={styles.gradientText}
              locations={[0, 1]}
              colors={[theme.COLORS.primary, theme.COLORS.secondary]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text>10,000 Gcoins Rewards!</Text>
            </LinearTextGradient>
            <Text style={styles.subtitle}>
              Generate your wallet so that you can trade or send the token and
              received 10,000 Gcoins for your very first wallet.
            </Text>
            <View style={styles.buttonContainer}>
              <GButton
                label="Generate Origen Wallet"
                onPress={() => setShowModal(true)}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
      <Modal visible={showModal} transparent={true} animationType="fade">
        <Pressable style={styles.modal} onPress={() => setShowModal(false)}>
          <View style={styles.modalView}>
            <Image source={assets.gift} />
            <LinearTextGradient
              style={[styles.gradientText]}
              locations={[0, 1]}
              colors={[theme.COLORS.primary, theme.COLORS.secondary]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text>Get Your Rewards!</Text>
            </LinearTextGradient>
            <Text style={styles.subtitle}>
              Press confirm to received 10,000 Gcoins for your very first
              wallet.
            </Text>
            <View style={{width: '100%', marginTop: 32}}>
              <GButton
                label="Confirm 10,000 Gcoins"
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('Face-Id-verify');
                }}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default WalletGeneration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.primary,
  },
  main: {
    paddingHorizontal: 24,
  },
  title: {
    ...theme.TYPOGRAPHY.h2,
    marginVertical: 20,
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
    ...theme.TYPOGRAPHY.subtitle1,
    textAlign: 'center',
    paddingHorizontal: 24,
    marginTop: 8,
    color: theme.COLORS.textSecondary,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 80,
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
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
});
