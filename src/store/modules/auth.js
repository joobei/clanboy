import { tokenAlive } from "../../shared/jwtHelper";
import members from "@/assets/ids.json";
import axios from "axios";
//todo read this BASE_URL from environment variable
const backend_url = "http://localhost:5000/";

const state = () => ({
    authData: {
        token: "",
        refreshToken: "",
        tokenExp: "",
        userId: "",
        userName: "",
    },
    loginStatus: "undefined",
    lastMessage: "baloney"
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
    },
    getLastMesssage(state) {
        return state.lastMessage;
    }
};

const actions = {
    async login({ commit }, payload) {
        const data = {
            access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs",
            refresh_token: ""
        };

        if (members.members.find(user => user.name === payload.userName) && members.members.find(user => user.password === payload.password)) {
            commit('setLoginStatu', 'success');
            commit('saveTokenData', data);
        }
        else {
            commit('setLoginStatu', 'failed');
        }
        commit('saveTokenData', data);
        commit('setLoginStatu', 'success');
    },
    logout({ commit }) {
        commit('clearLoginData');
        commit('setLoginStatu', 'failed');
    },
    register({ commit }, payload) {
        axios.post(backend_url + 'register', {
            username: payload.username,
            password: payload.password
        }).then(response => {
            console.log(response);
            commit('updateLastMessage', response.data.message);
        });
    }
};


const mutations = {
    saveTokenData(state, data) {

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

        // const jwtDecodedValue = jwtDecrypt(data.access_token);
        const newTokenData = {
            token: "auth_token_data",
            refreshToken: "auth_token_blah",
            tokenExp: Date.now() * 4999,
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
        state.authData = newTokenData;
    },
    updateLastMessage(state, value) {
        state.lastMessage = value;
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
