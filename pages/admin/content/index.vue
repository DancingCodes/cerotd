<template>
  <div class="flex h-full min-h-0 flex-col gap-4">
    <div>
      <h1 class="text-2xl font-bold tracking-normal text-gray-900">{{ $t('admin.pageContent.title') }}</h1>
      <p class="mt-1 text-sm text-gray-500">{{ $t('admin.pageContent.subtitle') }}</p>
    </div>

    <div class="grid min-h-0 flex-1 grid-cols-[220px_minmax(0,1fr)] gap-5">
      <UCard class="h-fit">
        <div class="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">{{ $t('admin.pageContent.pages') }}</div>
        <UButton block class="justify-start" color="primary" variant="soft" icon="i-lucide-house">
          {{ $t('admin.pageContent.home') }}
        </UButton>

        <div class="mb-2 mt-6 text-xs font-semibold tracking-wide text-gray-500 uppercase">{{ $t('admin.pageContent.sections') }}</div>
        <UButton block class="justify-start" color="primary" :variant="activeSection === 'hero' ? 'soft' : 'ghost'" icon="i-lucide-panels-top-left" @click="selectSection('hero')">
          {{ $t('admin.pageContent.hero') }}
        </UButton>
        <UButton block class="mt-1 justify-start" color="primary" :variant="activeSection === 'stats' ? 'soft' : 'ghost'" icon="i-lucide-chart-no-axes-column" @click="selectSection('stats')">
          {{ $t('admin.pageContent.stats') }}
        </UButton>
        <UButton block class="mt-1 justify-start" color="primary" :variant="activeSection === 'lab' ? 'soft' : 'ghost'" icon="i-lucide-flask-conical" @click="selectSection('lab')">
          {{ $t('admin.pageContent.lab') }}
        </UButton>
        <UButton block class="mt-1 justify-start" color="primary" :variant="activeSection === 'facility' ? 'soft' : 'ghost'" icon="i-lucide-images" @click="selectSection('facility')">
          {{ $t('admin.pageContent.facility') }}
        </UButton>
        <UButton block class="mt-1 justify-start" color="primary" :variant="activeSection === 'export-services' ? 'soft' : 'ghost'" icon="i-lucide-ship" @click="selectSection('export-services')">
          {{ $t('admin.pageContent.exportServices') }}
        </UButton>
        <UButton block class="mt-1 justify-start" color="primary" :variant="activeSection === 'product-lines' ? 'soft' : 'ghost'" icon="i-lucide-package-search" @click="selectSection('product-lines')">
          {{ $t('admin.pageContent.productLines') }}
        </UButton>
        <UButton block class="mt-1 justify-start" color="primary" :variant="activeSection === 'advantages' ? 'soft' : 'ghost'" icon="i-lucide-award" @click="selectSection('advantages')">
          {{ $t('admin.pageContent.advantages') }}
        </UButton>
        <UButton block class="mt-1 justify-start" color="primary" :variant="activeSection === 'partners' ? 'soft' : 'ghost'" icon="i-lucide-handshake" @click="selectSection('partners')">
          {{ $t('admin.pageContent.partners') }}
        </UButton>
        <UButton block class="mt-1 justify-start" color="primary" :variant="activeSection === 'cta' ? 'soft' : 'ghost'" icon="i-lucide-megaphone" @click="selectSection('cta')">
          {{ $t('admin.pageContent.cta') }}
        </UButton>
      </UCard>

      <UCard v-if="activeSection === 'hero'" class="min-h-0 overflow-y-auto">
        <template #header>
          <div>
            <div class="text-lg font-semibold text-gray-900">{{ $t('admin.pageContent.hero') }}</div>
            <p class="mt-1 text-sm text-gray-500">{{ $t('admin.pageContent.heroDescription') }}</p>
          </div>
        </template>

        <UForm :state="form" :validate="validateForm" class="space-y-6" @submit="saveHero">
          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.image') }}</h2>
            <div>
              <div>
                <UFileUpload class="min-h-64 w-full" :model-value="backgroundUploadItem" :accept="imageAccept"
                  :label="uploadingImage ? $t('admin.upload.uploading') : (form.backgroundImage ? $t('admin.upload.replace') : $t('admin.upload.button'))"
                  :disabled="uploadingImage || saving" @update:model-value="onBackgroundUpload" />
                <p class="mt-2 text-xs text-gray-500">{{ $t('admin.pageContent.imageHint') }}</p>
              </div>
            </div>
          </section>

          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.text') }}</h2>
            <div class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('admin.pageContent.badgeEn')" name="badgeEn">
                <UInput v-model="form.badgeEn" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.badgeZh')" name="badgeZh">
                <UInput v-model="form.badgeZh" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.titleEn')" name="titleEn" required>
                <UInput v-model="form.titleEn" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.titleZh')" name="titleZh" required>
                <UInput v-model="form.titleZh" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.subtitleEn')" name="subtitleEn" required>
                <UTextarea v-model="form.subtitleEn" class="w-full" :rows="3" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.subtitleZh')" name="subtitleZh" required>
                <UTextarea v-model="form.subtitleZh" class="w-full" :rows="3" />
              </UFormField>
            </div>
          </section>

          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.buttons') }}</h2>
            <div class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('admin.pageContent.primaryTextEn')" name="ctaPrimaryEn" required>
                <UInput v-model="form.ctaPrimaryEn" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.primaryTextZh')" name="ctaPrimaryZh" required>
                <UInput v-model="form.ctaPrimaryZh" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.primaryLink')" name="ctaPrimaryHref" required>
                <UInput v-model="form.ctaPrimaryHref" class="w-full" placeholder="/products" />
              </UFormField>
              <div />
              <UFormField :label="$t('admin.pageContent.secondaryTextEn')" name="ctaSecondaryEn" required>
                <UInput v-model="form.ctaSecondaryEn" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.secondaryTextZh')" name="ctaSecondaryZh" required>
                <UInput v-model="form.ctaSecondaryZh" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.secondaryLink')" name="ctaSecondaryHref" required>
                <UInput v-model="form.ctaSecondaryHref" class="w-full" placeholder="/contact" />
              </UFormField>
            </div>
          </section>

          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.trustLabels') }}</h2>
            <div v-for="(label, index) in form.trustLabels" :key="index" class="grid grid-cols-[1fr_1fr_auto] gap-4">
              <UFormField :label="$t('admin.pageContent.trustEn', { n: index + 1 })">
                <UInput v-model="label.en" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.trustZh', { n: index + 1 })">
                <UInput v-model="label.zh" class="w-full" />
              </UFormField>
              <UButton class="self-end" color="error" variant="ghost" icon="i-lucide-trash-2" :aria-label="$t('admin.pageContent.removeTrust')" @click="removeTrustLabel(index)" />
            </div>
            <UButton color="neutral" variant="soft" icon="i-lucide-plus" @click="addTrustLabel">{{ $t('admin.pageContent.addTrust') }}</UButton>
          </section>

          <div class="flex justify-end border-t border-gray-200 pt-4">
            <UButton type="submit" :loading="saving" :disabled="uploadingImage">{{ $t('admin.common.save') }}</UButton>
          </div>
        </UForm>
      </UCard>

      <UCard v-else-if="activeSection === 'stats'" class="min-h-0 overflow-y-auto">
        <template #header>
          <div>
            <div class="text-lg font-semibold text-gray-900">{{ $t('admin.pageContent.stats') }}</div>
            <p class="mt-1 text-sm text-gray-500">{{ $t('admin.pageContent.statsDescription') }}</p>
          </div>
        </template>

        <UForm :state="statsForm" class="space-y-6" @submit="saveStats">
          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.statsItems') }}</h2>
            <div v-for="(item, index) in statsForm.items" :key="index" class="grid grid-cols-[1fr_1fr_auto] gap-4 border-b border-gray-100 pb-4">
              <div class="grid grid-cols-2 gap-4">
                <UFormField :label="$t('admin.pageContent.statValueEn', { n: index + 1 })"><UInput v-model="item.valueEn" class="w-full" /></UFormField>
                <UFormField :label="$t('admin.pageContent.statValueZh', { n: index + 1 })"><UInput v-model="item.valueZh" class="w-full" /></UFormField>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <UFormField :label="$t('admin.pageContent.statLabelEn', { n: index + 1 })"><UInput v-model="item.labelEn" class="w-full" /></UFormField>
                <UFormField :label="$t('admin.pageContent.statLabelZh', { n: index + 1 })"><UInput v-model="item.labelZh" class="w-full" /></UFormField>
              </div>
              <UButton class="self-end" color="error" variant="ghost" icon="i-lucide-trash-2" :aria-label="$t('admin.pageContent.removeStat')" @click="removeStat(index)" />
            </div>
            <UButton color="neutral" variant="soft" icon="i-lucide-plus" :disabled="statsForm.items.length >= 4" @click="addStat">{{ $t('admin.pageContent.addStat') }}</UButton>
          </section>
          <div class="flex justify-end border-t border-gray-200 pt-4"><UButton type="submit" :loading="saving">{{ $t('admin.common.save') }}</UButton></div>
        </UForm>
      </UCard>

      <UCard v-else-if="activeSection === 'lab'" class="min-h-0 overflow-y-auto">
        <template #header>
          <div>
            <div class="text-lg font-semibold text-gray-900">{{ $t('admin.pageContent.lab') }}</div>
            <p class="mt-1 text-sm text-gray-500">{{ $t('admin.pageContent.labDescription') }}</p>
          </div>
        </template>
        <UForm :state="labForm" class="space-y-6" @submit="saveLab">
          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.text') }}</h2>
            <div class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('admin.pageContent.labTitleEn')"><UInput v-model="labForm.titleEn" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.labTitleZh')"><UInput v-model="labForm.titleZh" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.labSubtitleEn')"><UTextarea v-model="labForm.subtitleEn" class="w-full" :rows="2" /></UFormField>
              <UFormField :label="$t('admin.pageContent.labSubtitleZh')"><UTextarea v-model="labForm.subtitleZh" class="w-full" :rows="2" /></UFormField>
            </div>
          </section>
          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.labPoints') }}</h2>
            <div v-for="(point, index) in labForm.points" :key="index" class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('admin.pageContent.labPointEn', { n: index + 1 })"><UTextarea v-model="point.en" class="w-full" :rows="2" /></UFormField>
              <UFormField :label="$t('admin.pageContent.labPointZh', { n: index + 1 })"><UTextarea v-model="point.zh" class="w-full" :rows="2" /></UFormField>
            </div>
          </section>
          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.labLink') }}</h2>
            <div class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('admin.pageContent.labLinkEn')"><UInput v-model="labForm.linkEn" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.labLinkZh')"><UInput v-model="labForm.linkZh" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.labLinkHref')"><UInput v-model="labForm.linkHref" class="w-full" /></UFormField>
            </div>
          </section>
          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.labCards') }}</h2>
            <div v-for="(card, index) in labForm.cards" :key="index" class="grid grid-cols-2 gap-4 border-b border-gray-100 pb-4">
              <UFormField :label="$t('admin.pageContent.labCardNameEn', { n: index + 1 })"><UInput v-model="card.nameEn" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.labCardNameZh', { n: index + 1 })"><UInput v-model="card.nameZh" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.labCardDescEn', { n: index + 1 })"><UTextarea v-model="card.descriptionEn" class="w-full" :rows="2" /></UFormField>
              <UFormField :label="$t('admin.pageContent.labCardDescZh', { n: index + 1 })"><UTextarea v-model="card.descriptionZh" class="w-full" :rows="2" /></UFormField>
            </div>
          </section>
          <div class="flex justify-end border-t border-gray-200 pt-4"><UButton type="submit" :loading="saving">{{ $t('admin.common.save') }}</UButton></div>
        </UForm>
      </UCard>

      <UCard v-else-if="activeSection === 'facility'" class="min-h-0 overflow-y-auto">
        <template #header><div><div class="text-lg font-semibold text-gray-900">{{ $t('admin.pageContent.facility') }}</div><p class="mt-1 text-sm text-gray-500">{{ $t('admin.pageContent.facilityDescription') }}</p></div></template>
        <UForm :state="facilityForm" class="space-y-6" @submit="saveFacility">
          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.text') }}</h2>
            <div class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('admin.pageContent.facilityTitleEn')"><UInput v-model="facilityForm.titleEn" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.facilityTitleZh')"><UInput v-model="facilityForm.titleZh" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.facilitySubtitleEn')"><UTextarea v-model="facilityForm.subtitleEn" class="w-full" :rows="2" /></UFormField>
              <UFormField :label="$t('admin.pageContent.facilitySubtitleZh')"><UTextarea v-model="facilityForm.subtitleZh" class="w-full" :rows="2" /></UFormField>
            </div>
          </section>
          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.facilityTabs') }}</h2>
            <div v-for="(category, index) in facilityForm.categories" :key="category.id" class="grid grid-cols-[1fr_1fr_auto] items-end gap-4">
              <UFormField :label="$t('admin.pageContent.facilityCategoryEn', { n: index + 1 })"><UInput v-model="category.name.en" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.facilityCategoryZh', { n: index + 1 })"><UInput v-model="category.name.zh" class="w-full" /></UFormField>
              <UButton color="error" variant="ghost" icon="i-lucide-trash-2" :aria-label="$t('admin.pageContent.removeCategory')" @click="removeFacilityCategory(index)" />
            </div>
            <UButton color="neutral" variant="soft" icon="i-lucide-plus" :disabled="facilityForm.categories.length >= 12" @click="addFacilityCategory">{{ $t('admin.pageContent.addCategory') }}</UButton>
          </section>
          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.facilityLink') }}</h2>
            <div class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('admin.pageContent.facilityLinkEn')"><UInput v-model="facilityForm.linkEn" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.facilityLinkZh')"><UInput v-model="facilityForm.linkZh" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.facilityLinkHref')"><UInput v-model="facilityForm.linkHref" class="w-full" /></UFormField>
            </div>
          </section>
          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.facilityImages') }}</h2>
            <div v-for="(image, index) in facilityForm.images" :key="index" class="grid grid-cols-[150px_120px_1fr_1fr_auto] items-end gap-3 border-b border-gray-100 pb-4">
              <UFileUpload :model-value="image.upload" :accept="imageAccept" :label="image.src ? $t('admin.upload.replace') : $t('admin.upload.button')" :disabled="saving" @update:model-value="(value) => onFacilityImageUpload(index, value)" />
              <USelect v-model="image.categoryId" :items="facilityCategoryOptions" />
              <UInput v-model="image.captionEn" :placeholder="$t('admin.pageContent.captionEn')" />
              <UInput v-model="image.captionZh" :placeholder="$t('admin.pageContent.captionZh')" />
              <UButton color="error" variant="ghost" icon="i-lucide-trash-2" :aria-label="$t('admin.pageContent.removeImage')" @click="removeFacilityImage(index)" />
            </div>
            <UButton color="neutral" variant="soft" icon="i-lucide-plus" :disabled="facilityForm.images.length >= 24" @click="addFacilityImage">{{ $t('admin.pageContent.addImage') }}</UButton>
          </section>
          <div class="flex justify-end border-t border-gray-200 pt-4"><UButton type="submit" :loading="saving || uploadingFacilityImage">{{ $t('admin.common.save') }}</UButton></div>
        </UForm>
      </UCard>

      <UCard v-else-if="activeSection === 'export-services'" class="min-h-0 overflow-y-auto">
        <template #header><div><div class="text-lg font-semibold text-gray-900">{{ $t('admin.pageContent.exportServices') }}</div><p class="mt-1 text-sm text-gray-500">{{ $t('admin.pageContent.exportServicesDescription') }}</p></div></template>
        <UForm :state="exportForm" class="space-y-6" @submit="saveExportServices">
          <section class="space-y-4"><h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.text') }}</h2><div class="grid grid-cols-2 gap-4">
            <UFormField :label="$t('admin.pageContent.exportTitleEn')"><UInput v-model="exportForm.titleEn" class="w-full" /></UFormField>
            <UFormField :label="$t('admin.pageContent.exportTitleZh')"><UInput v-model="exportForm.titleZh" class="w-full" /></UFormField>
            <UFormField :label="$t('admin.pageContent.exportSubtitleEn')"><UTextarea v-model="exportForm.subtitleEn" class="w-full" :rows="2" /></UFormField>
            <UFormField :label="$t('admin.pageContent.exportSubtitleZh')"><UTextarea v-model="exportForm.subtitleZh" class="w-full" :rows="2" /></UFormField>
          </div></section>
          <section class="space-y-4"><h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.exportItems') }}</h2>
            <div v-for="(item, index) in exportForm.items" :key="index" class="grid grid-cols-2 gap-4 border-b border-gray-100 pb-4">
              <UFormField :label="$t('admin.pageContent.exportItemNameEn', { n: index + 1 })"><UInput v-model="item.nameEn" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.exportItemNameZh', { n: index + 1 })"><UInput v-model="item.nameZh" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.exportItemDescEn', { n: index + 1 })"><UTextarea v-model="item.descriptionEn" class="w-full" :rows="2" /></UFormField>
              <UFormField :label="$t('admin.pageContent.exportItemDescZh', { n: index + 1 })"><UTextarea v-model="item.descriptionZh" class="w-full" :rows="2" /></UFormField>
              <UButton color="error" variant="ghost" icon="i-lucide-trash-2" :aria-label="$t('admin.pageContent.removeExportItem')" @click="removeExportItem(index)" />
            </div>
            <UButton color="neutral" variant="soft" icon="i-lucide-plus" :disabled="exportForm.items.length >= 8" @click="addExportItem">{{ $t('admin.pageContent.addExportItem') }}</UButton>
          </section>
          <section class="space-y-4"><h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.exportLink') }}</h2><div class="grid grid-cols-2 gap-4">
            <UFormField :label="$t('admin.pageContent.exportLinkEn')"><UInput v-model="exportForm.linkEn" class="w-full" /></UFormField>
            <UFormField :label="$t('admin.pageContent.exportLinkZh')"><UInput v-model="exportForm.linkZh" class="w-full" /></UFormField>
            <UFormField :label="$t('admin.pageContent.exportLinkHref')"><UInput v-model="exportForm.linkHref" class="w-full" /></UFormField>
          </div></section>
          <div class="flex justify-end border-t border-gray-200 pt-4"><UButton type="submit" :loading="saving">{{ $t('admin.common.save') }}</UButton></div>
        </UForm>
      </UCard>

      <UCard v-if="activeSection === 'product-lines'" class="min-h-0 overflow-y-auto">
        <template #header><div><div class="text-lg font-semibold text-gray-900">{{ $t('admin.pageContent.productLines') }}</div><p class="mt-1 text-sm text-gray-500">{{ $t('admin.pageContent.productLinesDescription') }}</p></div></template>
        <UForm :state="productLinesForm" class="space-y-6" @submit="saveProductLines">
          <section class="space-y-4"><h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.text') }}</h2><div class="grid grid-cols-2 gap-4">
            <UFormField :label="$t('admin.pageContent.productLinesTitleEn')"><UInput v-model="productLinesForm.titleEn" class="w-full" /></UFormField>
            <UFormField :label="$t('admin.pageContent.productLinesTitleZh')"><UInput v-model="productLinesForm.titleZh" class="w-full" /></UFormField>
            <UFormField :label="$t('admin.pageContent.productLinesSubtitleEn')"><UTextarea v-model="productLinesForm.subtitleEn" class="w-full" :rows="2" /></UFormField>
            <UFormField :label="$t('admin.pageContent.productLinesSubtitleZh')"><UTextarea v-model="productLinesForm.subtitleZh" class="w-full" :rows="2" /></UFormField>
          </div></section>
          <section class="space-y-4"><h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.productLinesLink') }}</h2><div class="grid grid-cols-2 gap-4">
            <UFormField :label="$t('admin.pageContent.productLinesLinkEn')"><UInput v-model="productLinesForm.linkEn" class="w-full" /></UFormField>
            <UFormField :label="$t('admin.pageContent.productLinesLinkZh')"><UInput v-model="productLinesForm.linkZh" class="w-full" /></UFormField>
            <UFormField :label="$t('admin.pageContent.productLinesLinkHref')"><UInput v-model="productLinesForm.linkHref" class="w-full" /></UFormField>
          </div></section>
          <div class="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">{{ $t('admin.pageContent.productLinesSource') }}</div>
          <div class="flex justify-end border-t border-gray-200 pt-4"><UButton type="submit" :loading="saving">{{ $t('admin.common.save') }}</UButton></div>
        </UForm>
      </UCard>

      <UCard v-if="activeSection === 'advantages'" class="min-h-0 overflow-y-auto">
        <template #header><div><div class="text-lg font-semibold text-gray-900">{{ $t('admin.pageContent.advantages') }}</div><p class="mt-1 text-sm text-gray-500">{{ $t('admin.pageContent.advantagesDescription') }}</p></div></template>
        <UForm :state="advantagesForm" class="space-y-6" @submit="saveAdvantages">
          <section class="space-y-4"><h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.text') }}</h2><div class="grid grid-cols-2 gap-4">
            <UFormField :label="$t('admin.pageContent.advantagesTitleEn')"><UInput v-model="advantagesForm.titleEn" class="w-full" /></UFormField>
            <UFormField :label="$t('admin.pageContent.advantagesTitleZh')"><UInput v-model="advantagesForm.titleZh" class="w-full" /></UFormField>
            <UFormField :label="$t('admin.pageContent.advantagesSubtitleEn')"><UTextarea v-model="advantagesForm.subtitleEn" class="w-full" :rows="2" /></UFormField>
            <UFormField :label="$t('admin.pageContent.advantagesSubtitleZh')"><UTextarea v-model="advantagesForm.subtitleZh" class="w-full" :rows="2" /></UFormField>
          </div></section>
          <section class="space-y-4"><h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.advantagesCards') }}</h2>
            <div v-for="(item, index) in advantagesForm.items" :key="index" class="grid grid-cols-[180px_1fr_1fr_auto] items-end gap-4 border-b border-gray-100 pb-5">
              <div><UFileUpload :model-value="item.upload" :accept="imageAccept" :label="item.image ? $t('admin.upload.replace') : $t('admin.upload.button')" :disabled="saving || uploadingAdvantageImage" @update:model-value="(value) => onAdvantageImageUpload(index, value)" /></div>
              <div class="space-y-3">
                <UFormField :label="$t('admin.pageContent.advantageNameEn', { n: index + 1 })"><UInput v-model="item.nameEn" class="w-full" /></UFormField>
                <UFormField :label="$t('admin.pageContent.advantageDescEn', { n: index + 1 })"><UTextarea v-model="item.descriptionEn" class="w-full" :rows="3" /></UFormField>
              </div>
              <div class="space-y-3">
                <UFormField :label="$t('admin.pageContent.advantageNameZh', { n: index + 1 })"><UInput v-model="item.nameZh" class="w-full" /></UFormField>
                <UFormField :label="$t('admin.pageContent.advantageDescZh', { n: index + 1 })"><UTextarea v-model="item.descriptionZh" class="w-full" :rows="3" /></UFormField>
              </div>
              <UButton class="mb-1" color="error" variant="ghost" icon="i-lucide-trash-2" :aria-label="$t('admin.pageContent.removeAdvantage', { n: index + 1 })" :disabled="saving || uploadingAdvantageImage" @click="removeAdvantage(index)" />
            </div>
            <UButton color="neutral" variant="soft" icon="i-lucide-plus" :disabled="advantagesForm.items.length >= 12 || saving || uploadingAdvantageImage" @click="addAdvantage">{{ $t('admin.pageContent.addAdvantage') }}</UButton>
          </section>
          <section class="space-y-4"><h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.advantagesLink') }}</h2><div class="grid grid-cols-2 gap-4">
            <UFormField :label="$t('admin.pageContent.advantagesLinkEn')"><UInput v-model="advantagesForm.linkEn" class="w-full" /></UFormField>
            <UFormField :label="$t('admin.pageContent.advantagesLinkZh')"><UInput v-model="advantagesForm.linkZh" class="w-full" /></UFormField>
            <UFormField :label="$t('admin.pageContent.advantagesLinkHref')"><UInput v-model="advantagesForm.linkHref" class="w-full" /></UFormField>
          </div></section>
          <div class="flex justify-end border-t border-gray-200 pt-4"><UButton type="submit" :loading="saving" :disabled="uploadingAdvantageImage">{{ $t('admin.common.save') }}</UButton></div>
        </UForm>
      </UCard>

      <UCard v-if="activeSection === 'partners'" class="min-h-0 overflow-y-auto">
        <template #header><div><div class="text-lg font-semibold text-gray-900">{{ $t('admin.pageContent.partners') }}</div><p class="mt-1 text-sm text-gray-500">{{ $t('admin.pageContent.partnersDescription') }}</p></div></template>
        <UForm :state="partnersForm" class="space-y-6" @submit="savePartners">
          <section class="space-y-4"><h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.text') }}</h2><div class="grid grid-cols-2 gap-4">
            <UFormField :label="$t('admin.pageContent.partnersTitleEn')"><UInput v-model="partnersForm.titleEn" class="w-full" /></UFormField>
            <UFormField :label="$t('admin.pageContent.partnersTitleZh')"><UInput v-model="partnersForm.titleZh" class="w-full" /></UFormField>
            <UFormField :label="$t('admin.pageContent.partnersSubtitleEn')"><UTextarea v-model="partnersForm.subtitleEn" class="w-full" :rows="2" /></UFormField>
            <UFormField :label="$t('admin.pageContent.partnersSubtitleZh')"><UTextarea v-model="partnersForm.subtitleZh" class="w-full" :rows="2" /></UFormField>
          </div></section>
          <section class="space-y-4"><h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.partnerItems') }}</h2>
            <div v-for="(item, index) in partnersForm.items" :key="index" class="grid grid-cols-[180px_1fr_auto] items-end gap-4 border-b border-gray-100 pb-5">
              <UFileUpload :model-value="item.upload" :accept="imageAccept" :label="item.logo ? $t('admin.upload.replace') : $t('admin.upload.button')" :disabled="saving || uploadingPartnerImage" @update:model-value="(value) => onPartnerImageUpload(index, value)" />
              <UFormField :label="$t('admin.pageContent.partnerHref', { n: index + 1 })"><UInput v-model="item.href" class="w-full" placeholder="https://" /></UFormField>
              <UButton class="mb-1" color="error" variant="ghost" icon="i-lucide-trash-2" :aria-label="$t('admin.pageContent.removePartner', { n: index + 1 })" :disabled="saving || uploadingPartnerImage" @click="removePartner(index)" />
            </div>
            <UButton color="neutral" variant="soft" icon="i-lucide-plus" :disabled="partnersForm.items.length >= 12 || saving || uploadingPartnerImage" @click="addPartner">{{ $t('admin.pageContent.addPartner') }}</UButton>
          </section>
          <div class="flex justify-end border-t border-gray-200 pt-4"><UButton type="submit" :loading="saving || uploadingPartnerImage" :disabled="uploadingPartnerImage">{{ $t('admin.common.save') }}</UButton></div>
        </UForm>
      </UCard>

      <UCard v-if="activeSection === 'cta'" class="min-h-0 overflow-y-auto">
        <template #header><div><div class="text-lg font-semibold text-gray-900">{{ $t('admin.pageContent.cta') }}</div><p class="mt-1 text-sm text-gray-500">{{ $t('admin.pageContent.ctaDescription') }}</p></div></template>
        <UForm :state="ctaForm" class="space-y-6" @submit="saveCta">
          <section class="space-y-4"><h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.text') }}</h2>
            <div class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('admin.pageContent.ctaTitleEn')"><UInput v-model="ctaForm.titleEn" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.ctaTitleZh')"><UInput v-model="ctaForm.titleZh" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.ctaSubtitleEn')"><UTextarea v-model="ctaForm.subtitleEn" class="w-full" :rows="2" /></UFormField>
              <UFormField :label="$t('admin.pageContent.ctaSubtitleZh')"><UTextarea v-model="ctaForm.subtitleZh" class="w-full" :rows="2" /></UFormField>
              <UFormField :label="$t('admin.pageContent.ctaButtonEn')"><UInput v-model="ctaForm.buttonEn" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.ctaButtonZh')"><UInput v-model="ctaForm.buttonZh" class="w-full" /></UFormField>
              <UFormField :label="$t('admin.pageContent.ctaHref')"><UInput v-model="ctaForm.href" class="w-full" placeholder="/contact" /></UFormField>
            </div>
          </section>
          <div class="flex justify-end border-t border-gray-200 pt-4"><UButton type="submit" :loading="saving">{{ $t('admin.common.save') }}</UButton></div>
        </UForm>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

