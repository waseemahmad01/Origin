import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import assets from '../../../assets';
import theme from '../../../theme';

const isIos = Platform.OS === 'ios';

const AssetsTab = () => {
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.assetContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.iconContainer}>
                <Image
                  source={assets.gCoin}
                  style={{height: 20, width: 20}}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.title}>10,000 Gcoins</Text>
            </View>
            <Pressable style={styles.btn}>
              <Text style={styles.transferText}>Transfer</Text>
            </Pressable>
          </View>
          <View style={styles.assetContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.iconContainer}>
                <Image
                  source={assets.simpleStar}
                  style={{height: 20, width: 20}}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.title}>Legendary Badge</Text>
            </View>
            <Pressable style={styles.btn}>
              <Text style={styles.transferText}>Transfer</Text>
            </Pressable>
          </View>
          <View style={styles.assetContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.iconContainer}>
                <Image
                  source={assets.file}
                  style={{height: 20, width: 20}}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.title}>2,000 Gcreds</Text>
            </View>
            <Pressable style={styles.btn}>
              <Text style={styles.transferText}>Transfer</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
      {isIos && <View style={{height: 80}}></View>}
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
    backgroundColor: '#F5FCF9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48 / 2,
  },
  title: {
    ...theme.TYPOGRAPHY.body1,
    lineHeight: 26,
    fontWeight: '500',
    fontFamily: 'Inter',
    marginLeft: 16,
  },
  transferText: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 18,
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: '#F5FCF9',
    borderRadius: 16,
  },
});
