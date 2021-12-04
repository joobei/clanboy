<template>
  <div class="container-sm">
    <h1>Upcoming Match</h1>
    <dl class="row">
      <div :class="{'rounded bg-light': index%2===0, 'rounded bg-dark': index%2!==0}" v-for="(data,index) in myJson.matches" :key="index">
        <MatchListItem v-bind:match_data="data" />
      </div>
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
      myJson: json
    };
  },
};
</script>