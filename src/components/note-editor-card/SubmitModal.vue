<template>
  <form @submit.prevent="$emit('submit-action')">
    <div
      class="modal-mask"
      @click="$emit('close')"
    >
      <div class="modal-container-wrapper">
        <div
          class="modal-container"
          @click.stop=""
        >
          <div class="modal-header">
            <slot name="header">
              Are you really want to discard your changes?
            </slot>
          </div>

          <slot name="modal-body">
            <div style="height: 20px;" />
          </slot>

          <div class="modal-actions">
            <slot name="actions">
              <button
                class="modal-button submit-btn"
                :style="{ backgroundColor: submitBgColor }"
                type="submit"
              >
                Submit
              </button>
              <div style="flex-grow: 1;" />
              <button
                class="modal-button"
                @click="$emit('close')"
              >
                Cancel
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import closeOnEsc from '../../helpers/close-on-esc';

export default {
  name: 'SubmitModal',
  mixins: [closeOnEsc],
  props: {
    submitBgColor: {
      type: String,
      default: '#0b7ec6',
    },
  },
};
</script>

<style lang="stylus" scoped>
.submit-btn {
  color white
}
</style>