type LocalizedText = { en: string; zh: string }
type HeroForm = {
  backgroundImage: string
  badgeEn: string
  badgeZh: string
  titleEn: string
  titleZh: string
  subtitleEn: string
  subtitleZh: string
  ctaPrimaryEn: string
  ctaPrimaryZh: string
  ctaPrimaryHref: string
  ctaSecondaryEn: string
  ctaSecondaryZh: string
  ctaSecondaryHref: string
  trustLabels: LocalizedText[]
}
type HomeHeroContent = {
  backgroundImage: string
  badge: LocalizedText
  title: LocalizedText
  subtitle: LocalizedText
  ctaPrimary: { text: LocalizedText; href: string }
  ctaSecondary: { text: LocalizedText; href: string }
  trustLabels: LocalizedText[]
}
type HomeHeroResponse = { content: HomeHeroContent | null; updatedAt: string | null }
type StatsFormItem = { valueEn: string; valueZh: string; labelEn: string; labelZh: string }
type HomeStatsContent = { items: Array<{ value: LocalizedText; label: LocalizedText }> }
type HomeStatsResponse = { content: HomeStatsContent | null; updatedAt: string | null }
type LabForm = {
  titleEn: string
  titleZh: string
  subtitleEn: string
  subtitleZh: string
  points: LocalizedText[]
  linkEn: string
  linkZh: string
  linkHref: string
  cards: Array<{ nameEn: string; nameZh: string; descriptionEn: string; descriptionZh: string }>
}
type HomeLabContent = {
  title: LocalizedText
  subtitle: LocalizedText
  points: LocalizedText[]
  link: { text: LocalizedText; href: string }
  cards: Array<{ name: LocalizedText; description: LocalizedText }>
}
type HomeLabResponse = { content: HomeLabContent | null; updatedAt: string | null }
type FacilityCategory = { id: string; name: LocalizedText }
type FacilityImageForm = { categoryId: string; src: string; captionEn: string; captionZh: string; upload: UploadedImage | null }
type FacilityForm = {
  titleEn: string; titleZh: string; subtitleEn: string; subtitleZh: string
  categories: FacilityCategory[]
  linkEn: string; linkZh: string; linkHref: string
  images: FacilityImageForm[]
}
type FacilityResponseContent = { title: LocalizedText; subtitle: LocalizedText; categories: FacilityCategory[]; link: { text: LocalizedText; href: string }; images: Array<{ categoryId: string; src: string; caption: LocalizedText }> }
type FacilityResponse = { content: FacilityResponseContent | null; updatedAt: string | null }
type ExportItemForm = { nameEn: string; nameZh: string; descriptionEn: string; descriptionZh: string }
type ExportForm = { titleEn: string; titleZh: string; subtitleEn: string; subtitleZh: string; items: ExportItemForm[]; linkEn: string; linkZh: string; linkHref: string }
type ExportResponseContent = { title: LocalizedText; subtitle: LocalizedText; items: Array<{ name: LocalizedText; description: LocalizedText }>; link: { text: LocalizedText; href: string } }
type ExportResponse = { content: ExportResponseContent | null; updatedAt: string | null }
type ProductLinesForm = { titleEn: string; titleZh: string; subtitleEn: string; subtitleZh: string; linkEn: string; linkZh: string; linkHref: string }
type ProductLinesResponse = { content: { title: LocalizedText; subtitle: LocalizedText; link: { text: LocalizedText; href: string } } | null; updatedAt: string | null }
type AdvantageItemForm = { nameEn: string; nameZh: string; descriptionEn: string; descriptionZh: string; image: string; upload: UploadedImage | null }
type AdvantagesForm = { titleEn: string; titleZh: string; subtitleEn: string; subtitleZh: string; linkEn: string; linkZh: string; linkHref: string; items: AdvantageItemForm[] }
type AdvantagesResponseContent = { title: LocalizedText; subtitle: LocalizedText; link: { text: LocalizedText; href: string }; items: Array<{ name: LocalizedText; description: LocalizedText; image: string }> }
type AdvantagesResponse = { content: AdvantagesResponseContent | null; updatedAt: string | null }
type PartnerItemForm = { logo: string; href: string; upload: UploadedImage | null }
type PartnersForm = { titleEn: string; titleZh: string; subtitleEn: string; subtitleZh: string; items: PartnerItemForm[] }
type PartnersResponse = { content: { title: LocalizedText; subtitle: LocalizedText; items: Array<{ logo: string; href: string }> } | null; updatedAt: string | null }
type CtaForm = { titleEn: string; titleZh: string; subtitleEn: string; subtitleZh: string; buttonEn: string; buttonZh: string; href: string }
type CtaResponse = { content: { title: LocalizedText; subtitle: LocalizedText; button: LocalizedText; href: string } | null; updatedAt: string | null }
type UploadedImage = { name: string; avatar: { src: string } }

