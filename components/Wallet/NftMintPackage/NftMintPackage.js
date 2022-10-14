import React from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';
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
    <View style={styles.container}>
      <LinearGradient
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
      </LinearGradient>
      {/* <View style={{...styles.top, backgroundColor: data.bg}}>
       
      </View> */}
      <View style={styles.bottom}>
        <LinearTextGradient
          style={styles.gradientText}
          locations={[0, 1]}
          colors={[theme.COLORS.primary, theme.COLORS.secondary]}
          start={{x: 0, y: 0}}
          end={{x: 0.99, y: 0}}>
          <Text>{data.price}/mo</Text>
        </LinearTextGradient>

        <View style={styles.perks}>
          <Image source={assets.tickGreen} />
          <Text style={styles.perkText}>
            {data.number_of_messages} messages
          </Text>
        </View>
        <View style={{...styles.perks, marginVertical: 12}}>
          <Image source={assets.tickGreen} />
          <Text style={styles.perkText}>
            {data.number_of_seconds} Call seconds
          </Text>
        </View>
        <View style={styles.perks}>
          <Image source={assets.tickGreen} />
          <Text style={styles.perkText}>High speed data</Text>
        </View>

        <Button
          label={data.id === selected?.id ? 'Selected' : 'Select'}
          style={{
            ...styles.outlinedButton,
            backgroundColor:
              data.id === selected?.id
                ? theme.COLORS.primary
                : theme.COLORS.white,
          }}
          labelStyle={{
            ...styles.label,
            color:
              data.id === selected?.id
                ? theme.COLORS.white
                : theme.COLORS.primary,
          }}
          onPress={() => dispatch.sfts.setSelected(data)}
        />
      </View>
    </View>
  );
};

export default NftMintPackage;

const styles = StyleSheet.create({
  container: {},
  top: {
    backgroundColor: '#4A4A5D',
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
    ...theme.TYPOGRAPHY.h3,
    color: theme.COLORS.white,
    marginLeft: 12,
  },
  bottom: {
    borderWidth: 1,
    borderColor: '#BFEFDA',
    backgroundColor: '#BFEFDA40',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.COLORS.primary,
    marginTop: 16,
  },
  label: {
    color: theme.COLORS.primary,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  gradientText: {
    ...theme.TYPOGRAPHY.h3,
    fontSize: 24,
    marginBottom: 16,
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
});
