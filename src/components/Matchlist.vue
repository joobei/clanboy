<template>
  <div class="container">
    <h3 style="margin-top:20px">Upcoming Match</h3>
    <dl class="row">
      <MatchListItem
        :class="{
          'rounded bg-light text-dark': index % 2 === 0,
          'rounded bg-dark text-light': index % 2 !== 0,
        }"
        v-for="(data, index) in myJson.matches"
        :key="index"
        v-bind:match_data="data"
      />
    </dl>
  </div>
</template>

<script>
import MatchListItem from "./Match_List_Item.vue";
import json from "../assets/matches.json";

export default {
  name: "MatchList",
  components: { MatchListItem },
  data() {
    return {
      myJson: json,
    };
  },
};
</script>