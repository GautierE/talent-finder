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
        isMainSkillDisabled(skill) {
            return this.mainSkills.length >= 5 && !this.mainSkills.includes(skill.name);
        },
    },

    computed: {
        availableMainSkills() {
            return this.skills.filter(skill => !this.secondarySkills.includes(skill.name));
        },
        availableSecondarySkills() {
            return this.skills.filter(skill => !this.mainSkills.includes(skill.name));
        },
    },

    created() {
        this.fetchSkills();
    },
};
</script>


<template>
    <div class="flex items-center justify-center md:h-screen bg-gradient-to-b from-primary-100 to-secondary-400">
        <div
            class="my-4 md:my-0 w-full max-w-[90%] md:max-w-xl p-8 border-4 rounded-lg shadow-lg bg-accent-100 border-primary-500">
            <h2 class="mb-6 text-2xl font-bold">Match Candidate</h2>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label class="block mb-2 font-bold text-gray-700" for="location">📍 Location</label>
                    <select v-model="location" id="location" name="location" class="w-1/2 px-2 rounded bg-primary-50">
                        <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
                    </select>
                </div>

                <div class="flex items-center justify-start mb-4">
                    <label class="block font-bold text-gray-700" for="isRemote">🌎 Is Remote</label>
                    <input v-model="isRemote" type="checkbox" id="isRemote" name="isRemote" class="ml-2">
                </div>

                <div class="mb-4">
                    <label class="block mb-2 font-bold text-gray-700" for="experience">👨‍💻 Experience</label>
                    <input v-model="experience" type="number" id="experience" name="experience"
                        class="px-2 rounded bg-primary-50">
                </div>

                <div class="mb-4">
                    <label class="block mb-2 font-bold text-gray-700" for="salary">💰 Salary</label>
                    <input v-model="salary" type="number" id="salary" name="salary" class="px-2 rounded bg-primary-50">
                </div>

                <div class="mb-4">
                    <label class="block mb-2 font-bold text-gray-700" for="mainSkills">Main Skills</label>
                    <select v-model="mainSkills" id="mainSkills" name="mainSkills" class="w-full px-2 rounded bg-primary-50"
                        multiple>
                        <option value="">Select up to 5 main skills</option>
                        <option v-for="skill in availableMainSkills" :key="skill.name" :value="skill.name"
                            :disabled="isMainSkillDisabled(skill)">{{
                                skill.name }}</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label class="block mb-2 font-bold text-gray-700" for="secondarySkills">Secondary Skills</label>
                    <select v-model="secondarySkills" id="secondarySkills" name="secondarySkills"
                        class="w-full px-2 rounded bg-primary-50" multiple>
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

  