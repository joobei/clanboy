<template>
  <div>
    <h1>vs {{ match_info.vs }}</h1>
    <FormSchema :schema="schema" v-model="model">
    </FormSchema>
  </div>
</template>

<script>
import json from "../assets/matches.json";
import FormSchema from "@formschema/native";

export default {
  data: () => ({
    schema: require('@/assets/matches.schema.json'),
    model: {},
  }),
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