const { t } = useI18n()
const { add: toast } = useToast()
const saving = ref(false)
const uploadingImage = ref(false)
const activeSection = ref<'hero' | 'stats' | 'lab' | 'facility' | 'export-services' | 'product-lines' | 'advantages' | 'partners' | 'cta'>('hero')
const imageAccept = 'image/jpeg,image/png,image/webp,image/gif,image/avif'

function emptyForm(): HeroForm {
  return {
    backgroundImage: '',
    badgeEn: '',
    badgeZh: '',
    titleEn: '',
    titleZh: '',
    subtitleEn: '',
    subtitleZh: '',
    ctaPrimaryEn: '',
    ctaPrimaryZh: '',
    ctaPrimaryHref: '',
    ctaSecondaryEn: '',
    ctaSecondaryZh: '',
    ctaSecondaryHref: '',
    trustLabels: []
  }
}

const form = reactive<HeroForm>(emptyForm())
const statsForm = reactive<{ items: StatsFormItem[] }>({ items: [] })
const labForm = reactive<LabForm>({
  titleEn: '', titleZh: '', subtitleEn: '', subtitleZh: '',
  points: Array.from({ length: 3 }, () => ({ en: '', zh: '' })),
  linkEn: '', linkZh: '', linkHref: '',
  cards: Array.from({ length: 4 }, () => ({ nameEn: '', nameZh: '', descriptionEn: '', descriptionZh: '' }))
})
const facilityForm = reactive<FacilityForm>({
  titleEn: '', titleZh: '', subtitleEn: '', subtitleZh: '',
  categories: [],
  linkEn: '', linkZh: '', linkHref: '', images: []
})
const facilityCategoryOptions = computed(() => facilityForm.categories.map((category) => ({ label: category.name.en || category.name.zh || category.id, value: category.id })))
const uploadingFacilityImage = ref(false)
const exportForm = reactive<ExportForm>({ titleEn: '', titleZh: '', subtitleEn: '', subtitleZh: '', items: [], linkEn: '', linkZh: '', linkHref: '' })
const productLinesForm = reactive<ProductLinesForm>({ titleEn: '', titleZh: '', subtitleEn: '', subtitleZh: '', linkEn: '', linkZh: '', linkHref: '' })
const advantagesForm = reactive<AdvantagesForm>({
  titleEn: '', titleZh: '', subtitleEn: '', subtitleZh: '', linkEn: '', linkZh: '', linkHref: '',
  items: []
})
const uploadingAdvantageImage = ref(false)
const partnersForm = reactive<PartnersForm>({ titleEn: '', titleZh: '', subtitleEn: '', subtitleZh: '', items: [] })
const uploadingPartnerImage = ref(false)
const ctaForm = reactive<CtaForm>({ titleEn: '', titleZh: '', subtitleEn: '', subtitleZh: '', buttonEn: '', buttonZh: '', href: '' })
const backgroundUploadItem = computed<UploadedImage | null>(() => form.backgroundImage ? {
  name: form.backgroundImage.split('/').pop() || 'hero-image',
  avatar: { src: form.backgroundImage }
} : null)

