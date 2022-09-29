import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import assets from '../../../assets';
import theme from '../../../theme';

const data = [1, 2, 3, 4, 5, 6, 7];

const isIos = Platform.OS === 'ios';

const RewardsTab = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          {data.length === 0
            ? "You don't have any transactions here"
            : '  Yesterday '}
        </Text>
        {data.map(i => (
          <View style={styles.transactionDetails} key={i}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.iconContainer}>
                <Image
                  source={assets.giftSm}
                  style={{height: 16, width: 18}}
                  resizeMode="cover"
                />
              </View>
              <View style={{marginLeft: 16}}>
                <Text style={styles.transactionType}>1st Generate Reward</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      ...styles.transactionInfo,
                      color: theme.COLORS.primary,
                    }}>
                    Sep 20
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.amount}>10.000 GC...</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {isIos && <View style={{height: 80}}></View>}
    </View>
  );
};

export default RewardsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...theme.TYPOGRAPHY.subtitle1,
    color: '#B7B7BE',
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  iconContainer: {
    height: 48,
    width: 48,
    borderRadius: 48 / 2,
    backgroundColor: '#F5FCF9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  transactionType: {
    ...theme.TYPOGRAPHY.body1,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#1D1D35',
  },
  transactionInfo: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 18,
    marginTop: 4,
    color: '#6E6E7E',
  },
  amount: {
    ...theme.TYPOGRAPHY.body2,
    color: '#1D1D35',
    fontWeight: '400',
    fontFamily: 'Inter',
  },
});
