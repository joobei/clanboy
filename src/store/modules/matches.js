import axios from "axios";
// import { VueElement } from "vue";
// import { mapActions } from "vuex/dist/vuex.cjs";
// import VueAxios from "vue-axios";

// this.axios.defaults.baseURL = "";

const state = () => ({
    matches: []
});

const getters = {
    getMatchData(state) {
        return state.matches;
    }
};


const actions = {
    async loadMatches({ commit }) {
        axios.get("http://localhost:5000/matches")
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