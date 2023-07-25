<script>
export default {
    props: {
        formSubmitted: {
            type: Function,
            required: true
        }
    },

    data() {
        return {
            skills: [],
            locations: [
                'Paris',
                'Marseille',
                'Lyon',
                'Toulouse',
                'Nice',
                'Nantes',
                'Montpellier',
                'Bordeaux',
                'Lille',
                'Rennes',
                'Barcelona',
            ],
            location: '',
            isRemote: false,
            experience: 0,
            salary: 0,
            mainSkills: [],
            secondarySkills: [],
        };
    },

    methods: {
        submitForm() {
            this.formSubmitted({
                location: this.location,
                isRemote: this.isRemote,
                experience: this.experience,
                salary: this.salary,
                mainSkills: this.mainSkills,
                secondarySkills: this.secondarySkills,
            });
        },
        async fetchSkills() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/skills`);
                const data = await response.json();
                this.skills = data;
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        },

    },

    computed: {
        availableMainSkills() {
            return this.skills.filter(skill => !this.secondarySkills.includes(skill));
        },
        availableSecondarySkills() {
            return this.skills.filter(skill => !this.mainSkills.includes(skill));
        },
    },

    created() {
        this.fetchSkills();
    },
};
</script>


<template>
    <div class="flex items-center justify-center min-h-screen bg-accent-50">
        <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 class="mb-6 text-2xl font-bold">Match Candidate</h2>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label class="block mb-2 font-bold text-gray-700" for="location">Location:</label>
                    <select v-model="location" id="location" name="location" class="w-full form-select">
                        <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label class="block mb-2 font-bold text-gray-700" for="isRemote">Is Remote:</label>
                    <input v-model="isRemote" type="checkbox" id="isRemote" name="isRemote" class="form-checkbox">
                </div>

                <div class="mb-4">
                    <label class="block mb-2 font-bold text-gray-700" for="experience">Experience:</label>
                    <input v-model="experience" type="number" id="experience" name="experience" class="w-full form-input">
                </div>

                <div class="mb-4">
                    <label class="block mb-2 font-bold text-gray-700" for="salary">Salary:</label>
                    <input v-model="salary" type="number" id="salary" name="salary" class="w-full form-input">
                </div>

                <div class="mb-4">
                    <label class="block mb-2 font-bold text-gray-700" for="mainSkills">Main Skills:</label>
                    <select v-model="mainSkills" id="mainSkills" name="mainSkills" class="w-full form-select" multiple>
                        <option value="">Select a Main Skill</option>
                        <option v-for="skill in availableMainSkills" :key="skill.name" :value="skill.name">{{
                            skill.name }}</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label class="block mb-2 font-bold text-gray-700" for="secondarySkills">Secondary Skills:</label>
                    <select v-model="secondarySkills" id="secondarySkills" name="secondarySkills" class="w-full form-select"
                        multiple>
                        <option value="">Select a Secondary Skill</option>
                        <option v-for="skill in availableSecondarySkills" :key="skill.name" :value="skill.name">{{
                            skill.name
                        }}</option>
                    </select>
                </div>

                <button type="submit" class="px-4 py-2 font-bold text-white rounded bg-primary-500 hover:bg-primary-600">
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>

  