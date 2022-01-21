import { tokenAlive } from "../../shared/jwtHelper";
// import jwt_decode from "jwt-decode";
import axios from "axios";

//todo read this BASE_URL from environment variable
const backend_url = "http://localhost:5000/";

const state = () => ({
    token: "",
    username: "",
    loginStatus: false,
    lastMessage: "",
    pendingMessage: false
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
    async discord_login({ commit }, code) {
    // async discord_login(code) {
        const yourl = backend_url + 'auth/discord/callback?code='+code
        console.log("axios making request to express")
        console.log(yourl)
        axios.get(yourl).then(response => {
            console.log("received response from express backend!!!")
            console.log(response.data)
            // if (response.data.token) {
            //     commit('saveUserId', uname);
            //     commit('saveTokenData', response.data.token);
            //     commit('updateLastMessage', "Login Successful.");
            //     commit('setLoginStatus',true);
            // }
        }).catch((error) => {
            console.log(error.response.data);
            commit('updateLastMessage', "Login failed. Please verify your username/password.");

        })
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
    },
    clear_pending_message({commit}) {
        commit('clear_message_queue');
    }
};


const mutations = {
    clear_message_queue(state) {
        state.pendingMessage = false;
    },
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
        state.token = '';
        state.loginStatus = false;
    },
    updateLastMessage(state, value) {
        state.lastMessage = value;
        state.pendingMessage = true;
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