function localizedPayload(en: string, zh: string) {
  return { en: en.trim(), zh: zh.trim() }
}

function readContent(content: HomeHeroContent) {
  Object.assign(form, {
    backgroundImage: content.backgroundImage || '',
    badgeEn: content.badge.en,
    badgeZh: content.badge.zh,
    titleEn: content.title.en,
    titleZh: content.title.zh,
    subtitleEn: content.subtitle.en,
    subtitleZh: content.subtitle.zh,
    ctaPrimaryEn: content.ctaPrimary.text.en,
    ctaPrimaryZh: content.ctaPrimary.text.zh,
    ctaPrimaryHref: content.ctaPrimary.href,
    ctaSecondaryEn: content.ctaSecondary.text.en,
    ctaSecondaryZh: content.ctaSecondary.text.zh,
    ctaSecondaryHref: content.ctaSecondary.href,
    trustLabels: (content.trustLabels || []).map((label) => ({ en: label.en, zh: label.zh }))
  })
}

function addTrustLabel() {
  form.trustLabels.push({ en: '', zh: '' })
}

function removeTrustLabel(index: number) {
  form.trustLabels.splice(index, 1)
}

async function load() {
  const result = await apiFetch<HomeHeroResponse>('/api/page-content/home/hero')
  if (result.content) readContent(result.content)
}

