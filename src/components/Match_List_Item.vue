<template>
  <div
    class="listing"
    @mouseover="hover = true"
    @mouseleave="hover = false">
    <span>
      <router-link :to="{name: 'single_match', params: {date: match_data.date}}"> 
      {{ match_data.title }} - {{ match_data.map }} - {{ match_data.date }}
      </router-link>
    </span>
    <ListEditIcons v-if="hover" />
  </div>
</template>

<script>
import ListEditIcons from './ListEditIcons.vue';
export default {
  name: "MatchListItem",
  props: ["match_data"],
  components: {ListEditIcons},
  data() {
    return {
      hover: false,
      ready: false,
    };
  }
};
</script>