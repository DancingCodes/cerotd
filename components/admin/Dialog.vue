<template>
  <UModal
    :open="state.open"
    :title="state.title"
    :description="state.message"
    :close="false"
    @update:open="onOpenChange"
  >
    <template #footer>
      <div class="flex w-full justify-end gap-2">
        <UButton
          v-if="state.kind === 'confirm'"
          color="neutral"
          variant="outline"
          @click="cancel"
        >
          {{ state.cancelText }}
        </UButton>
        <UButton :color="state.kind === 'confirm' ? 'error' : 'primary'" @click="confirm">
          {{ state.confirmText }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { AdminDialogState } from '~/composables/useAdminDialog'

defineProps<{
  state: AdminDialogState
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

function confirm() {
  emit('confirm')
}

function cancel() {
  emit('cancel')
}

function onOpenChange(open: boolean) {
  if (!open) cancel()
}
</script>
