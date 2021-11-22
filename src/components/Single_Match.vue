<template>
  <div>
    <h1>vs {{ match_info.title }}</h1>
    <FormSchema :schema="schema" v-model="model" @submit.prevent="submit">
      <button type="submit">Subscribe</button>
    </FormSchema>
  </div>
</template>

<script>
import json from "../assets/matches.json";
import FormSchema from "@formschema/native";

export default {
  computed: {
    match_id() {
      return this.$route.params.date;
    },
    match_info() {
      return json.matches.find((match) => match.date === this.match_id);
    },
  },
  name: "Single_Match",
};
</script>