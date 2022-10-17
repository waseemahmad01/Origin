import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import assets from '../../../assets';
import theme from '../../../theme';

const data = [1, 2, 3, 4, 5, 6, 7];

const RewardsTab = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          {data.length === 0
            ? "You don't have any transactions here"
            : 'Yesterday '}
        </Text>
        {data.map(i => (
          <View style={styles.transactionDetails} key={i}>
            <View style={{flexDirection: 'row'}}>
              <ImageBackground
                source={assets.iconBtnBg}
                style={styles.iconContainer}>
                <Image
                  source={assets.giftSm}
                  style={{height: 24, width: 24}}
                  resizeMode="cover"
                />
              </ImageBackground>
              <View style={{marginLeft: 16}}>
                <Text style={styles.transactionType}>Generate Reward</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      ...styles.transactionInfo,
                      color: theme.COLORS.blue,
                    }}>
                    Sep 20
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.amount}>+10.000</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
    color: theme.COLORS.grey700,
    fontWeight: '500',
  },
  iconContainer: {
    height: 48,
    width: 48,
    borderRadius: 48 / 2,
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
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Inter',
    color: theme.COLORS.grey900,
  },
  transactionInfo: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
    lineHeight: 18,
    marginTop: 4,
    color: theme.COLORS.grey900,
  },
  amount: {
    ...theme.TYPOGRAPHY.body1,
    fontSize: 18,
    lineHeight: 24,
    color: theme.COLORS.grey900,
    fontWeight: '600',
  },
});
