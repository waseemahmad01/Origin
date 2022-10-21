import {createModel} from '@rematch/core';
import {transactionHistory} from '../../api';

export const transactions = createModel()({
  name: 'transactions',
  state: {
    loading: false,
    transactionHistory: [],
  },
  reducers: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setTransactionHistory(state, payload) {
      state.transactionHistory = payload;
    },
  },
  effects: dispatch => ({
    async getTransactionHistroy() {
      try {
        dispatch.transactions.setLoading(true);
        const {data} = await transactionHistory();
        console.log(data);
        dispatch.transactions.setTransactionHistory(data.result);
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.transactions.setLoading(false);
      }
    },
  }),
});
