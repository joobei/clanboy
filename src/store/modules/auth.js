import axios from "axios";

//these will need to be configured in .env
const {
    VUE_APP_BACKEND_URL
} = process.env;

const state = () => ({
    token: "",
    username: "",
    discord_id: "",
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
    getLastMesssage(state) {
        return state.lastMessage;
    }
};

const actions = {
    async discord_login({ commit }, code) {
        const yourl = VUE_APP_BACKEND_URL + '/auth/discord/callback?code=' + code
        axios.get(yourl).then(response => {
            if (response.data.token) {
                commit('saveData', response.data);
                commit('updateLastMessage', "Login Successful.");
                commit('setLoginStatus', true);
            }
        }).catch((error) => {
            commit('updateLastMessage', 'Login failed. ' + error);

        })
    },
    recover_token_from_local_storage({ commit }) {
        if (localStorage.getItem("access_token")) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.access_token}`
            commit('setLoginStatus', true)
            return true
        }
        else {
            return false
        }
    },
    logout({ commit }) {
        commit('clearLoginData');
    },
    clear_pending_message({ commit }) {
        commit('clear_message_queue');
    },
    update_last_message({commit},msg) {
        commit('updateLastMessage',msg);
    }
};


const mutations = {
    clear_message_queue(state) {
        state.pendingMessage = false;
    },
    saveData(state, data) {
        state.username = data.username
        state.discord_id = data.discord_id
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
