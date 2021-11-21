<template>
<h1> match title {{match_id}}</h1>
</template>


import json from "../assets/matches.json";

<script>
export default {
    computed: {
    match_id() {
      return this.$route.params.date
    }
  },
    name: "Single_Match"
}
</script>