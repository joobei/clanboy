import { tokenAlive } from "../../shared/jwtHelper";
// import jwt_decode from "jwt-decode";
import axios from "axios";

//todo read this BASE_URL from environment variable
const backend_url = "http://localhost:5000/";

const state = () => ({
    token: "",
    username: "",
    loginStatus: false,
    lastMessage: ""
});


const getters = {
    getAuthData(state) {
        return state;
    },
    userIsLoggedIn(state) {
        return state.loginStatus;
    },
    isTokenActive(state) {
        if (!state.authData.token) {
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
        const uname = payload.username;
        axios.post(backend_url + 'login', {
            username: payload.username,
            password: payload.password
        }).then(response => {
            if (response.data.token) {
                commit('saveUserId', uname);
                commit('saveTokenData', response.data.token);
                commit('updateLastMessage', "Login Successful.");
                commit('setLoginStatus',true);
            }
        }).catch((error) => {
            console.log(error);
            commit('updateLastMessage', "Login failed. Please verify your username/password.");

        });
    },
    recover_token_from_local_storage({commit}){
        if(localStorage.getItem("access_token")) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.access_token}`
            commit('setLoginStatus',true)
            return true
        }
        else {
            return false
        }
    },
    logout({ commit }) {
        commit('clearLoginData');
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
    saveUserId(state, id) {
        state.username = id;
    },
    saveTokenData(state, data) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data}`
        localStorage.setItem("access_token", data);
        state.token = data;
    },
    setLoginStatus(state, value) {
        state.loginStatus = value;
    },
    clearLoginData(state) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        state.token = null;
        state.loginStatus = false;
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
