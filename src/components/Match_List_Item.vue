<template>
  <div class="container-sm">
    <router-link :to="{ name: 'single_match', params: { id: match_data.id } }">
      <div
        class="border rounded"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        {{ match_data.vs }} - {{ match_data.map }} - {{ match_data.date }}
      </div>
    </router-link>

    <!-- <ListEditIcons v-if="hover" /> -->
  </div>
</template>

<script>
// import ListEditIcons from './ListEditIcons.vue';
export default {
  name: "MatchListItem",
  props: ["match_data"],
  // components: {ListEditIcons},
  data() {
    return {
      hover: false,
      ready: false,
    };
  },
};
</script>