<template>
  <div>
    <div class="admin-page-title">{{ $t('admin.productCategories.title') }}</div>
    <div class="admin-page-desc">{{ $t('admin.productCategories.fixedHint') }}</div>

    <div class="admin-card">
      <div v-for="item in categories" :key="item.slug" class="fixed-row">
        <div class="fixed-name">{{ lt(item.name) }}</div>
        <div class="fixed-slug">{{ item.slug }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PRODUCT_CATEGORIES } from '../../../shared/product-categories'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const lt = useLocalized()
const categories = PRODUCT_CATEGORIES
</script>

<style lang="scss" scoped>
.admin-page-title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
}

.admin-page-desc {
  margin-top: 8px;
  margin-bottom: 20px;
  color: #6b7280;
  font-size: 14px;
}

.admin-card {
  background: #fff;
  border: 1px solid #e5eaf0;
  border-radius: 16px;
  overflow: hidden;
}

.fixed-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  border-bottom: 1px solid #eef2f6;
}

.fixed-row:last-child {
  border-bottom: none;
}

.fixed-name {
  font-weight: 600;
  color: #111827;
}

.fixed-slug {
  color: #6b7280;
  font-size: 13px;
}
</style>
