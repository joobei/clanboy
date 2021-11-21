<template>
     <div v-for="data in myJson.matches" v-bind:key="data.date">
          <MatchListItem v-bind:match_data="data" />
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
    }
}
</script>

