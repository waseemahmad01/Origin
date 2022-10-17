import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import assets from '../../../assets';
import theme from '../../../theme';

const AssetsTab = () => {
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.assetContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ImageBackground
                source={assets.iconBtnBg}
                style={styles.iconContainer}>
                <Image
                  source={assets.coin}
                  style={{height: 24, width: 24}}
                  resizeMode="cover"
                />
              </ImageBackground>
              <Text style={styles.title}>10,000 Gcoins</Text>
            </View>
            <Pressable style={styles.btn}>
              <Text style={styles.transferText}>Transfer</Text>
            </Pressable>
          </View>
          <View style={styles.assetContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ImageBackground
                source={assets.iconBtnBg}
                style={styles.iconContainer}>
                <Image
                  source={assets.creds}
                  style={{height: 24, width: 24}}
                  resizeMode="cover"
                />
              </ImageBackground>
              <Text style={styles.title}>2,000 Gcreds</Text>
            </View>
            <Pressable style={styles.btn}>
              <Text style={styles.transferText}>Transfer</Text>
            </Pressable>
          </View>
          <View style={styles.assetContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ImageBackground
                source={assets.iconBtnBg}
                style={styles.iconContainer}>
                <Image
                  source={assets.badge}
                  style={{height: 24, width: 24}}
                  resizeMode="cover"
                />
              </ImageBackground>
              <Text style={styles.title}>Epic Bundles</Text>
            </View>
            <Pressable style={styles.btn}>
              <Text style={styles.transferText}>Transfer</Text>
            </Pressable>
          </View>
          <View style={styles.assetContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ImageBackground
                source={assets.iconBtnBg}
                style={styles.iconContainer}>
                <Image
                  source={assets.badge}
                  style={{height: 24, width: 24}}
                  resizeMode="cover"
                />
              </ImageBackground>
              <Text style={styles.title}>100 SFTs</Text>
            </View>
            <Pressable style={styles.btn}>
              <Text style={styles.transferText}>Transfer</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default AssetsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  assetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48 / 2,
  },
  title: {
    ...theme.TYPOGRAPHY.body1,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'Inter',
    marginLeft: 16,
  },
  transferText: {
    ...theme.TYPOGRAPHY.body2,
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '600',
    lineHeight: 16,
    color: theme.COLORS.white,
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: theme.COLORS.green,
    borderRadius: 16,
  },
});
