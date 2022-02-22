<template>
  <div class="container">
    <router-link to="/matchlist"
      ><button
        type="button"
        class="btn btn-primary"
        aria-pressed="false"
        autocomplete="off"
      >
        Back to matches.
      </button></router-link
    >
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
      <!-- <dt class="col-sm-3">Attendees</dt>
      <dd class="col-sm-9">{{ match_info.players }}</dd>
      <dt class="col-sm-3">Reserves</dt>
      <dd class="col-sm-9">{{ match_info.reserves }}</dd>
      <dt class="col-sm-3">Outcome</dt>
      <dd class="col-sm-9">{{ match_info.outcome }}</dd> -->
    </dl>
    <button
      v-if="!signed_up"
      type="button"
      class="btn btn-primary"
      data-toggle="button"
      aria-pressed="false"
      autocomplete="off"
      @click="signUpSolo"
    >
      Sign me up!
    </button>
    <button
      v-if="signed_up"
      type="button"
      class="btn btn-secondary"
      data-toggle="button"
      aria-pressed="false"
      autocomplete="off"
      @click="signUpSolo"
    >
      I want my mommy!
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Single_Match",
  data() {
    return {
      match_info: "",
      signed_up: false,
    };
  },
  methods: {
    getMatch() {
      this.match_info = this.matches.find(
        (element) => element._id === this.$route.params.id
      );
      if (this.match_info.players.find(player_id => player_id === this.discord_id)) {
        this.signed_up = true;
      } else {
        this.signed_up = false;
      }
    },
    signUpSolo() {
      if (!this.$store.getters["auth/userIsLoggedIn"]) {
        this.$store.dispatch(
          "auth/update_last_message",
          "Please login before attempting to sign up!"
        );
      } else {
          this.$store.dispatch("matches/signUpSolo", {
            match_id: this.$route.params.id,
            discord_id: this.discord_id,
          });
      }
    },
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
  computed: {
    ...mapState("matches", ["matches"]),
    ...mapState("auth", ["discord_id"]),
  },
  watch: { matches() {
    this.getMatch()
  }
  },
  created() {
    this.$store.dispatch("matches/loadMatches")
    this.getMatch()
  },
};
</script>
