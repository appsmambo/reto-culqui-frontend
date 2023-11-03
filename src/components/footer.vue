<template>
  <div class="glass-container">
    <p class="text-zinc-100 text-sm leading-normal">
      <strong class="text-lg block">{{ !formattedResults?.statusCode ? 'Resultado: ' : 'Error: ' }}</strong>
    <ul v-if="!formattedResults?.statusCode">
      <li v-for="(value, key) in formattedResults" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
    <ul v-if="typeof formattedResults?.message === 'string' && formattedResults?.message.trim() !== ''"
      class="text-red-400">
      <li>{{ formattedResults?.message }}</li>
    </ul>
    <ul v-else class="text-red-400">
      <li v-for="(value, key) in formattedResults.message" :key="key">
        {{ value }}
      </li>
    </ul>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { results } from "../composables/brands";

const reactiveResults = ref(results);

const formattedResults = computed(() => {
  return reactiveResults.value;
});
</script>



<style scoped>
.glass-container {
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
}
</style>
