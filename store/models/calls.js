import {createModel} from '@rematch/core';
import {callHistory} from '../../api';

export const calls = createModel()({
  name: 'calls',
  state: {
    loading: false,
    history: [],
  },
  reducers: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setHistory(state, payload) {
      state.history = payload;
    },
  },
  effects: dispatch => ({
    async getCallHistory() {
      try {
        dispatch.calls.setLoading(true);
        const {data} = await callHistory();
        console.log(data);
        dispatch.calls.setHistory([...data]);
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.calls.setLoading(false);
      }
    },
  }),
});
