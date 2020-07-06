<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="stylus">
/* Global app styles (without scoped vue-attribute) */

@import "./assets/styles/modal.css";

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  max-width 100%
  flex 1 0 0

.no-user-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.scrollable-y {
  overflow-y auto
}

.container {
  width: 100%
  padding-left: 12px
  padding-right: 12px
  margin: 0 auto
}

.cursor-pointer {
  cursor: pointer;
}

.pt-8 {
  padding-top: 8rem;
}

.pt-2 {
  padding-top: 2rem;
}

.pb-4 {
  padding-top: 4rem;
}

.white {
  color: white;
}

.bg {
  &-blue {
    background-color: blue
  }
}

.d-flex {
  display: flex
}

.justify-center {
  justify-content: center
}

.align-center {
  align-items: center
}

.full-width {
  width: 100%
}

.flex-column {
  flex-direction: column
}

.border-radius-6 {
  border-radius: 6px
}

.btn {
  box-shadow 0 1px 2px 1px #bbbbbb
  &:active {
    outline none
    box-shadow 0 0 1px 1px #bbbbbb
    border-color white!important
  }
  &:focus {
    outline none
  }
}

@media (max-width: 600px) {
  .hidden-xs {
    display: none
  }
}
</style>
