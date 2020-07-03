<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  max-width 100%
  flex 1 0 0

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
</style>
