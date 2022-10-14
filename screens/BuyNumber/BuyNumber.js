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
import GButton from '../../components/GButton/GButton';
import theme from '../../theme';

const isIos = Platform.OS === 'ios';

const BuyNumber = () => {
  const [selected, setSelected] = useState('1');
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
    <LinearGradient
      style={{
        ...styles.gradient,
        paddingTop: isIos ? 0 : StatusBar.currentHeight,
      }}
      colors={[theme.COLORS.primary, theme.COLORS.secondary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.top}>
          <Pressable style={styles.container}>
            <Image
              source={assets.chevronLeft}
              style={{height: 16, width: 8}}
              resizeMode="contain"
            />
            <Text style={styles.headerTitle}>Buy a number</Text>
          </Pressable>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.title}>Select number</Text>
          <View style={{flexGrow: 1}}>
            <ScrollView style={{flex: 1}}>
              {availableNumbers.map(number => (
                <Pressable
                  style={{marginBottom: 12}}
                  key={number.phoneNumber}
                  onPress={() => setSelected(number.phoneNumber)}>
                  <LinearGradient
                    style={styles.number}
                    colors={[
                      selected === number.phoneNumber
                        ? theme.COLORS.primary
                        : '#F5FCF9',
                      selected === number.phoneNumber
                        ? theme.COLORS.secondary
                        : '#F5FCF9',
                    ]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text
                      style={{
                        ...styles.phoneNumbers,
                        color:
                          selected === number.phoneNumber
                            ? theme.COLORS.white
                            : '#1D1D35',
                      }}>
                      +{number.phoneNumber}
                    </Text>
                  </LinearGradient>
                </Pressable>
              ))}
            </ScrollView>
            <View style={{paddingTop: 10}}>
              <GButton
                label="Buy number"
                loading={loading}
                onPress={handleBuyNumber}
              />
            </View>
          </View>
        </View>
        <View style={styles.hider}></View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default BuyNumber;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  top: {
    paddingHorizontal: 24,
    paddingBottom: 19,
  },
  bottom: {
    flexGrow: 1,
    backgroundColor: theme.COLORS.white,
    zIndex: 2,
    elevation: 4,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  hider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 40,
    backgroundColor: theme.COLORS.white,
  },
  container: {
    marginTop: 27.74,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    ...theme.TYPOGRAPHY.h3,
    fontWeight: '700',
    color: theme.COLORS.white,
    marginLeft: 20,
  },
  title: {
    ...theme.TYPOGRAPHY.h3,
    fontSize: 18,
    marginBottom: 16,
  },
  number: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  phoneNumbers: {
    ...theme.TYPOGRAPHY.body1,
    fontWeight: '500',
  },
});
