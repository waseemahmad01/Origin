import React from 'react';

import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

import assets from '../../../assets';
import theme from '../../../theme';

const width = Dimensions.get('window').width;

const isIos = Platform.OS === 'ios';

const Marketplace = ({navigation}) => {
  return (
    <ImageBackground source={assets.background} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={{...styles.container}}>
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
            <Text style={styles.headerTitle}>Marketplace</Text>
            <View style={{width: 32}} />
          </View>
        </View>
        <ImageBackground
          source={assets.containerBox}
          resizeMode="cover"
          style={styles.body}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>NFTs</Text>
            <View style={styles.nftContainer}>
              <View style={styles.nftBlock}>
                <Image
                  source={assets.nft1}
                  style={{
                    width: '100%',
                    borderRadius: 8,
                  }}
                  resizeMode="contain"
                />
                <Text style={styles.nftTitle}>Crypto Kong</Text>
                <Text style={styles.creator}>Creature World</Text>
                <Text style={styles.price}>1.25 GCoins</Text>
              </View>
              <View style={styles.nftBlock}>
                <Image
                  style={{
                    width: '100%',
                    borderRadius: 8,
                  }}
                  resizeMode="contain"
                  source={assets.nft2}
                />
                <Text style={styles.nftTitle}>Pixel Punks</Text>
                <Text style={styles.creator}>Creature World</Text>
                <Text style={styles.price}>3.5 GCoins</Text>
              </View>
              <View style={styles.nftBlock}>
                <Image
                  source={assets.nft3}
                  style={{
                    width: '100%',
                    borderRadius: 8,
                  }}
                  resizeMode="contain"
                />
                <Text style={styles.nftTitle}>Sleepy Elephant</Text>
                <Text style={styles.creator}>Creature World</Text>
                <Text style={styles.price}>0.5 GCoins</Text>
              </View>
              <View style={styles.nftBlock}>
                <Image
                  style={{
                    width: '100%',
                    borderRadius: 8,
                  }}
                  resizeMode="contain"
                  source={assets.nft4}
                />
                <Text style={styles.nftTitle}>Cool Skeleton</Text>
                <Text style={styles.creator}>Creature World</Text>
                <Text style={styles.price}>3 GCoins</Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
        <View style={styles.hider}></View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Marketplace;

const styles = StyleSheet.create({
  container: {
    paddingTop: isIos ? 31 : 31 + StatusBar.currentHeight,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    ...theme.TYPOGRAPHY.h3,
    lineHeight: 32,
    color: theme.COLORS.darkBlue,
  },
  body: {
    flexGrow: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    padding: 24,
    zIndex: 2,
    elevation: 4,
  },
  hider: {
    position: 'absolute',
    backgroundColor: theme.COLORS.white,
    bottom: 0,
    width: '100%',
    height: 35,
    opacity: 0.25,
    zIndex: 0,
  },
  title: {
    ...theme.TYPOGRAPHY.body1,
    fontSize: 18,
    fontWeight: '600',
    color: theme.COLORS.grey500,
    marginBottom: 16,
  },
  nftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  nftBlock: {
    width: (width - 48) / 2 - 12,
    marginBottom: 24,
  },
  nftTitle: {
    ...theme.TYPOGRAPHY.body1,
    fontSize: 18,
    fontWeight: '600',
    color: theme.COLORS.grey900,
    marginTop: 8,
  },
  creator: {
    ...theme.TYPOGRAPHY.body2,
    fontWeight: '500',
    color: theme.COLORS.blue,
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 18,
  },
  price: {
    ...theme.TYPOGRAPHY.body1,
    fontWeight: '600',
    color: theme.COLORS.grey900,
    lineHeight: 22,
  },
});
