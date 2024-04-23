<script>
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './HallOfHeroView.css'

import { Pagination, Navigation } from 'swiper/modules'

import { onMounted, ref } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { useToast } from 'vue-toast-notification'

import Card from '../../components/CardComponent.vue'
import { KnightsService } from '../../services/knights'

export default {
  components: {
    Swiper,
    SwiperSlide,
    Card
  },
  setup() {
    const toast = useToast()
    const KNIGHTS = ref([])

    const handleListKnights = async () => {
      try {
        const knightsResponse = await KnightsService.listHallOfHero()
        KNIGHTS.value = knightsResponse
      } catch (error) {
        toast.error(error.message ?? 'Error to list knights')
      }
    }

    onMounted(() => {
      handleListKnights()
    })

    return {
      modules: [Pagination, Navigation],
      KNIGHTS
    }
  }
}
</script>

<template>
  <section class="hall-container">
    <h1 class="title">Hall Of Hero</h1>

    <span class="subtitle" v-if="!KNIGHTS.length">The Hall of Hero is empty in moment</span>

    <swiper
      ref="{swiperRef}"
      :slidesPerView="1"
      :pagination="{ type: 'fraction' }"
      :navigation="true"
      :modules="modules"
      :breakpoints="{
        '640': { slidesPerView: 1 },
        '768': { slidesPerView: 2 },
        '1024': { slidesPerView: 3 }
      }"
    >
      <swiper-slide v-for="(knight, index) in KNIGHTS" :key="index">
        <Card
          :name="knight.name"
          :nickname="knight.nickname"
          :age="knight.age"
          :attack="knight.attack"
          :exp="knight.experience"
          :weapon="knight.weaponsAmount"
          :typeWeapon="knight.typeWeapon"
          :attribute="knight.attribute"
        />
      </swiper-slide>
    </swiper>
  </section>
</template>
