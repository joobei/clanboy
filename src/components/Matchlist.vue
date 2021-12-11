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
         v-for="(data, index) in matchData"
        :key="index"
        v-bind:match_data="data"
      />
    </dl>
    <!-- <h2> raw data </h2>
    {{ matchData }} -->
  </div>
</template>

<script>
import MatchListItem from "./Match_List_Item.vue";
import axios from "axios";

export default {
  name: "MatchList",
  components: { MatchListItem },
  data() {
    return {
      matchData: '',
      loading: false
    };
  },
  created() {
    axios.get("https://deemos-back-end.onrender.com/matches")
    .then(response =>
    { 
      this.matchData = response.data;
    });
  }
};
</script>