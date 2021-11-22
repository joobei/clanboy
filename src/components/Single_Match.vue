<template>
  <div>
    <h1>vs {{ match_info.vs }}</h1>
    <FormSchema :schema="schema" v-model="model" @submit.prevent="submit">
      <button type="submit">Subscribe</button>
    </FormSchema>
  </div>
</template>

<script>
import json from "../assets/matches.json";
import FormSchema from "@formschema/native";
import schema from "../assets/matches.schema.json";

export default {
  data: () => ({
    schema: schema,
    model: {},
  }),
  methods: {
    submit() {
      //submit here
    },
  },
  computed: {
    match_info() {
      return json.matches.find((match) => match.id === parseInt(this.$route.params.id));
    },
  },
  components: { FormSchema },
  name: "Single_Match",
};
</script>