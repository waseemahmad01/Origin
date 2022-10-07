import {createModel} from '@rematch/core';
import {
  addGcoins,
  generateWallet,
  rewardTokens,
  sendToken,
  walletBalance,
  getNumber,
} from '../../api';

export const wallet = createModel()({
  name: 'wallet',
  state: {
    loading: false,
    publicAddress: '',
    balance: 0,
  },
  reducers: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setPublicAddress(state, payload) {
      state.publicAddress = payload;
    },
    setBalance(state, payload) {
      state.balance = payload;
    },
  },
  effects: dispatch => ({
    async createWallet({setShowModal}) {
      try {
        dispatch.wallet.setLoading(true);
        const {data} = await generateWallet();
        await getNumber();
        console.log(data.publicAddress);
        dispatch.wallet.setPublicAddress(data.publicAddress);
        dispatch.auth.getUserData();
        setShowModal(true);
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.wallet.setLoading(false);
      }
    },
    async getRewardTokens({navigation, setShowModal}) {
      try {
        dispatch.wallet.setLoading(true);
        const {data} = await rewardTokens();
        console.log(data);
        setShowModal(false);
        navigation.navigate('Face-Id-verify');
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.wallet.setLoading(false);
      }
    },
    async getBalance() {
      try {
        dispatch.wallet.setLoading(true);
        const {data} = await walletBalance();
        dispatch.wallet.setBalance(data.balance);
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.wallet.setLoading(false);
      }
    },
    async transferToken({formData, navigation}) {
      try {
        dispatch.wallet.setLoading(true);
        const {data} = await sendToken(formData);
        console.log(data);
        navigation.navigate('Transaction-success');
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.wallet.setLoading(false);
      }
    },
    async addTokens({formData, setAdd}) {
      try {
        dispatch.wallet.setLoading(true);
        const {data} = await addGcoins(formData);
        console.log(data);
        setAdd(true);
        dispatch.wallet.getBalance();
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.wallet.setLoading(false);
      }
    },
  }),
});
