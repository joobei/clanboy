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
        axios.get(VUE_APP_BACKEND_URL + "/matches")
            .then(response => {
                commit('SET_MATCHES_TO_STATE', response.data);
            }).catch(error => {
                throw new Error(`API ${error}`);
            });
    },
    async signUpSolo({ commit, dispatch }, match_id) {
        console.log("Match id before Axios " + JSON.stringify(match_id))
        await axios
            .post(VUE_APP_BACKEND_URL + "/signup", match_id, {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log("Axios response:")
                console.log(res.data)
                dispatch('loadMatches')
                dispatch('auth/update_last_message', res.data.response, {root:true})
            });
        commit('BALALA')
    }
}

const mutations = {
    SET_MATCHES_TO_STATE(state, matches) {
        state.matches = matches;
        // console.log(state.matches)
    },
    BALALA() { console.log("Balala") }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}