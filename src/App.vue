<script setup>
import { ref } from 'vue';
import MatchForm from './components/MatchForm.vue';
import MatchResults from './components/MatchResults.vue';

let matchingCandidates = ref([]);

function handleFormSubmit(jobRequirements) {
  console.log(matchingCandidates);

  matchingCandidates.value = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      experience: 3,
      salary: 50000,
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      experience: 5,
      salary: 60000,
    },
  ];
}
</script>

<template>
  <main>
    <MatchForm :form-submitted="handleFormSubmit" />
    <MatchResults :candidates="matchingCandidates" />
  </main>
</template>