async function loadStats() {
  const result = await apiFetch<HomeStatsResponse>('/api/page-content/home/stats')
  statsForm.items = (result.content?.items || []).map((item) => ({ valueEn: item.value.en, valueZh: item.value.zh, labelEn: item.label.en, labelZh: item.label.zh }))
}

async function loadLab() {
  const result = await apiFetch<HomeLabResponse>('/api/page-content/home/lab')
  const content = result.content
  labForm.titleEn = content?.title.en || ''
  labForm.titleZh = content?.title.zh || ''
  labForm.subtitleEn = content?.subtitle.en || ''
  labForm.subtitleZh = content?.subtitle.zh || ''
  labForm.points = Array.from({ length: 3 }, (_, index) => ({ en: content?.points[index]?.en || '', zh: content?.points[index]?.zh || '' }))
  labForm.linkEn = content?.link.text.en || ''
  labForm.linkZh = content?.link.text.zh || ''
  labForm.linkHref = content?.link.href || ''
  labForm.cards = Array.from({ length: 4 }, (_, index) => ({
    nameEn: content?.cards[index]?.name.en || '',
    nameZh: content?.cards[index]?.name.zh || '',
    descriptionEn: content?.cards[index]?.description.en || '',
    descriptionZh: content?.cards[index]?.description.zh || ''
  }))
}

