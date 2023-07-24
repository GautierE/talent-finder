<script setup>
import { ref } from 'vue';
import MatchForm from './components/MatchForm.vue';
import MatchResults from './components/MatchResults.vue';

let matchingCandidates = ref([]);

async function handleFormSubmit(jobRequirements) {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/candidate/match`, {
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
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <main>
    <MatchForm :form-submitted="handleFormSubmit" />
    <MatchResults :candidates="matchingCandidates" />
  </main>
</template>
