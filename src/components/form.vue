<script setup lang="ts">
import Loading from "./loading.vue";
import {
  handleSubmit,
  email,
  cardNumber,
  expiration,
  cvv,
  changeCCBrand,
  unavailableSubmitAction,
  isLoading,
} from "../composables/brands";
</script>

<template>
  <form
    class="flex-1 max-w-[500px] text-zinc-100 flex flex-col gap-5"
    @submit="handleSubmit"
  >
    <label class="flex flex-col gap-2">
      <p class="text-sm">CARD NUMBER</p>

      <mask-input
        class="bg-zinc-900 w-full rounded ring-1 ring-zinc-500 focus:ring-zinc-100 px-3 py-2"
        v-model="cardNumber"
        placeholder="xxxx xxxx xxxx xxxx"
        :mask="'0000 0000 0000 0000'"
        @accept:unmasked="changeCCBrand"
        name="cardNumber"
      />
    </label>

    <label class="flex flex-col gap-2">
      <p class="text-sm">E-MAIL</p>

      <input
        class="bg-zinc-900 w-full border-0 rounded ring-1 ring-zinc-500 focus:ring-zinc-100 px-3 py-2"
        v-model="email"
        placeholder="ejemplo@gmail.com"
        name="email"
      />
    </label>

    <div class="w-full flex gap-5">
      <label class="flex flex-col gap-2">
        <p class="text-sm">EXPIRATION</p>

        <mask-input
          class="bg-zinc-900 w-full rounded ring-1 ring-zinc-500 focus:ring-zinc-100 px-3 py-2"
          v-model="expiration"
          placeholder="12/2026"
          :mask="'00{/}0000'"
          name="expiration"
        />
      </label>

      <label class="flex flex-col gap-2">
        <p class="text-sm">CVV</p>

        <mask-input
          class="bg-zinc-900 w-full rounded ring-1 ring-zinc-500 focus:ring-zinc-100 px-3 py-2"
          v-model="cvv"
          placeholder="123"
          :mask="'0000'"
          name="cvv"
        />
      </label>
    </div>

    <button
      class="bg-orange-400 p-3 text-zinc-900 rounded disabled:bg-zinc-500 disabled:text-zinc-800 flex items-center justify-center"
      :disabled="unavailableSubmitAction"
    >
      <Loading v-if="isLoading" />
      <span v-else class="font-semibold"> REGISTER CARD </span>
    </button>
  </form>
</template>
