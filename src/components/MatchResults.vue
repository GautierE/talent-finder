<template>
    <div class="w-full h-screen bg-gradient-to-b from-primary-100 to-secondary-400">
        <div v-if="candidates.length === 0" class="text-gray-600">No matching candidates found.</div>
        <SwipeableCards :candidates="candidates" @cardSwiped="removeCard" />
    </div>
</template>
  
<script>
import SwipeableCards from './SwipeableCards.vue';

export default {
    components: {
        SwipeableCards,
    },
    props: {
        candidates: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
};
</script>
  