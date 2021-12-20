import { tokenAlive } from "../../shared/jwtHelper";
import axios from "axios";
//todo read this BASE_URL from environment variable
const backend_url = "http://localhost:5000/";

const state = () => ({
    authData: {
        token: "",
        // refreshToken: "",
        // tokenExp: "",
        // userId: "",
        // userName: "",
    },
    loginStatus: false,
    lastMessage: ""
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
        axios.post(backend_url + 'login', {
            username: payload.username,
            password: payload.password
        }).then(response => {
            console.log(response.data.token);
            if (response.data.token === "") {
                commit('setLoginStatus', false);
                commit('updateLastMessage', "Login Failed.");
            }
            else {
                commit('saveTokenData', response.data.token);
                commit('updateLastMessage', "Login Successful.");
                commit('setLoginStatus', true);
            }
        });
    },
    logout({ commit }) {
        commit('clearLoginData');
        // commit('setLoginStatu', 'failed');
    },
    register({ commit }, payload) {
        axios.post(backend_url + 'register', {
            username: payload.username,
            password: payload.password
        }).then(response => {
            commit('updateLastMessage', response.data.message);
        });
    }
};


const mutations = {
    saveTokenData(state, data) {

        localStorage.setItem("access_token", data);
        // localStorage.setItem("refresh_token", data.refresh_token);

        // const jwtDecodedValue = jwtDecrypt(data.access_token);
        const newTokenData = {
            token: "auth_token_data",
            // refreshToken: "auth_token_blah",
            // tokenExp: Date.now() * 4999,
            // userId: "nikolaos",
            // userName: "weird"
        };
        state.authData = newTokenData;
    },
    setLoginStatus(state, value) {
        state.loginStatus = value;
    },
    clearLoginData(state) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        const newTokenData = {
            token: "",
            // refreshToken: "",
            // tokenExp: "",
            // userId: "",
            // userName: ""
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
