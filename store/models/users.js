import {createModel} from '@rematch/core';
import {allUsers} from '../../api';

export const users = createModel()({
  name: 'users',
  state: {
    loading: false,
    selectedUser: null,
    users: [],
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
  }),
});
