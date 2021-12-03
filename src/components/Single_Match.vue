<template>
  <div class="container">
    <h1>vs {{ match_info.vs }}</h1>
  </div>
</template>

<script>
import json from "../assets/matches.json";

export default {
  methods: { 
  },
  computed: {
    match_info() {
      return json.matches.find((match) => match.id === parseInt(this.$route.params.id));
    },
  },
  name: "Single_Match",
};
</script>
