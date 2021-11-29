import { tokenAlive } from "../../shared/jwtHelper";
import { jwtDecrypt } from "../../shared/jwtHelper";

const state = () => ({
    authData: {
        token: "",
        refreshToken: "",
        tokenExp: "",
        userId: "",
        userName: "",
    },
    loginStatus: "",
});


const getters = {
    getAuthData(state) {
        return state.authData;
    },
    getLoginStatus(state) {
        return state.loginStatus;
    },
    isTokenActive(state) {
        if (!state.authData.tokenExp) {
            return false;
        }
        return tokenAlive(state.authData.tokenExp);
    }
};

const actions = {
    async login({ commit }, payload) {
        console.log(payload);
        const data = {
            access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs",
            refresh_token: ""
        }
        commit('saveTokenData', data);
        commit('setLoginStatu', 'success');
    },
};


const mutations = {
    saveTokenData(state, data) {

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

        const jwtDecodedValue = jwtDecrypt(data.access_token);
        const newTokenData = {
            token: data.access_token,
            refreshToken: data.refresh_token,
            tokenExp: jwtDecodedValue.exp,
            userId: jwtDecodedValue.sub,
            userName: jwtDecodedValue.userName,
            //userName: 'jubei'
        };
        state.authData = newTokenData;
    },
    setLoginStatu(state, value) {
        state.loginStatus = value;
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}