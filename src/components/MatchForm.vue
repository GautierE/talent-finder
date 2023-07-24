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
            location: '',
            isRemote: false,
            experience: 0,
            salary: 0,
            mainSkills: ["PHP", "React"],
            secondarySkills: ["CSS", "HTML"],
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
    },
};
</script>


<template>
    <div class="min-h-screen bg-accent-50 flex items-center justify-center">
        <div class="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
            <h2 class="text-2xl font-bold mb-6">Match Candidate</h2>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="location">Location:</label>
                    <input v-model="location" type="text" id="location" name="location" class="form-input w-full">
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="isRemote">Is Remote:</label>
                    <input v-model="isRemote" type="checkbox" id="isRemote" name="isRemote" class="form-checkbox">
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="experience">Experience:</label>
                    <input v-model="experience" type="number" id="experience" name="experience" class="form-input w-full">
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="salary">Salary:</label>
                    <input v-model="salary" type="number" id="salary" name="salary" class="form-input w-full">
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="mainSkills">Main Skills:</label>
                    <input v-model="mainSkills" type="text" id="mainSkills" name="mainSkills" class="form-input w-full">
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="secondarySkills">Secondary Skills:</label>
                    <input v-model="secondarySkills" type="text" id="secondarySkills" name="secondarySkills"
                        class="form-input w-full">
                </div>

                <button type="submit" class="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>

  