<template>
  <div class="container">
    <h3 style="margin-top: 20px">Upcoming Matches</h3>
    <div class="spinner-border .m-5" role="status" v-if="loading"></div>
    <dl class="row" v-if="!loading">
      <MatchListItem
        style="margin-bottom: 1em"
        :class="{
          'rounded bg-light text-dark': index % 2 === 0,
          'rounded bg-secondary text-light': index % 2 !== 0,
        }"
        v-for="(data, index) in matches"
        :key="index"
        v-bind:match_data="data"
      />
    </dl>
  </div>
</template>

<script>
import MatchListItem from "./Match_List_Item.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: { MatchListItem },
  data() {
    return {
      loading: true,
    };
  },
  name: "MatchList",
  methods: {
    ...mapActions("matches", {
      forceLoadMatches: "loadMatches",
    }),
  },
  computed: mapState("matches", ["matches"]),
  created() {
    this.forceLoadMatches();
  },
  watch: {
    matches: function () {
      if (this.matches[0]) {
        this.loading = false;
        } else {
        this.loading = true;
      }
    },
  },
};
</script>