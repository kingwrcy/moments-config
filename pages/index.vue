<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  siteUrl: z.string().nullish(),
  enableComment: z.boolean().default(true),
  enableShowComment: z.boolean().default(true),
  commentMaxLength: z.number().default(120),
  commentOrderBy: z.enum(['asc', 'desc'], { message: '排序方式不正确' }).default('desc'),
  enableDouban: z.boolean().default(true),
  enableMusic163: z.boolean().default(true),
  enableVideo: z.boolean().default(true),
  memoMaxLine: z.number().default(4),
  googleRecaptchaSiteKey: z.string(),
  googleRecaptchaSecretKey: z.string(),
  googleRecaptchaEnable: z.boolean().default(false),
  pageSize: z.number().default(10),
  dateTimeFormat: z.enum(['AGO', 'DATE'], { message: '日期格式不正确' }).default('AGO'),
  enableNotifyByEmail: z.boolean().default(false),
  adminEmail: z.string().email("无效的邮箱地址"),
  emailHost: z.string(),
  emailPort: z.number(),
  emailSecure: z.boolean().default(false),
  emailLoginName: z.string(),
  emailPassword: z.string(),
  emailFrom: z.string().email("无效的邮箱地址"),
  emailFromName: z.string(),
  enableAliyunJudge: z.boolean().default(false),
  aliyunAk: z.string(),
  aliyunSk: z.string(),
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  siteUrl: '',
  enableComment: true,
  enableShowComment: true,
  commentMaxLength: 120,
  commentOrderBy: 'desc',
  enableDouban: true,
  enableMusic163: true,
  enableVideo: true,
  memoMaxLine: 4,
  googleRecaptchaSiteKey: '',
  googleRecaptchaSecretKey: '',
  googleRecaptchaEnable: false,
  pageSize: 10,
  dateTimeFormat: 'AGO',
  enableNotifyByEmail: false,
  adminEmail: '',
  emailHost: '',
  emailPort: 0,
  emailSecure: false,
  emailLoginName: '',
  emailPassword: '',
  emailFrom: '',
  emailFromName: '',
  enableAliyunJudge: false,
  aliyunAk: '',
  aliyunSk: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data)
}

const booleanOptions = [
  { value: true, label: '是' },
  { value: false, label: '否' },
]
const orderByOptions = [
  { value: 'desc', label: '倒序' },
  { value: 'asc', label: '正序' },
]
</script>

<template>

  <UCard>
    <template #header>
    </template>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="网站地址" name="siteUrl" hint="必须以http开头">
        <UInput v-model="state.siteUrl" />
      </UFormGroup>
      <UFormGroup label="是否启用评论" name="enableComment">
        <UToggle v-model="state.enableComment" />
      </UFormGroup>
      <UFormGroup label="是否显示评论" name="enableShowComment">
        <UToggle v-model="state.enableShowComment" />
      </UFormGroup>
      <UFormGroup label="单条发言最大行数" name="enableShowComment">
        <UInput v-model="state.commentMaxLength" />
      </UFormGroup>
      <UFormGroup label="最大行数" name="commentMaxLength">
        <UInput v-model="state.commentMaxLength" />
      </UFormGroup>
      <UFormGroup label="排序方式" name="commentOrderBy">
        <USelectMenu v-model="state.commentOrderBy" :options="orderByOptions" value-attribute="value" option-attribute="label" />
      </UFormGroup>
      <UFormGroup label="是否显示豆瓣按钮" name="enableDouban">
        <UToggle v-model="state.enableDouban" />
      </UFormGroup>
      
      <UButton type="submit">
        Submit
      </UButton>
    </UForm>

    <template #footer>
    </template>
  </UCard>


</template>
