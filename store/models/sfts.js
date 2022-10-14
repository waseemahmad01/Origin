import {createModel} from '@rematch/core';
import {buySftsPackage, getActiveSftPackage, getSfts} from '../../api';

export const sfts = createModel()({
  name: 'sfts',
  state: {
    loading: false,
    sftsPackages: [],
    selected: null,
    active: {},
  },
  reducers: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setSftsPackages(state, payload) {
      state.sftsPackages = payload;
    },
    setSelected(state, payload) {
      state.selected = payload;
    },
    setActive(state, payload) {
      state.active = payload;
    },
  },
  effects: dispatch => ({
    async getSftsPackages() {
      try {
        dispatch.sfts.setLoading(true);
        const {data: sfts} = await getSfts();
        console.log('Sfts ====>', sfts);
        dispatch.sfts.setSftsPackages(sfts);
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.sfts.setLoading(false);
      }
    },
    async buySftPackage({navigation}, state) {
      try {
        dispatch.sfts.setLoading(true);
        console.log(state.sfts.selected.id);
        const {data} = await buySftsPackage({
          package_id: state.sfts.selected.id,
        });
        console.log(data);
        navigation.navigate('wallet', {screen: 'My-Wallet'});
        dispatch.auth.getUserData();
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.sfts.setLoading(false);
      }
    },
    async getCurrentPackage() {
      try {
        dispatch.sfts.setLoading(true);
        const {data} = await getActiveSftPackage();
        console.log(data);
        dispatch.sfts.setActive(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.sfts.setLoading(false);
      }
    },
  }),
});
