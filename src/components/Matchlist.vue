<template>
  <div class="container">
    <h3 style="margin-top: 20px">Upcoming Match</h3>
    <dl class="row">
      <MatchListItem
        style="margin-bottom: 1em"
        :class="{
          'rounded bg-light text-dark': index % 2 === 0,
          'rounded bg-secondary text-light': index % 2 !== 0,
        }"
         v-for="(data, index) in getMatches"
        :key="index"
        v-bind:match_data="data"
      />
    </dl>
  </div>
</template>

<script>
import MatchListItem from "./Match_List_Item.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { MatchListItem },
  data() {
    return {
      matchData: '',
      loading: false
    };
  },
  name: "MatchList",
  computed: {
    ...mapGetters("matches", {
      getMatches: "getMatchData",
    }),
  },
  methods: {
    ...mapActions("matches", {
      forceLoadMatches: "loadMatches",
    }),
  },
  created() {
    this.matchData = this.getMatches;
    this.forceLoadMatches();
  },
};
</script>