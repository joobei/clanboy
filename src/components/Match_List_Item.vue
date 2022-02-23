<template>
  <router-link :to="{ name: 'single_match', params: { id: match_data._id } }">
    <dt class="col">{{ match_data.vs }}</dt>
    <dd class="col">{{ match_data.map }} - {{ time_zone(match_data.date) }}</dd>
  </router-link>
</template>

<script>

export default {
  name: "MatchListItem",
  props: ["match_data"],
  methods: {
    time_zone(match_date) { 
          let date = new Date(match_date);
          return date.toLocaleString()
          }
  }
};
</script>