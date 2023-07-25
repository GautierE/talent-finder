<template>
    <div class="w-full h-screen bg-gradient-to-b from-primary-100 to-secondary-400">
        <div v-if="candidates.length === 0" class="text-gray-600">No matching candidates found.</div>
        <div class="flex items-center justify-center">
            <button
                class="flex flex-row justify-center items-center z-20 absolute px-2 py-1 font-semibold md:text-[20px] border-2 rounded-lg cursor-pointer md:px-4 md:py-2 text-primary-500 top-1 bg-accent-100 border-primary-500 lg:left-5 lg:top-5"
                @click="toggleForm">
                <img src="/public/icons/back_icon.svg" class="w-8 mr-2" />
                <span>Edit requirements</span>
            </button>
        </div>
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
    methods: {
        toggleForm() {
            this.$emit('toggle-form');
        },
    },
};
</script>
  