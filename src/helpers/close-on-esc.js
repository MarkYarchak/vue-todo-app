export default {
  beforeMount() {
    window.addEventListener('keydown', this.closeOnEsc, true);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.closeOnEsc, true);
  },
  methods: {
    closeOnEsc($event) {
      if ($event.code === 'Escape') this.$emit('close');
    },
  },
};