async function loadFacility() {
  const result = await apiFetch<FacilityResponse>('/api/page-content/home/facility')
  const content = result.content
  facilityForm.titleEn = content?.title.en || ''; facilityForm.titleZh = content?.title.zh || ''
  facilityForm.subtitleEn = content?.subtitle.en || ''; facilityForm.subtitleZh = content?.subtitle.zh || ''
  facilityForm.categories = (content?.categories || []).map((category) => ({ id: category.id, name: { en: category.name.en, zh: category.name.zh } }))
  facilityForm.linkEn = content?.link?.text?.en || ''; facilityForm.linkZh = content?.link?.text?.zh || ''; facilityForm.linkHref = content?.link?.href || ''
  facilityForm.images = (content?.images || []).map((image) => ({ categoryId: image.categoryId, src: image.src, captionEn: image.caption?.en || '', captionZh: image.caption?.zh || '', upload: image.src ? { name: image.src.split('/').pop() || 'image', avatar: { src: image.src } } : null }))
}

async function loadExportServices() {
  const result = await apiFetch<ExportResponse>('/api/page-content/home/export-services')
  const content = result.content
  exportForm.titleEn = content?.title.en || ''; exportForm.titleZh = content?.title.zh || ''
  exportForm.subtitleEn = content?.subtitle.en || ''; exportForm.subtitleZh = content?.subtitle.zh || ''
  exportForm.items = (content?.items || []).map((item) => ({ nameEn: item.name.en, nameZh: item.name.zh, descriptionEn: item.description.en, descriptionZh: item.description.zh }))
  exportForm.linkEn = content?.link?.text?.en || ''; exportForm.linkZh = content?.link?.text?.zh || ''; exportForm.linkHref = content?.link?.href || ''
}

async function loadProductLines() {
  const result = await apiFetch<ProductLinesResponse>('/api/page-content/home/product-lines')
  const content = result.content
  productLinesForm.titleEn = content?.title.en || ''; productLinesForm.titleZh = content?.title.zh || ''
  productLinesForm.subtitleEn = content?.subtitle.en || ''; productLinesForm.subtitleZh = content?.subtitle.zh || ''
  productLinesForm.linkEn = content?.link?.text?.en || ''; productLinesForm.linkZh = content?.link?.text?.zh || ''; productLinesForm.linkHref = content?.link?.href || ''
}

async function loadAdvantages() {
  const result = await apiFetch<AdvantagesResponse>('/api/page-content/home/advantages')
  const content = result.content
  advantagesForm.titleEn = content?.title.en || ''; advantagesForm.titleZh = content?.title.zh || ''
  advantagesForm.subtitleEn = content?.subtitle.en || ''; advantagesForm.subtitleZh = content?.subtitle.zh || ''
  advantagesForm.linkEn = content?.link?.text?.en || ''; advantagesForm.linkZh = content?.link?.text?.zh || ''; advantagesForm.linkHref = content?.link?.href || ''
  advantagesForm.items = (content?.items || []).map((item) => ({
    nameEn: item.name.en, nameZh: item.name.zh,
    descriptionEn: item.description.en, descriptionZh: item.description.zh,
    image: item.image,
    upload: item.image ? { name: item.image.split('/').pop() || 'image', avatar: { src: item.image } } : null
  }))
}

async function loadPartners() {
  const result = await apiFetch<PartnersResponse>('/api/page-content/home/partners')
  const content = result.content
  partnersForm.titleEn = content?.title.en || ''; partnersForm.titleZh = content?.title.zh || ''
  partnersForm.subtitleEn = content?.subtitle.en || ''; partnersForm.subtitleZh = content?.subtitle.zh || ''
  partnersForm.items = (content?.items || []).map((item) => ({
    logo: item.logo, href: item.href,
    upload: item.logo ? { name: item.logo.split('/').pop() || 'logo', avatar: { src: item.logo } } : null
  }))
}

