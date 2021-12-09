<template>
  <div class="container">
    <h1>{{ match_info.vs }}</h1>
    <dl class="row">
      <dt class="col-sm-3">Map</dt>
      <dd class="col-sm-9">{{ match_info.map }}</dd>
      <dt class="col-sm-3">Date</dt>
      <dd class="col-sm-9">
        {{ isoFormatDMY(parseISOString(match_info.date)) }}
      </dd>
      <dt class="col-sm-3">Side</dt>
      <dd class="col-sm-9">{{ match_info.side }}</dd>
      <dt class="col-sm-3">Attendees</dt>
      <dd class="col-sm-9">{{ match_info.players }}</dd>
      <dt class="col-sm-3">Reserves</dt>
      <dd class="col-sm-9">{{ match_info.reserves }}</dd>
      <dt class="col-sm-3">Outcome</dt>
      <dd class="col-sm-9">{{ match_info.outcome }}</dd>
    </dl>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="button"
      aria-pressed="false"
      autocomplete="off"
    >
      Sign Myself Up
    </button>
    <button
      type="button"
      class="btn btn-secondary"
      data-toggle="button"
      aria-pressed="false"
      autocomplete="off"
    >
      Bring a Squad
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Single_Match",
  data() {
    return {
      match_info: "",
    };
  },
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
        d.getUTCFullYear() +
        " - " +
        d.getUTCHours() +
        ":" +
        d.getUTCMinutes()
      );
    },
    parseISOString(s) {
      var b = s.split(/\D+/);
      return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    },
  },
  created() {
    axios.get("http://localhost:5000/matches").then((response) => {
      this.match_info = response.data.find(
        (element) => element._id === this.$route.params.id
      );
    });
  },
};
</script>
