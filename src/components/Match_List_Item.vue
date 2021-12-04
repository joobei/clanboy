<template>
  <router-link :to="{ name: 'single_match', params: { id: match_data.id } }">
    <dt class="col-sm-3">{{ match_data.vs }}</dt>
    <dd class="col-sm-9">{{ match_data.map }} - {{ match_data.date }}</dd>
  </router-link>
</template>

<script>
export default {
  name: "MatchListItem",
  props: ["match_data"],
  data() {
    return {
      hover: false,
      ready: false,
    };
  },
};
</script>