import React, {useEffect} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Pressable,
  StatusBar,
  Platform,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import NftMintPackage from '../../../components/Wallet/NftMintPackage/NftMintPackage';
import Button from '../../../components/GButton/GButton';
import theme from '../../../theme';
import assets from '../../../assets';

const isIos = Platform.OS === 'ios';

const packages = [
  {
    bg: ['#4A4A5D', '#4A4A5D'],
    logo: assets.rare,
    title: 'Rare Bundles',
  },
  {
    bg: ['#FE9901', '#FE9901'],
    logo: assets.star,
    title: 'Epic Bundles',
  },
  {
    bg: [theme.COLORS.primary, theme.COLORS.secondary],
    logo: assets.starLeg,
    title: 'Legendary Bundles',
  },
];

const MintPackages = ({navigation}) => {
  const dispatch = useDispatch();

  const sfts = useSelector(state => state.sfts.sftsPackages);
  const selected = useSelector(state => state.sfts.selected);
  const loading = useSelector(state => state.sfts.loading);

  const handleClick = () => {
    dispatch.sfts.buySftPackage({navigation});
  };

  useEffect(() => {
    dispatch.sfts.getSftsPackages();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      {!isIos && (
        <View style={{width: '100%', height: StatusBar.currentHeight}}></View>
      )}
      <View style={styles.container}>
        <Text style={styles.title}>Select Minting SFT's Packages</Text>
        <Pressable>
          <Text style={styles.question}>What is the semi-fungible token?</Text>
        </Pressable>
        <FlatList
          style={styles.list}
          data={sfts.map((sft, i) => ({...sft, ...packages[i]}))}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View style={{marginVertical: index === 0 || index === 2 ? 0 : 24}}>
              <NftMintPackage data={item} />
            </View>
          )}
        />
        <Button label="Done" loading={loading} onPress={handleClick} />
      </View>
    </SafeAreaView>
  );
};

export default MintPackages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    ...theme.TYPOGRAPHY.h3,
    fontWeight: '700',
    color: theme.COLORS.black,
  },
  list: {
    flexGrow: 1,
    marginVertical: 24,
    width: '100%',
  },
  question: {
    marginTop: 8,
    ...theme.TYPOGRAPHY.body2,
    fontFamily: 'Inter',
    color: theme.COLORS.primary,
  },
});
