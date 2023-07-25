<script setup>
import { ref } from 'vue';
import MatchForm from './components/MatchForm.vue';
import MatchResults from './components/MatchResults.vue';

let matchingCandidates = ref([]);
let showMatchResults = ref(false);

async function handleFormSubmit(jobRequirements) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/candidate/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobRequirements),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch matching candidates.');
    }

    const data = await response.json();
    matchingCandidates.value = data;
    showMatchResults.value = true;
  } catch (error) {
    console.error(error);
  }
}

function handleShowFormAgain() {
  showMatchResults.value = false;
}
</script>

<template>
  <main>
    <MatchForm v-if="!showMatchResults" :form-submitted="handleFormSubmit" />
    <MatchResults v-if="showMatchResults" :candidates="matchingCandidates" @toggle-form="handleShowFormAgain" />
  </main>
</template>
