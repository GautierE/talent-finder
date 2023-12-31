<template>
  <div class="relative flex flex-col items-center justify-start h-full overflow-hidden">
    <div class="flex items-center justify-center h-full overflow-hidden">
      <div v-for="(candidate, index) in sortedCandidates" :key="candidate.id" :ref="() => {
        return `card-${index}`
      }
        "
        class="select-none absolute w-3/4 border-4 shadow lg:w-[40%] xl:w-2/6 2xl:w-1/4 top-14 md:top-20 lg:top-16 rounded-xl h-3/4 bg-accent-100 border-primary-500"
        :class="{ hidden: swipedCardsIndexes.includes(index) }" @touchstart="onTouchStart(index, $event)"
        @touchmove="onTouchMove($event)" @touchend="onTouchEnd" @mousedown="onMouseDown(index, $event)"
        @mousemove="onMouseMove($event)" @mouseup="onMouseUp" :style="{
          transform:
            activeIndex === index
              ? `translateX(${currentX}px) rotate(${currentRotation}deg)`
              : `translateX(0px) rotate(0deg)`
        }">
        <div class="flex flex-col items-center h-full px-4 pb-4 justify-evenly">
          <img :src="getAvatarImage(candidate.id)" alt="Avatar" class="w-[80%] md:w-[40%]" />
          <h3 class="mt-2 font-bold text-[22px] md:text-[35px] lg:text-[30px]">
            {{ candidate.firstName }} {{ candidate.lastName }}
          </h3>
          <p>👨‍💻 {{ candidate.experience }} years of experience</p>
          <p>📍 Located in {{ candidate.location }}</p>
          <p v-if="candidate.isRemote">🌎 Remote friendly !</p>
          <p>💰 Salary expectations: {{ candidate.salary }} €</p>
          <div class="flex flex-row flex-wrap mt-2 overflow-y-scroll">
            <p :class="getSkillColor(skill.category)" class="px-3 py-1 mx-2 my-1 border-2 rounded-lg"
              v-for="(skill, skillIndex) in candidate.skills" :key="skillIndex">
              {{ skill.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute w-full bottom-4 md:bottom-8">
      <div class="flex items-center justify-around w-full select-none">
        <img class="z-20 p-1 m-4 rounded-full w-14 md:w-20 lg:w-24" src="/public/icons/swipe_left_icon.svg"
          alt="Undo icon" @click="removeLastSwipedCard" />
        <img
          class="cursor-pointer z-20 p-1 m-4 border-4 rounded-full w-14 md:w-20 md:border-[6px] lg:w-16 lg:border-4 bg-accent-100 border-primary-500"
          src="/public/icons/undo_icon.svg" alt="Undo icon" @click="removeLastSwipedCard" />
        <img class="z-20 p-1 m-4 rounded-full w-14 md:w-20 lg:w-24" src="/public/icons/swipe_right_icon.svg"
          alt="Undo icon" @click="removeLastSwipedCard" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    candidates: {
      type: Array,
      required: true,
      default: () => []
    },
    requiredSkills: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      currentRotation: 0,
      activeIndex: null,
      swipedCardsIndexes: [],
      categoryOrder: {
        frontend: 1,
        backend: 2,
        databases: 3,
        apis: 4,
        devops: 5,
        "project_management": 6,
        testing: 7,
        mobile: 8,
        misc: 9
      }
    }
  },
  methods: {
    getAvatarImage(candidateId) {
      return new URL(`/public/avatars/avatar${candidateId % 6}.svg`, import.meta.url).href
    },
    onTouchStart(index, event) {
      this.startX = event.touches[0].clientX
      this.startY = event.touches[0].clientY
      this.currentX = 0
      this.currentY = 0
      this.currentRotation = 0
      this.activeIndex = index
    },
    onTouchMove(event) {
      if (this.activeIndex === null) return

      this.currentX = event.touches[0].clientX - this.startX
      this.currentY = event.touches[0].clientY - this.startY
      this.currentRotation = Math.min(20, this.currentX / 10)
    },
    onTouchEnd() {
      if (this.activeIndex === null) return

      if (Math.abs(this.currentX) > 100 || Math.abs(this.currentY) > 100) {
        this.swipedCardsIndexes.push(this.activeIndex)
      }

      this.activeIndex = null
    },
    onMouseDown(index, event) {
      this.startX = event.clientX
      this.startY = event.clientY
      this.currentX = 0
      this.currentY = 0
      this.currentRotation = 0
      this.activeIndex = index

      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    },
    onMouseMove(event) {
      if (this.activeIndex === null) return

      this.currentX = event.clientX - this.startX
      this.currentY = event.clientY - this.startY
      this.currentRotation = Math.min(20, this.currentX / 10)
    },
    onMouseUp() {
      if (this.activeIndex === null) return

      if (Math.abs(this.currentX) > 100 || Math.abs(this.currentY) > 100) {
        this.swipedCardsIndexes.push(this.activeIndex)
      }

      this.activeIndex = null

      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    },
    getSkillColor(category) {
      switch (category) {
        case 'match':
          return 'bg-[#00FF1C]'
        case 'frontend':
          return 'bg-blue-200'
        case 'backend':
          return 'bg-green-200'
        case 'databases':
          return 'bg-purple-200'
        case 'devops':
          return 'bg-yellow-100'
        case 'project_management':
          return 'bg-yellow-100'
        case 'testing':
          return 'bg-pink-200'
        case 'apis':
          return 'bg-red-200'
        case 'mobile':
          return 'bg-rose-300'
        case 'misc':
          return 'bg-gray-300'
        default:
          return ''
      }
    },
    removeLastSwipedCard() {
      if (this.swipedCardsIndexes.length > 0) {
        this.swipedCardsIndexes.pop()
      }
    }
  },
  computed: {
    sortedCandidates() {
      return this.candidates.map((candidate) => {
        let matchedSkills = candidate.skills.filter((skill) =>
          this.requiredSkills.includes(skill.name)
        )

        // Edit the category of every matched skill so they get a specific color in getSkillColor()
        matchedSkills = matchedSkills.map((skill) => {
          return { ...skill, category: 'match' }
        })

        let unmatchedSkills = candidate.skills.filter(
          (skill) => !this.requiredSkills.includes(skill.name)
        )

        // Sort unmatched skills by categories in a specific order
        unmatchedSkills = unmatchedSkills.sort((a, b) => {
          const orderA = this.categoryOrder[a.category]
          const orderB = this.categoryOrder[b.category]
          return orderA - orderB
        })

        const sortedSkills = [...matchedSkills, ...unmatchedSkills]

        return { ...candidate, skills: sortedSkills }
      })
    }
  }
}
</script>
