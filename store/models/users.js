import {createModel} from '@rematch/core';
import {addPeople, allUsers, peoples as peoplesApi} from '../../api';

export const users = createModel()({
  name: 'users',
  state: {
    loading: false,
    selectedUser: null,
    users: [],
    peoples: [],
  },
  reducers: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setSelectedUser(state, payload) {
      state.selectedUser = payload;
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    setPeoples(state, payload) {
      state.peoples = payload;
    },
  },
  effects: dispatch => ({
    async getAllUsers() {
      try {
        console.log('Calling');
        dispatch.users.setLoading(true);
        const {data} = await allUsers();
        dispatch.users.setUsers(data);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.users.setLoading(false);
      }
    },
    async addtoPeople({data, navigation}) {
      try {
        dispatch.users.setLoading(true);
        const {data: res} = await addPeople(data);
        navigation.goBack();
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.users.setLoading(true);
      }
    },
    async getPeople() {
      try {
        dispatch.users.setLoading(true);
        const {data} = await peoplesApi();
        console.log('user=====>', data);
        dispatch.users.setPeoples(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.users.setLoading(false);
      }
    },
  }),
});
