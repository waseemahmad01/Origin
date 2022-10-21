import React, {useEffect} from 'react';
import {ethers} from 'ethers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import assets from '../../../assets';
import theme from '../../../theme';
import {truncateString} from '../../../utils';

dayjs.extend(utc);

const TransactionsTab = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    state => state.transactions.transactionHistory,
  );
  const wallet = useSelector(state => state.wallet.publicAddress);
  // console.log(transactions);
  // console.log('wallet Address', wallet);
  useEffect(() => {
    dispatch.transactions.getTransactionHistroy();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          {transactions.length === 0
            ? "You don't have any transactions here"
            : 'Yesterday '}
        </Text>
        {transactions.map((tx, i) => (
          <View style={styles.transactionDetails} key={i}>
            <View style={{flexDirection: 'row'}}>
              <ImageBackground
                source={assets.iconBtnBg}
                style={styles.iconContainer}>
                <Image
                  source={assets.arrowUp}
                  style={{height: 24, width: 24}}
                  resizeMode="cover"
                />
              </ImageBackground>
              <View style={{marginLeft: 16}}>
                <Text style={styles.transactionType}>
                  {tx.from.toLowerCase() === wallet.toLowerCase()
                    ? 'Send'
                    : 'Recieve'}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      ...styles.transactionInfo,
                      color: theme.COLORS.blue,
                    }}>
                    {dayjs.unix(tx.timeStamp).utc().format('MMM DD').toString()}
                  </Text>
                  <Text style={styles.transactionInfo}>
                    {' '}
                    . From: {truncateString(tx.from)}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.amount}>
                {tx.from.toLowerCase() === wallet.toLowerCase() ? '-' : '+'}{' '}
                {ethers.utils.formatEther(tx.value)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TransactionsTab;

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