async function loadCta() {
  const result = await apiFetch<CtaResponse>('/api/page-content/home/cta')
  const content = result.content
  ctaForm.titleEn = content?.title.en || ''; ctaForm.titleZh = content?.title.zh || ''
  ctaForm.subtitleEn = content?.subtitle.en || ''; ctaForm.subtitleZh = content?.subtitle.zh || ''
  ctaForm.buttonEn = content?.button.en || ''; ctaForm.buttonZh = content?.button.zh || ''
  ctaForm.href = content?.href || ''
}

function addPartner() {
  if (partnersForm.items.length < 12) partnersForm.items.push({ logo: '', href: '', upload: null })
}

function removePartner(index: number) {
  partnersForm.items.splice(index, 1)
}

function addAdvantage() {
  if (advantagesForm.items.length < 12) {
    advantagesForm.items.push({ nameEn: '', nameZh: '', descriptionEn: '', descriptionZh: '', image: '', upload: null })
  }
}

function removeAdvantage(index: number) {
  advantagesForm.items.splice(index, 1)
}

function addFacilityCategory() {
  if (facilityForm.categories.length < 12) {
    const id = `category-${Date.now()}`
    facilityForm.categories.push({ id, name: { en: '', zh: '' } })
  }
}

function removeFacilityCategory(index: number) {
  const category = facilityForm.categories[index]
  if (!category) return
  facilityForm.categories.splice(index, 1)
  facilityForm.images = facilityForm.images.filter((image) => image.categoryId !== category.id)
}

async function selectSection(section: 'hero' | 'stats' | 'lab' | 'facility' | 'export-services' | 'product-lines' | 'advantages' | 'partners' | 'cta') {
  activeSection.value = section
  try {
    if (section === 'stats') await loadStats()
    else if (section === 'lab') await loadLab()
    else if (section === 'facility') await loadFacility()
    else if (section === 'export-services') await loadExportServices()
    else if (section === 'product-lines') await loadProductLines()
    else if (section === 'advantages') await loadAdvantages()
    else if (section === 'partners') await loadPartners()
    else if (section === 'cta') await loadCta()
    else await load()
  } catch {
  }
}

function addStat() {
  if (statsForm.items.length < 4) statsForm.items.push({ valueEn: '', valueZh: '', labelEn: '', labelZh: '' })
}

function removeStat(index: number) {
  statsForm.items.splice(index, 1)
}

function addFacilityImage() {
  if (facilityForm.images.length < 24) facilityForm.images.push({ categoryId: facilityForm.categories[0]?.id || '', src: '', captionEn: '', captionZh: '', upload: null })
}

function removeFacilityImage(index: number) {
  facilityForm.images.splice(index, 1)
}

function addExportItem() {
  if (exportForm.items.length < 8) exportForm.items.push({ nameEn: '', nameZh: '', descriptionEn: '', descriptionZh: '' })
}

function removeExportItem(index: number) {
  exportForm.items.splice(index, 1)
}

async function onFacilityImageUpload(index: number, value: File | UploadedImage | null | undefined) {
  const image = facilityForm.images[index]
  if (!image) return
  if (!value) { image.src = ''; image.upload = null; return }
  if (!(value instanceof File)) { image.src = value.avatar.src; image.upload = value; return }
  uploadingFacilityImage.value = true
  try {
    const body = new FormData(); body.append('file', value); body.append('folder', 'pages/home/facility')
    const result = await apiFetch<{ url: string }>('/api/upload', { method: 'POST', body })
    image.src = result.url; image.upload = { name: value.name, avatar: { src: result.url } }
  } catch {
  } finally { uploadingFacilityImage.value = false }
}

async function onBackgroundUpload(value: File | UploadedImage | null | undefined) {
  if (uploadingImage.value || saving.value) return
  if (!value) {
    form.backgroundImage = ''
    return
  }
  if (!(value instanceof File)) {
    form.backgroundImage = value.avatar.src
    return
  }

  uploadingImage.value = true
  try {
    const body = new FormData()
    body.append('file', value)
    body.append('folder', 'pages/home/hero')
    const result = await apiFetch<{ url: string }>('/api/upload', { method: 'POST', body })
    form.backgroundImage = result.url
  } catch {
  } finally {
    uploadingImage.value = false
  }
}

function validateForm() {
  const errors = []
  const required: Array<[Exclude<keyof HeroForm, 'trustLabels'>, string]> = [
    ['titleEn', 'titleEn'], ['titleZh', 'titleZh'], ['subtitleEn', 'subtitleEn'], ['subtitleZh', 'subtitleZh'],
    ['ctaPrimaryEn', 'ctaPrimaryEn'], ['ctaPrimaryZh', 'ctaPrimaryZh'], ['ctaSecondaryEn', 'ctaSecondaryEn'], ['ctaSecondaryZh', 'ctaSecondaryZh']
  ]
  for (const [name, key] of required) {
    if (!form[name].trim()) errors.push({ name, message: t('admin.pageContent.required', { field: t(`admin.pageContent.${key}`) }) })
  }
  if (!/^\/(?!\/)[^\s]*$/.test(form.ctaPrimaryHref.trim())) {
    errors.push({ name: 'ctaPrimaryHref', message: t('admin.pageContent.internalLinkRequired') })
  }
  if (!/^\/(?!\/)[^\s]*$/.test(form.ctaSecondaryHref.trim())) {
    errors.push({ name: 'ctaSecondaryHref', message: t('admin.pageContent.internalLinkRequired') })
  }
  return errors
}

async function saveHero() {
  if (saving.value || uploadingImage.value) return
  saving.value = true
  const body = {
    backgroundImage: form.backgroundImage,
    badgeEn: form.badgeEn,
    badgeZh: form.badgeZh,
    titleEn: form.titleEn,
    titleZh: form.titleZh,
    subtitleEn: form.subtitleEn,
    subtitleZh: form.subtitleZh,
    ctaPrimaryEn: form.ctaPrimaryEn,
    ctaPrimaryZh: form.ctaPrimaryZh,
    ctaPrimaryHref: form.ctaPrimaryHref,
    ctaSecondaryEn: form.ctaSecondaryEn,
    ctaSecondaryZh: form.ctaSecondaryZh,
    ctaSecondaryHref: form.ctaSecondaryHref,
    trustLabels: form.trustLabels
  }
  try {
    const result = await apiFetch<HomeHeroResponse>('/api/page-content/home/hero', { method: 'PUT', body })
    if (result.content) readContent(result.content)
    toast({ title: t('admin.pageContent.saved'), color: 'success' })
  } catch {
  } finally {
    saving.value = false
  }
}

async function saveStats() {
  if (saving.value) return
  saving.value = true
  try {
    const result = await apiFetch<HomeStatsResponse>('/api/page-content/home/stats', {
      method: 'PUT',
      body: { items: statsForm.items.map((item) => ({ value: localizedPayload(item.valueEn, item.valueZh), label: localizedPayload(item.labelEn, item.labelZh) })) }
    })
    if (result.content) {
      statsForm.items = result.content.items.map((item) => ({ valueEn: item.value.en, valueZh: item.value.zh, labelEn: item.label.en, labelZh: item.label.zh }))
    }
    toast({ title: t('admin.pageContent.statsSaved'), color: 'success' })
  } catch {
  } finally {
    saving.value = false
  }
}

