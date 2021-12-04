import { tokenAlive } from "../../shared/jwtHelper";
// import { jwtDecrypt } from "../../shared/jwtHelper";
import members from "@/assets/ids.json";

const state = () => ({
    authData: {
        token: "",
        refreshToken: "",
        tokenExp: "",
        userId: "",
        userName: "",
    },
    loginStatus: "undefined",
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
        };

        if (members.members.find(user => user.name === payload.userName) && members.members.find(user => user.password === payload.password)) 
        {
            commit('setLoginStatu', 'success');
            commit('saveTokenData', data);
        }
        else {    
            commit('setLoginStatu', 'failed');
        }
        commit('saveTokenData', data);
        commit('setLoginStatu', 'success');
    },
    logout({commit}) {
        commit('clearLoginData');
        commit('setLoginStatu', 'failed');
    }
};


const mutations = {
    saveTokenData(state, data) {

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

        // const jwtDecodedValue = jwtDecrypt(data.access_token);
        const newTokenData = {
            token: "blah",
            refreshToken: "blah",
            tokenExp: Date.now()*4999,
            userId: "nikolaos",
            userName: "weird"
        };
        state.authData = newTokenData;
    },
    setLoginStatu(state, value) {
        state.loginStatus = value;
    },
    clearLoginData(state) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        const newTokenData = {
            token: "",
            refreshToken: "",
            tokenExp: "",
            userId: "",
            userName: ""
        };
        state.authData =  newTokenData;
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
