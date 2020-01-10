<template>
  <div class="home">
    <flip-clock :options="options" />
  </div>
</template>

<script>
// @ is an alias to /src
import { FlipClock } from "@mvpleung/flipclock";

export default {
  name: "home",
  components: {
    FlipClock
  },
  data() {
    return {
      options: {

      }
    };
  }
};
</script>

<style lang="scss">
.home {
  .flip-clock-wrapper ul li a div div.inn {
    background-color: #333;
  }

  .flip-clock-divider .flip-clock-label {
    color: #f00 !important;
  }
}
</style>
