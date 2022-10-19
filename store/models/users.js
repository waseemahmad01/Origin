import {createModel} from '@rematch/core';
import {
  addPeople,
  allUsers,
  getMyContacts as getMyContactsApi,
  allPeoples,
} from '../../api';

export const users = createModel()({
  name: 'users',
  state: {
    loading: false,
    selectedUser: null,
    users: [],
    allPeoples: [],
    myContacts: [],
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
    setAllPeoples(state, payload) {
      state.allPeoples = payload;
    },
    setMyContacts(state, payload) {
      state.myContacts = payload;
    },
  },
  effects: dispatch => ({
    async getAllUsers() {
      try {
        dispatch.users.setLoading(true);
        const {data} = await allUsers();
        dispatch.users.setUsers(data);
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
    async getAllPeople() {
      try {
        dispatch.users.setLoading(true);
        const {data} = await allPeoples();
        console.log('user=====>', data);
        dispatch.users.setAllPeoples(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.users.setLoading(false);
      }
    },
    async getMyContacts() {
      try {
        dispatch.users.setLoading(true);
        const {data} = await getMyContactsApi();
        console.log('My contacts', data);
        dispatch.users.setMyContacts(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.users.setLoading(false);
      }
    },
  }),
});
