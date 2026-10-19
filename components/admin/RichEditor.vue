<template>
  <div class="overflow-hidden rounded-xl border border-[#d7dee7] bg-white">
    <div v-if="editor" class="flex flex-wrap gap-2 border-b border-[#eef1f4] bg-slate-50 p-2.5">
      <button type="button" class="h-8 min-w-9 cursor-pointer rounded-lg border border-[#d7dee7] bg-white px-2.5 text-xs font-bold text-gray-700" :class="{ 'border-[#9fd3da] bg-[#e8f7f9] text-[#0e7f8f]': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">B</button>
      <button type="button" class="h-8 min-w-9 cursor-pointer rounded-lg border border-[#d7dee7] bg-white px-2.5 text-xs font-bold text-gray-700" :class="{ 'border-[#9fd3da] bg-[#e8f7f9] text-[#0e7f8f]': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">I</button>
      <button type="button" class="h-8 min-w-9 cursor-pointer rounded-lg border border-[#d7dee7] bg-white px-2.5 text-xs font-bold text-gray-700" :class="{ 'border-[#9fd3da] bg-[#e8f7f9] text-[#0e7f8f]': editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">H2</button>
      <button type="button" class="h-8 min-w-9 cursor-pointer rounded-lg border border-[#d7dee7] bg-white px-2.5 text-xs font-bold text-gray-700" :class="{ 'border-[#9fd3da] bg-[#e8f7f9] text-[#0e7f8f]': editor.isActive('heading', { level: 3 }) }" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">H3</button>
      <button type="button" class="h-8 min-w-9 cursor-pointer rounded-lg border border-[#d7dee7] bg-white px-2.5 text-xs font-bold text-gray-700" :class="{ 'border-[#9fd3da] bg-[#e8f7f9] text-[#0e7f8f]': editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()">List</button>
      <button type="button" class="h-8 min-w-9 cursor-pointer rounded-lg border border-[#d7dee7] bg-white px-2.5 text-xs font-bold text-gray-700" :class="{ 'border-[#9fd3da] bg-[#e8f7f9] text-[#0e7f8f]': editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()">1.</button>
      <button type="button" class="h-8 min-w-9 cursor-pointer rounded-lg border border-[#d7dee7] bg-white px-2.5 text-xs font-bold text-gray-700" @click="addImage">Image</button>
      <button type="button" class="h-8 min-w-9 cursor-pointer rounded-lg border border-[#d7dee7] bg-white px-2.5 text-xs font-bold text-gray-700" @click="editor.chain().focus().unsetAllMarks().clearNodes().run()">Clear</button>
    </div>
    <EditorContent :editor="editor" class="min-h-[220px] p-4 [&_.ProseMirror]:min-h-[190px] [&_.ProseMirror]:text-sm [&_.ProseMirror]:leading-[1.7] [&_.ProseMirror]:text-gray-900 [&_.ProseMirror]:outline-none [&_.ProseMirror_a]:text-[#0e7f8f] [&_.ProseMirror_h2]:my-4 [&_.ProseMirror_h2]:mb-2.5 [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h3]:my-4 [&_.ProseMirror_h3]:mb-2.5 [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_img]:my-3.5 [&_.ProseMirror_img]:block [&_.ProseMirror_img]:h-auto [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded-xl [&_.ProseMirror_ol]:mb-3 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_p]:mb-3 [&_.ProseMirror_ul]:mb-3 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5" />
    <p class="px-4 pb-3 text-xs text-gray-500">{{ hint }}</p>
    <AdminDialog
      :state="dialog"
      @confirm="close(true)"
      @cancel="close(false)"
    />
  </div>
</template>

<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'

const props = defineProps<{
  modelValue: string
  hint?: string
  folder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { authHeaders } = useAdminAuth()
const { t } = useI18n()
const { dialog, alert, close } = useAdminDialog()

const editor = shallowRef<Editor>()

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: false
      }),
      Link.configure({
        openOnClick: false,
        autolink: true
      })
    ],
    content: props.modelValue || '',
    onUpdate: ({ editor: current }) => {
      emit('update:modelValue', current.getHTML())
    }
  })
})

watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value) return
    const current = editor.value.getHTML()
    if (value !== current) {
      editor.value.commands.setContent(value || '', { emitUpdate: false })
    }
  }
)

onBeforeUnmount(() => {
  editor.value?.destroy()
  editor.value = undefined
})

async function addImage() {
  if (!editor.value) return
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/jpeg,image/png,image/webp,image/gif,image/avif'
  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return
    try {
      const body = new FormData()
      body.append('file', file)
      body.append('folder', props.folder || 'news')
      const result = await apiFetch<{ url: string }>('/api/upload', {
        method: 'POST',
        headers: authHeaders(),
        body
      })
      editor.value?.chain().focus().setImage({ src: result.url }).run()
    } catch (err: any) {
      await alert(err?.msg || t('admin.upload.failed'))
    }
  }
  input.click()
}
</script>
