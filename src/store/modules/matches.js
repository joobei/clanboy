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
                throw new Error(error);
            });
    },
    async signUpSolo({ dispatch, rootState }, sign_up_data) {
        const token = rootState.auth.token //pick up token from auth vuex
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios
            .post(VUE_APP_BACKEND_URL + "/signup", sign_up_data, {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                // console.log("Axios response:")
                // console.log(res.data)
                dispatch('loadMatches') //todo figure out why it doesn't work
                dispatch('auth/update_last_message', res.data.response, {root:true})
            }).catch(error => {
                // console.log('Erorr in /signup to API')
                // console.log(error)
                dispatch('auth/update_last_message', error.response.data.error, {root:true})
            });
    }
}

const mutations = {
    SET_MATCHES_TO_STATE(state, matches) {
        state.matches = matches;
        // console.log(state.matches)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}