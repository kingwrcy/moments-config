<template>
  
  <div class="flex justify-center w-full lg:w-4/5 mx-auto">
    <slot />
  </div>
  <Toaster position="top-center" richColors  />
</template>
<script lang="ts" setup>
import { Toaster } from 'vue-sonner'
</script>