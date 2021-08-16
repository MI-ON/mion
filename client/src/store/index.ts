import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import jwtDecode from 'jwt-decode';

import persistedstate from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store(<StoreOptions<any>>{
    state: {
        userToken: null
    },
    getters: {
        getUserImageUrl: (state) => {
            const userTokenDecoded: { picture: string } = jwtDecode(
                state.userToken
            );
            return userTokenDecoded.picture;
        },
        getUserByFullName: (state) => {
            const userFullName: { name: string } = jwtDecode(state.userToken);

            return userFullName.name;
        },
        getUserByEmail: (state) => {
            const userEmail: { email: string } = jwtDecode(state.userToken);

            return userEmail.email;
        }
    },
    mutations: {
        SET_USER_TOKEN(state, userToken) {
            state.userToken = userToken;
        },
        LOGOUT(state) {
            state.userToken = null;
        }
    },
    actions: {},
    plugins: [
        persistedstate({
            paths: ['userToken']
        })
    ]
});
