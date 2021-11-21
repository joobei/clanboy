<template>
<h1> match title {{match_info.title}}</h1>
</template>

<script>
import json from "../assets/matches.json";

export default {
    computed: {
        match_id() {
        return this.$route.params.date
        },
        match_info() {
            return json.matches.find(match => match.date === this.match_id)
        }
    },
    name: "Single_Match"
}
</script>