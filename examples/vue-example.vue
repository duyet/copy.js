<template>
  <div>
    <!-- Simple Copy Button -->
    <button
      @click="handleCopy"
      :disabled="loading"
      :class="buttonClass"
    >
      {{ buttonText }}
    </button>

    <!-- Error Message -->
    <div v-if="error" class="text-red-500 text-sm mt-2">
      {{ error }}
    </div>

    <!-- Code Snippet with Copy -->
    <div class="code-snippet">
      <pre><code>{{ code }}</code></pre>
      <button
        @click="() => copyCode(code)"
        class="copy-btn"
      >
        {{ codeCopied ? '✓ Copied' : 'Copy' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Vue 3 Composition API Example
 * Using copy.js in a Vue 3 application with Composition API
 */

import { ref, computed } from 'vue';
import copy, { isSupported } from 'copy-js';

// Props
const props = defineProps<{
  text: string;
  code?: string;
}>();

// State
const loading = ref(false);
const copied = ref(false);
const codeCopied = ref(false);
const error = ref<string | null>(null);

// Computed
const buttonText = computed(() => {
  if (loading.value) return 'Copying...';
  if (copied.value) return '✓ Copied!';
  if (error.value) return '✗ Error';
  return 'Copy';
});

const buttonClass = computed(() => ({
  'px-4 py-2 rounded transition-colors': true,
  'bg-green-500 text-white': copied.value,
  'bg-red-500 text-white': error.value,
  'bg-blue-500 text-white hover:bg-blue-600': !copied.value && !error.value,
  'opacity-50 cursor-not-allowed': loading.value,
}));

// Methods
async function handleCopy() {
  if (!isSupported()) {
    error.value = 'Clipboard not supported';
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    await copy(props.text);
    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to copy';

    setTimeout(() => {
      error.value = null;
    }, 3000);
  } finally {
    loading.value = false;
  }
}

async function copyCode(code: string) {
  try {
    await copy(code);
    codeCopied.value = true;

    setTimeout(() => {
      codeCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy code:', err);
  }
}
</script>

<script lang="ts">
/**
 * Vue 2 Options API Example
 * Using copy.js in a Vue 2 application with Options API
 */

import copy, { isSupported } from 'copy-js';

export default {
  name: 'CopyButton',

  props: {
    text: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      copied: false,
      error: null,
    };
  },

  computed: {
    buttonText() {
      if (this.loading) return 'Copying...';
      if (this.copied) return '✓ Copied!';
      if (this.error) return '✗ Error';
      return 'Copy';
    },

    isClipboardSupported() {
      return isSupported();
    },
  },

  methods: {
    async handleCopy() {
      if (!this.isClipboardSupported) {
        this.error = 'Clipboard not supported';
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        await copy(this.text);
        this.copied = true;

        setTimeout(() => {
          this.copied = false;
        }, 2000);
      } catch (err) {
        this.error = err.message || 'Failed to copy';

        setTimeout(() => {
          this.error = null;
        }, 3000);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.code-snippet {
  position: relative;
  background: #1e1e1e;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.code-snippet pre {
  margin: 0;
  color: #d4d4d4;
  overflow-x: auto;
}

.copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem 1rem;
  background: #3f3f3f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.copy-btn:hover {
  background: #4f4f4f;
}
</style>
