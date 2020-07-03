<template>
  <div
    class="d-flex justify-center align-center bg-blue full-width white info-nav-bar nav-bar-grow"
  >
    <div
      v-if="canBack"
      title="Back to list"
      class="go-back-btn cursor-pointer"
      @click="$router.back()"
    >
      <div class="go-back-icon" />
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
    box-shadow: 0 8px 15px rgba(0,0,0,0.20), 0 10px 10px rgba(0,0,0,0.16);
  }

  .nav-bar-grow {
    height: 60px
  }

  .go-back-btn {
    position absolute;
    left: 16px;
    padding: 10px
    user-select none
    border-radius: 50%
  }

  .go-back-icon {
    color: white
    width 26px
    height: 26px
    filter invert(100%)
    background: center/cover no-repeat url('../assets/icons/arrow-left-solid.svg') transparent;
  }
</style>
