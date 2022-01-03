import { tokenAlive } from "../../shared/jwtHelper";
import axios from "axios";

//todo read this BASE_URL from environment variable
const backend_url = "http://localhost:5000/";

const state = () => ({
    authData: {
        token: "",
        userId: "",
    },
    loginStatus: false,
    lastMessage: ""
});


const getters = {
    getAuthData(state) {
        return state.authData;
    },
    userIsLoggedIn(state) {
        return state.authData.token;
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
        axios.post(backend_url + 'login', {
            username: payload.username,
            password: payload.password
        }).then(response => {
            // console.log(jwt.decode(response.data.token,"s0m3$3Cret$h0lyC0d3&$"));
            // todo pick up username from response?
            console.log(response.data.token);
            if (response.data.token) {
                commit('saveTokenData', response.data.token);
                commit('updateLastMessage', "Login Successful.");
            }
        }).catch((error) => {
            console.log(error);
            commit('updateLastMessage', "Login failed. Please verify your username/password.");

        });
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
    saveTokenData(state, data) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data}`
        axios.defaults.headers.common['Authorization'] = `Bearer ${data}`
        localStorage.setItem("access_token", data);
        state.authData.token = data;
    },
    setLoginStatus(state, value) {
        state.loginStatus = value;
    },
    clearLoginData(state) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        state.authData.token = null;
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