async function saveLab() {
  if (saving.value) return
  saving.value = true
  try {
    const result = await apiFetch<HomeLabResponse>('/api/page-content/home/lab', {
      method: 'PUT',
      body: {
        titleEn: labForm.titleEn,
        titleZh: labForm.titleZh,
        subtitleEn: labForm.subtitleEn,
        subtitleZh: labForm.subtitleZh,
        points: labForm.points,
        link: { en: labForm.linkEn, zh: labForm.linkZh, href: labForm.linkHref },
        cards: labForm.cards.map((card) => ({
          name: localizedPayload(card.nameEn, card.nameZh),
          description: localizedPayload(card.descriptionEn, card.descriptionZh)
        }))
      }
    })
    if (result.content) await loadLab()
    toast({ title: t('admin.pageContent.labSaved'), color: 'success' })
  } catch {
  } finally {
    saving.value = false
  }
}

async function saveFacility() {
  if (saving.value || uploadingFacilityImage.value) return
  saving.value = true
  try {
    const result = await apiFetch<FacilityResponse>('/api/page-content/home/facility', {
      method: 'PUT',
      body: {
        titleEn: facilityForm.titleEn, titleZh: facilityForm.titleZh,
        subtitleEn: facilityForm.subtitleEn, subtitleZh: facilityForm.subtitleZh,
        categories: facilityForm.categories,
        link: { en: facilityForm.linkEn, zh: facilityForm.linkZh, href: facilityForm.linkHref },
        images: facilityForm.images.map((image) => ({ categoryId: image.categoryId, src: image.src, caption: { en: image.captionEn, zh: image.captionZh } }))
      }
    })
    if (result.content) await loadFacility()
    toast({ title: t('admin.pageContent.facilitySaved'), color: 'success' })
  } catch {
  } finally { saving.value = false }
}

async function saveExportServices() {
  if (saving.value) return
  saving.value = true
  try {
    const result = await apiFetch<ExportResponse>('/api/page-content/home/export-services', {
      method: 'PUT',
      body: {
        titleEn: exportForm.titleEn, titleZh: exportForm.titleZh,
        subtitleEn: exportForm.subtitleEn, subtitleZh: exportForm.subtitleZh,
        items: exportForm.items.map((item) => ({ name: localizedPayload(item.nameEn, item.nameZh), description: localizedPayload(item.descriptionEn, item.descriptionZh) })),
        link: { en: exportForm.linkEn, zh: exportForm.linkZh, href: exportForm.linkHref }
      }
    })
    if (result.content) await loadExportServices()
    toast({ title: t('admin.pageContent.exportServicesSaved'), color: 'success' })
  } catch {
  } finally { saving.value = false }
}

async function saveProductLines() {
  if (saving.value) return
  saving.value = true
  try {
    const result = await apiFetch<ProductLinesResponse>('/api/page-content/home/product-lines', {
      method: 'PUT',
      body: {
        titleEn: productLinesForm.titleEn, titleZh: productLinesForm.titleZh,
        subtitleEn: productLinesForm.subtitleEn, subtitleZh: productLinesForm.subtitleZh,
        link: { en: productLinesForm.linkEn, zh: productLinesForm.linkZh, href: productLinesForm.linkHref }
      }
    })
    if (result.content) await loadProductLines()
    toast({ title: t('admin.pageContent.productLinesSaved'), color: 'success' })
  } catch {
  } finally { saving.value = false }
}

async function onAdvantageImageUpload(index: number, value: File | UploadedImage | null | undefined) {
  const item = advantagesForm.items[index]
  if (!item) return
  if (!value) { item.image = ''; item.upload = null; return }
  if (!(value instanceof File)) { item.image = value.avatar.src; item.upload = value; return }
  uploadingAdvantageImage.value = true
  try {
    const body = new FormData()
    body.append('file', value)
    body.append('folder', 'pages/home/advantages')
    const result = await apiFetch<{ url: string }>('/api/upload', { method: 'POST', body })
    item.image = result.url
    item.upload = { name: value.name, avatar: { src: result.url } }
  } catch {
  } finally {
    uploadingAdvantageImage.value = false
  }
}

async function saveAdvantages() {
  if (saving.value || uploadingAdvantageImage.value) return
  saving.value = true
  try {
    const result = await apiFetch<AdvantagesResponse>('/api/page-content/home/advantages', {
      method: 'PUT',
      body: {
        titleEn: advantagesForm.titleEn,
        titleZh: advantagesForm.titleZh,
        subtitleEn: advantagesForm.subtitleEn,
        subtitleZh: advantagesForm.subtitleZh,
        link: { en: advantagesForm.linkEn, zh: advantagesForm.linkZh, href: advantagesForm.linkHref },
        items: advantagesForm.items.map((item) => ({
          name: localizedPayload(item.nameEn, item.nameZh),
          description: localizedPayload(item.descriptionEn, item.descriptionZh),
          image: item.image
        }))
      }
    })
    if (result.content) await loadAdvantages()
    toast({ title: t('admin.pageContent.advantagesSaved'), color: 'success' })
  } catch {
  } finally {
    saving.value = false
  }
}

async function onPartnerImageUpload(index: number, value: File | UploadedImage | null | undefined) {
  const item = partnersForm.items[index]
  if (!item) return
  if (!value) { item.logo = ''; item.upload = null; return }
  if (!(value instanceof File)) { item.logo = value.avatar.src; item.upload = value; return }
  uploadingPartnerImage.value = true
  try {
    const body = new FormData()
    body.append('file', value)
    body.append('folder', 'pages/home/partners')
    const result = await apiFetch<{ url: string }>('/api/upload', { method: 'POST', body })
    item.logo = result.url
    item.upload = { name: value.name, avatar: { src: result.url } }
  } catch {
  } finally {
    uploadingPartnerImage.value = false
  }
}

async function savePartners() {
  if (saving.value || uploadingPartnerImage.value) return
  saving.value = true
  try {
    const result = await apiFetch<PartnersResponse>('/api/page-content/home/partners', {
      method: 'PUT',
      body: {
        titleEn: partnersForm.titleEn,
        titleZh: partnersForm.titleZh,
        subtitleEn: partnersForm.subtitleEn,
        subtitleZh: partnersForm.subtitleZh,
        items: partnersForm.items.map((item) => ({ logo: item.logo, href: item.href }))
      }
    })
    if (result.content) await loadPartners()
    toast({ title: t('admin.pageContent.partnersSaved'), color: 'success' })
  } catch {
  } finally {
    saving.value = false
  }
}

async function saveCta() {
  if (saving.value) return
  saving.value = true
  try {
    const result = await apiFetch<CtaResponse>('/api/page-content/home/cta', {
      method: 'PUT',
      body: {
        titleEn: ctaForm.titleEn,
        titleZh: ctaForm.titleZh,
        subtitleEn: ctaForm.subtitleEn,
        subtitleZh: ctaForm.subtitleZh,
        buttonEn: ctaForm.buttonEn,
        buttonZh: ctaForm.buttonZh,
        href: ctaForm.href
      }
    })
    if (result.content) await loadCta()
    toast({ title: t('admin.pageContent.ctaSaved'), color: 'success' })
  } catch {
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  try {
    await load()
  } catch {
  }
})
</script>
