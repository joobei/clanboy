import axios from "axios";

const state = () => ({
    matches: []
});

const getters = {
    getMatchData(state) {
        return state.matches;
    }
};

axios.baseURL = process.env.VUE_APP_API_BASE_URL;
const actions = {
    async loadMatches({ commit }) {
        axios.get(process.env.VUE_APP_API_BASE_URL + "matches")
            .then(response => {
                commit('SET_MATCHES_TO_STATE', response.data);
            }).catch(error => {
                throw new Error(`API ${error}`);
            });
    }
}

const mutations = {
    SET_MATCHES_TO_STATE(state, matches) {
        state.matches = matches;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}