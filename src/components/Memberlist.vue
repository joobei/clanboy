<template>
<h3>member info</h3>
<div v-for="data in myJson.members" v-bind:key="data.id">
<span>{{data.id}} - {{data.name}}</span> <ListEditIcons />        
</div>
</template>


<script>
import json from "../assets/members.json";
import ListEditIcons from './ListEditIcons';

export default {
    name: 'MemberList',
    components: {ListEditIcons},
    properties: 'member_data',
    data() {
    return {
      myJson: json,
    };
  }
}
</script>




<style scoped>

</style>