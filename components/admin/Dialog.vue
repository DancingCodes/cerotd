<template>
  <Teleport to="body">
    <div
      v-if="state.open"
      class="admin-dialog-backdrop"
      role="presentation"
      @click.self="cancel"
      @keydown.esc="cancel"
    >
      <section
        class="admin-dialog"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="messageId"
        tabindex="-1"
      >
        <div class="admin-dialog-header">
          <h2 :id="titleId" class="admin-dialog-title">{{ state.title }}</h2>
          <button type="button" class="admin-dialog-close" :aria-label="state.cancelText" @click="cancel">
            ×
          </button>
        </div>
        <p :id="messageId" class="admin-dialog-message">{{ state.message }}</p>
        <div class="admin-dialog-actions">
          <button
            v-if="state.kind === 'confirm'"
            type="button"
            class="admin-dialog-button admin-dialog-button-muted"
            @click="cancel"
          >
            {{ state.cancelText }}
          </button>
          <button
            type="button"
            class="admin-dialog-button"
            :class="{ 'admin-dialog-button-danger': state.kind === 'confirm' }"
            @click="confirm"
          >
            {{ state.confirmText }}
          </button>
        </div>
      </section>
    </div>
  </Teleport>
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

const titleId = `admin-dialog-title-${Math.random().toString(36).slice(2)}`
const messageId = `admin-dialog-message-${Math.random().toString(36).slice(2)}`

function confirm() {
  emit('confirm')
}

function cancel() {
  emit('cancel')
}
</script>

<style lang="scss" scoped>
.admin-dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.48);
}

.admin-dialog {
  width: min(100%, 440px);
  padding: 24px;
  border: 1px solid #e5eaf0;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 24px 64px rgba(15, 23, 42, 0.2);
}

.admin-dialog-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.admin-dialog-title {
  color: #111827;
  font-size: 18px;
  font-weight: 700;
}

.admin-dialog-close {
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  border-radius: 8px;
  color: #6b7280;
  font-size: 24px;
  line-height: 1;
}

.admin-dialog-close:hover {
  background: #f3f4f6;
  color: #111827;
}

.admin-dialog-message {
  margin-top: 14px;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.admin-dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
}

.admin-dialog-button {
  min-height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  background: #0e7f8f;
  color: #ffffff;
  font-size: 14px;
  font-weight: 650;
}

.admin-dialog-button:hover {
  background: #0b6d7a;
}

.admin-dialog-button-danger {
  background: #b42318;
}

.admin-dialog-button-danger:hover {
  background: #941b12;
}

.admin-dialog-button-muted {
  background: #eef1f4;
  color: #374151;
}

.admin-dialog-button-muted:hover {
  background: #e2e6eb;
}
</style>
