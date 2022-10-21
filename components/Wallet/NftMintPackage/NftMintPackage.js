import React from 'react';

import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import {LinearTextGradient} from 'react-native-text-gradient';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../../Button/Button';

import assets from '../../../assets';
import theme from '../../../theme';

const NftMintPackage = ({data}) => {
  const dispatch = useDispatch();
  const selected = useSelector(state => state.sfts.selected);

  return (
    <ImageBackground source={assets.sftBg}>
      <View style={styles.container}>
        {/* <LinearGradient
          style={[styles.top]}
          colors={[data.bg[0], data.bg[1]]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <View style={styles.topInner}>
            <View style={styles.circle}>
              <Image source={data.logo} />
            </View>
            <Text style={styles.title}>{data.title}</Text>
          </View>
        </LinearGradient> */}
        {/* <View style={{...styles.top, backgroundColor: data.bg}}>
        
       
      </View> */}
        <View style={{alignItems: 'center', marginTop: '-18%'}}>
          <Image source={data.logo} resizeMode="contain" style={styles.icon} />
        </View>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.bottom}>
          <Text style={styles.gradientText}>GCoins {data.price}/month</Text>
          <View>
            <View style={{...styles.perks}}>
              <Image
                source={assets.checkBlue}
                style={{
                  height: 24,
                  width: 24,
                }}
              />
              <Text style={styles.perkText}>
                {data.number_of_messages} messages
              </Text>
            </View>
            <View style={{...styles.perks, marginVertical: 12}}>
              <Image
                source={assets.checkBlue}
                style={{
                  height: 24,
                  width: 24,
                }}
              />
              <Text style={styles.perkText}>
                {data.number_of_seconds} Call seconds
              </Text>
            </View>
            <View style={styles.perks}>
              <Image
                source={assets.checkBlue}
                style={{
                  height: 24,
                  width: 24,
                }}
              />
              <Text style={styles.perkText}>High speed data</Text>
            </View>
          </View>
          <Button
            label={data.id === selected?.id ? 'Selected' : 'Select'}
            style={{
              ...styles.outlinedButton,
              backgroundColor:
                data.id === selected?.id
                  ? theme.COLORS.darkGreen
                  : theme.COLORS.green,
            }}
            labelStyle={{
              ...styles.label,
              color: theme.COLORS.white,
            }}
            onPress={() => dispatch.sfts.setSelected(data)}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default NftMintPackage;

const styles = StyleSheet.create({
  top: {
    // backgroundColor: '#4A4A5D',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },
  topInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.COLORS.white,
  },
  title: {
    ...theme.TYPOGRAPHY.h2,
    color: theme.COLORS.darkBlue,
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 8,
    lineHeight: 44,
  },
  bottom: {
    // borderWidth: 1,
    // borderColor: '#BFEFDA',
    // backgroundColor: '#BFEFDA40',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  outlinedButton: {
    marginTop: 24,
  },
  label: {
    color: theme.COLORS.primary,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  gradientText: {
    ...theme.TYPOGRAPHY.h3,
    lineHeight: 32,
    marginBottom: 16,
    color: theme.COLORS.blue,
  },
  perks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  perkText: {
    marginLeft: 16,
    ...theme.TYPOGRAPHY.body2,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  icon: {
    width: 48,
  },
});
