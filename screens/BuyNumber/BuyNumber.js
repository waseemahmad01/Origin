import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {buyNumber, getAvailableNumbers} from '../../api';

import assets from '../../assets';
import Button from '../../components/Button/Button';
import GButton from '../../components/GButton/GButton';
import theme from '../../theme';

const isIos = Platform.OS === 'ios';

const numbers = [
  'ORIGEN-818-515-7997',
  'ORIGEN-818-515-7998',
  'ORIGEN-818-515-7999',
  'ORIGEN-818-515-7990',
  'ORIGEN-818-515-7991',
  'ORIGEN-818-515-7992',
  'ORIGEN-818-515-7993',
  'ORIGEN-818-515-7994',
  'ORIGEN-818-515-7995',
];

const BuyNumber = () => {
  const [selected, setSelected] = useState(null);
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetNumbers = async () => {
    try {
      const {data} = await getAvailableNumbers();
      setAvailableNumbers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBuyNumber = async () => {
    try {
      setLoading(true);
      const numberData = availableNumbers.find(n => n.phoneNumber === selected);
      const {data} = await buyNumber({phone_number: numberData});
      console.log(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetNumbers();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          ...theme.TYPOGRAPHY.h3,
          textAlign: 'center',
          color: theme.COLORS.blue,
        }}>
        Choose a phone number
      </Text>
      <Text style={{...theme.TYPOGRAPHY.body1, ...styles.subtitle}}>
        Please choose a number from the list below that would be your{' '}
        <Text style={{fontWeight: '600'}}>Origen’s cell phone number </Text>.
      </Text>
      <View style={styles.numberContainer}>
        <ScrollView style={{flex: 1}}>
          {numbers.map((num, i) => (
            <Pressable
              style={styles.number}
              key={i}
              onPress={() => setSelected(num)}>
              <Image
                source={
                  selected === num ? assets.radioCheck : assets.radioUncheck
                }
                style={{
                  height: 24,
                  width: 24,
                  marginRight: 12,
                }}
              />
              <Text
                style={{
                  ...theme.TYPOGRAPHY.body1,
                  color:
                    selected === num
                      ? theme.COLORS.grey900
                      : theme.COLORS.grey700,
                  fontWeight: selected === num ? '600' : '400',
                }}>
                ORIGEN-818-515-7997
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <Button label="Continue" />
    </View>
    // <LinearGradient
    //   style={{
    //     ...styles.gradient,
    //     paddingTop: isIos ? 0 : StatusBar.currentHeight,
    //   }}
    //   colors={[theme.COLORS.primary, theme.COLORS.secondary]}
    //   start={{x: 0, y: 0}}
    //   end={{x: 1, y: 0}}>
    //   <StatusBar translucent={true} backgroundColor={'transparent'} />
    //   <SafeAreaView style={{flex: 1}}>
    //     <View style={styles.top}>
    //       <Pressable style={styles.container}>
    //         <Image
    //           source={assets.chevronLeft}
    //           style={{height: 16, width: 8}}
    //           resizeMode="contain"
    //         />
    //         <Text style={styles.headerTitle}>Buy a number</Text>
    //       </Pressable>
    //     </View>
    //     <View style={styles.bottom}>
    //       <Text style={styles.title}>Select number</Text>
    //       <View style={{flexGrow: 1}}>
    //         <ScrollView style={{flex: 1}}>
    //           {availableNumbers.map(number => (
    //             <Pressable
    //               style={{marginBottom: 12}}
    //               key={number.phoneNumber}
    //               onPress={() => setSelected(number.phoneNumber)}>
    //               <LinearGradient
    //                 style={styles.number}
    //                 colors={[
    //                   selected === number.phoneNumber
    //                     ? theme.COLORS.primary
    //                     : '#F5FCF9',
    //                   selected === number.phoneNumber
    //                     ? theme.COLORS.secondary
    //                     : '#F5FCF9',
    //                 ]}
    //                 start={{x: 0, y: 0}}
    //                 end={{x: 1, y: 0}}>
    //                 <Text
    //                   style={{
    //                     ...styles.phoneNumbers,
    //                     color:
    //                       selected === number.phoneNumber
    //                         ? theme.COLORS.white
    //                         : '#1D1D35',
    //                   }}>
    //                   +{number.phoneNumber}
    //                 </Text>
    //               </LinearGradient>
    //             </Pressable>
    //           ))}
    //         </ScrollView>
    //         <View style={{paddingTop: 10}}>
    //           <GButton
    //             label="Buy number"
    //             loading={loading}
    //             onPress={handleBuyNumber}
    //           />
    //         </View>
    //       </View>
    //     </View>
    //     <View style={styles.hider}></View>
    //   </SafeAreaView>
    // </LinearGradient>
  );
};

export default BuyNumber;

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: theme.COLORS.grey700,
  },
  numberContainer: {
    flexGrow: 1,
    marginVertical: 24,
    backgroundColor: theme.COLORS.white,
    borderRadius: 24,
    paddingVertical: 10,
  },
  number: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
