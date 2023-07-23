<template>
    <div>
        <h2 class="text-2xl font-bold mb-6">Matching Candidates</h2>
        <div v-if="candidates.length === 0" class="text-gray-600">No matching candidates found.</div>
        <ul v-else>
            <li v-for="candidate in candidates" :key="candidate.id" class="bg-white shadow-lg rounded-lg p-4 mb-4">
                <div class="font-bold">{{ candidate.firstName }} {{ candidate.lastName }}</div>
                <div class="text-gray-600">Experience: {{ candidate.experience }} years</div>
                <div class="text-gray-600">Salary: {{ candidate.salary }} €</div>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    props: {
        candidates: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
};
</script>
  