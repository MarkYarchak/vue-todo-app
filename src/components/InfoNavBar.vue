<template>
  <div
    class="d-flex justify-center align-center full-width white info-nav-bar nav-bar-grow"
  >
    <div
      v-if="canBack"
      title="Back to list"
      class="go-back-btn cursor-pointer no-user-select"
      @click="$router.back()"
    >
      <font-awesome-icon
        :icon="['fas', 'arrow-left']"
        style="color: white; font-size: 26px;"
      />
    </div>
    <span class="header-font">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'InfoNavBar',
  props: {
    title: {
      type: String,
      default: '',
    },
    canBack: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imageBack: '',
    };
  },
};
</script>

<style lang="stylus">
  .header-font {
    font-size: 30px;
    font-weight: bold;
  }
  .info-nav-bar {
    position sticky
    top: 0
    background-color: #00796B
    /*box-shadow: 0 8px 15px rgba(0,0,0,0.20), 0 10px 10px rgba(0,0,0,0.16);*/
  }

  .nav-bar-grow {
    height: 60px
  }

  .go-back-btn {
    position absolute;
    left: 16px;
    padding: 20px 15px
    user-select none
    border-radius: 50%
  }
</style>
