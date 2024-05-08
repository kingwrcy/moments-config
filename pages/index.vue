<script setup lang="ts">
import { z } from 'zod'
import type { FormErrorEvent, FormSubmitEvent } from '#ui/types'
import { toast } from 'vue-sonner'

const emailParser = z.string().email()
const schema = z.object({
  siteUrl: z.string().refine((val) => val === '' || val.startsWith('http'), {
    message: '要么不填,要么必须以http开头',
  }),
  enableComment: z.boolean().default(true),
  enableShowComment: z.boolean().default(true),
  commentMaxLength: z.coerce.number().default(120),
  commentOrderBy: z.enum(['asc', 'desc'], { message: '排序方式不正确' }).default('desc'),
  enableDouban: z.boolean().default(true),
  enableMusic163: z.boolean().default(true),
  enableVideo: z.boolean().default(true),
  memoMaxLine: z.coerce.number().min(4, "不能少于4行").max(10, "不能超过10行").default(4),
  googleRecaptchaSiteKey: z.string(),
  googleRecaptchaSecretKey: z.string(),
  googleRecaptchaEnable: z.boolean().default(false),
  pageSize: z.coerce.number().default(10),
  dateTimeFormat: z.enum(['AGO', 'DATE'], { message: '日期格式不正确' }).default('AGO'),
  enableNotifyByEmail: z.boolean().default(false),
  adminEmail: z.string().refine((val) => {
    return val === '' || emailParser.safeParse(val).success
  }, {
    message: '要么不填,要么必须是正确的email地址',
  }),
  emailHost: z.string(),
  emailPort: z.coerce.number().default(587),
  emailSecure: z.boolean().default(false),
  emailLoginName: z.string().refine((val) => {
    return val === '' || emailParser.safeParse(val).success
  }, {
    message: '要么不填,要么必须是正确的email地址',
  }),
  emailPassword: z.string(),
  emailFrom: z.string().refine((val) => {
    return val === '' || emailParser.safeParse(val).success
  }, {
    message: '要么不填,要么必须是正确的email地址',
  }),
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
  emailPort: 587,
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
  const {siteUrl,enableComment,enableShowComment,commentMaxLength,memoMaxLine,googleRecaptchaSiteKey,pageSize,dateTimeFormat,...rest} = event.data
  const config = {
    public:{siteUrl,enableComment,enableShowComment,commentMaxLength,memoMaxLine,googleRecaptchaSiteKey,pageSize,dateTimeFormat},
    private:{...rest}  
  }

   // 创建一个临时的textarea元素
   var textarea = document.createElement("textarea");
  // 设置textarea的内容为指定的文本
  textarea.value = JSON.stringify(config);
  // 将textarea添加到文档中
  document.body.appendChild(textarea);
  // 选择textarea中的文本
  textarea.select();
  // 将文本复制到剪贴板
  document.execCommand("copy");
  // 删除临时textarea元素
  document.body.removeChild(textarea);
  toast.success('复制成功,请返回粘贴并保存')
}

async function onError (event: FormErrorEvent) {
  toast.error('请先修复错误')
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const orderByOptions = [
  { value: 'desc', label: '倒序' },
  { value: 'asc', label: '正序' },
]
const dateFormatOptions = [
  { value: 'AGO', label: '1天前' },
  { value: 'asc', label: '2024-05-08 21:02:54' },
]


</script>

<template>

  <UForm :schema="schema" :state="state" @submit="onSubmit" @error="onError"> 

    

    <div class="flex flex-row flex-wrap gap-10 mt-10 ">

      <UCard class="w-[400px] bg-white dark:bg-[#181818] ">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-carbon-data-base" />
            <span>基本配置</span>
          </div>
        </template>

        <div class="space-y-2">
          <UFormGroup label="Moments实例地址" name="siteUrl" hint="必须以http开头">
            <UInput v-model="state.siteUrl" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="是否启用评论" name="enableComment">
            <UToggle v-model="state.enableComment" />
          </UFormGroup>
          <UFormGroup label="是否显示评论" name="enableShowComment">
            <UToggle v-model="state.enableShowComment" />
          </UFormGroup>
          <UFormGroup label="评论最大字数" name="enableShowComment">
            <UInput v-model="state.commentMaxLength" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="发言最大行数" name="memoMaxLine" hint="超过了则显示'全文'按钮,最大10行">
            <UInput v-model="state.memoMaxLine" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="排序方式" name="commentOrderBy">
            <USelectMenu v-model="state.commentOrderBy" :options="orderByOptions" value-attribute="value"
              option-attribute="label" />
          </UFormGroup>
          <UFormGroup label="是否显示豆瓣按钮" name="enableDouban">
            <UToggle v-model="state.enableDouban" />
          </UFormGroup>
          <UFormGroup label="是否显示音乐按钮" name="enableMusic163">
            <UToggle v-model="state.enableMusic163" />
          </UFormGroup>
          <UFormGroup label="是否显示视频按钮" name="enableVideo">
            <UToggle v-model="state.enableVideo" />
          </UFormGroup>
          <UFormGroup label="分页大小" name="pageSize">
            <UInput v-model="state.pageSize" />
          </UFormGroup>
          <UFormGroup label="日期格式" name="dateTimeFormat">
            <USelectMenu v-model="state.dateTimeFormat" :options="dateFormatOptions" value-attribute="value"
              option-attribute="label" />
          </UFormGroup>
        </div>

      </UCard>

      <UCard class="w-[400px] bg-white dark:bg-[#181818]">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-carbon-email" />
            <span>邮件通知</span>
          </div>
        </template>

        <div class="space-y-2">
          <UFormGroup label="是否启用" name="enableNotifyByEmail" hint="有人评论时会发送邮件通知">
            <UToggle v-model="state.enableNotifyByEmail" />
          </UFormGroup>
          <UFormGroup label="管理员邮箱" name="adminEmail">
            <UInput v-model="state.adminEmail" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="邮箱服务器地址" name="emailHost">
            <UInput v-model="state.emailHost" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="邮箱服务器端口" name="emailPort" hint="465端口是加密的,587端口是不加密的">
            <UInput v-model="state.emailPort" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="是否是安全加密连接" name="emailSecure">
            <UToggle v-model="state.emailSecure" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="邮箱服务器登录名" name="emailLoginName">
            <UInput v-model="state.emailLoginName" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="邮箱服务器登录密码" name="emailPassword">
            <UInput v-model="state.emailPassword" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="发件人地址" name="emailFrom" hint="一般和邮箱服务器登录名一致">
            <UInput v-model="state.emailFrom" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="发件人名称" name="emailFromName">
            <UInput v-model="state.emailFromName" autocomplete="off" />
          </UFormGroup>
          <UButton type="button" color="gray" variant="solid">
            测试发送邮件
          </UButton>
        </div>

      </UCard>

      <UCard class="w-[400px] bg-white dark:bg-[#181818]">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-carbon-face-dissatisfied" />
            <span>阿里云垃圾评论检测配置</span>
          </div>
        </template>

        <div class="space-y-2">
          <UFormGroup label="是否启用" name="enableAliyunJudge">
            <UToggle v-model="state.enableAliyunJudge" />
          </UFormGroup>
          <UFormGroup label="AccessKey" name="aliyunAk">
            <UInput v-model="state.aliyunAk" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="SecretKey" name="aliyunSk">
            <UInput v-model="state.aliyunSk" autocomplete="off" />
          </UFormGroup>
        </div>

      </UCard>

      <UCard class="w-[400px] bg-white dark:bg-[#181818]">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-carbon-ibm-security" />
            <span>Google Recaptcha配置</span>
          </div>
        </template>

        <div class="space-y-2">
          <UFormGroup label="是否启用" name="googleRecaptchaEnable">
            <UToggle v-model="state.googleRecaptchaEnable" />
          </UFormGroup>
          <UFormGroup label="SiteKey" name="googleRecaptchaSiteKey">
            <UInput v-model="state.googleRecaptchaSiteKey" />
          </UFormGroup>
          <UFormGroup label="SecretKey" name="googleRecaptchaSecretKey">
            <UInput v-model="state.googleRecaptchaSecretKey" autocomplete="off" />
          </UFormGroup>
        </div>

      </UCard>
    </div>

    <div class="flex items-center justify-center my-4">
      <UButton type="submit" icon="i-carbon-copy" variant="solid">
        一键复制配置
      </UButton>
    </div>
  </UForm>





</template>
