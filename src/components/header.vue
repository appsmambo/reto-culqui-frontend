<script setup lang="ts">
import Loading from "./loading.vue";
import { searchByToken, isLoading } from "../composables/brands";

import { authorize, token } from "../composables/brands";
</script>
<template>
  <header class="flex items-center justify-start gap-4">
    <p class="text-zinc-500">
      CULQUI
      <span class="text-zinc-100"> PAY </span>
    </p>

    <img class="h-5" src="../assets/subtract.svg" alt="" />
    <label class="flex flex-col gap-2">
      <p class="text-sm text-zinc-100">Bearer token</p>

      <input
        class="text-zinc-100 bg-zinc-900 w-full border-0 rounded ring-1 ring-zinc-500 focus:ring-zinc-100 px-3 py-2"
        v-model="authorize"
        placeholder="pk_test_authorize"
        name="authorize"
      />
    </label>
    <label class="flex flex-col gap-2">
      <p class="text-sm text-zinc-100">Search by token</p>

      <input
        class="text-zinc-100 bg-zinc-900 w-full border-0 rounded ring-1 ring-zinc-500 focus:ring-zinc-100 px-3 py-2"
        v-model="token"
        placeholder="W83UoTm6glle5Pi1"
        name="token"
      />
    </label>
    <label class="flex flex-col gap-2">
      <p class="text-sm text-zinc-100">&nbsp;</p>
      <button
        @click="searchByToken"
        class="bg-orange-400 p-3 text-zinc-900 rounded disabled:bg-zinc-500 disabled:text-zinc-800 flex items-center justify-center h-10"
      >
        <Loading v-if="isLoading" />
        <span v-else class="font-semibold"> Search </span>
      </button>
      
    </label>
    
  </header>
</template>
