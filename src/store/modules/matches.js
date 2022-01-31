import axios from "axios";

const state = () => ({
    matches: []
});

const {
    VUE_APP_BACKEND_URL
  } = process.env;

const getters = {
    getMatchData(state) {
        return state.matches;
    }
};

const actions = {
    async loadMatches({ commit }) {
        axios.get(VUE_APP_BACKEND_URL+"/matches")
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