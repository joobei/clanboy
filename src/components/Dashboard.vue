    <template>
  <div class="container-sm">
    <h1>Dashboard Page</h1>
    <div>UserName -- {{ username }}</div>
  </div>
</template>
    <script>
import { mapState } from "vuex";
export default {
  name: "DashBoard",
  computed: mapState("auth", ["username"]),
};
</script>