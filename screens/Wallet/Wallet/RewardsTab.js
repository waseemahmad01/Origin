import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {claimReward} from '../../../api';

import assets from '../../../assets';
import theme from '../../../theme';

const data = [1, 2, 3, 4, 5, 6, 7];

const RewardsTab = () => {
  const dispatch = useDispatch();
  const rewardHistory = useSelector(state => state.calls.history);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleClaimReward = async reward => {
    try {
      setLoading(true);
      if (!reward?.is_reward_claimed) {
        await claimReward(reward?.id);
        dispatch.calls.getCallHistory();
        dispatch.wallet.getBalance();
      }
      return;
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log('runing');
    const _rewards = rewardHistory.filter(
      r => Number(r.call_reward_coins) !== 0,
    );
    setRewards([..._rewards]);
  }, [rewardHistory]);
  useEffect(() => {
    dispatch.calls.getCallHistory();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>
            {data.length === 0
              ? "You don't have any transactions here"
              : 'Yesterday '}
          </Text>
          {rewards.map((reward, i) => (
            <Pressable
              onPress={() => handleClaimReward(reward)}
              style={styles.transactionDetails}
              key={i}>
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
                  <Text style={styles.transactionType}>
                    {reward?.is_reward_claimed ? 'Claimed' : 'Claim reward'}
                  </Text>
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
                <Text style={styles.amount}>+{reward.call_reward_coins}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <Modal
        visible={loading}
        transparent
        style={{
          height: '100%',
          width: '100%',
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 200,
              width: 200,
              borderRadius: 12,
              backgroundColor: theme.COLORS.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color={theme.COLORS.blue} />
            <Text style={{...theme.TYPOGRAPHY.body1, marginTop: 20}}>
              Please wait
            </Text>
          </View>
        </View>
      </Modal>
    </>
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
