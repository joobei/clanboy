<template>
  <div class="container">
    <h1>vs {{ match_info.vs }}</h1>
    <dl class="row">
      <dt class="col-sm-3">Map</dt>
      <dd class="col-sm-9">{{ match_info.map }}</dd>
      <dt class="col-sm-3">Date</dt>
      <dd class="col-sm-9">{{ isoFormatDMY(parseISOString(match_info.date)) }}</dd>
    </dl>
  </div>
</template>

<script>
import json from "../assets/matches.json";

export default {
  methods: {
    isoFormatDMY(d) {
      function pad(n) {
        return (n < 10 ? "0" : "") + n;
      }
      return (
        pad(d.getUTCDate()) +
        "/" +
        pad(d.getUTCMonth() + 1) +
        "/" +
        d.getUTCFullYear()
      );
    },
    parseISOString(s) {
      var b = s.split(/\D+/);
      return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    },
  },
  computed: {
    match_info() {
      return json.matches.find(
        (match) => match.id === parseInt(this.$route.params.id)
      );
    },
  },
  name: "Single_Match",
};
</script>
