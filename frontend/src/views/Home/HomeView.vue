<script>
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './HomeView.css'

import WeaponInformation from '../../components/WeaponInformation.vue'
import { Pagination, Navigation } from 'swiper/modules'

import { onMounted, ref } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { useToast } from 'vue-toast-notification'

import Card from '../../components/CardComponent.vue'
import { KnightsService } from '../../services/knights'

export default {
  components: { WeaponInformation, Swiper, SwiperSlide, Card },
  setup() {
    const toast = useToast()
    const KNIGHTS = ref([])

    const handleListKnights = async () => {
      try {
        const knightsResponse = await KnightsService.listAllKnights()
        KNIGHTS.value = knightsResponse
      } catch (error) {
        toast.error(error.message ?? 'Error to list knights')
      }
    }

    const handleRemoveKnight = async ({ knight_id }) => {
      try {
        await KnightsService.deleteKnights({ knight_id })
        toast.success('Knight removed with success')
        await handleListKnights()
      } catch (error) {
        toast.error(error.message ?? 'Error to remove knight')
      }
    }

    const handleUpdateKnight = async ({ knight_id, nickname }) => {
      try {
        await KnightsService.updateKnights({ knight_id, nickname })
        toast.success('Knight edited with success')
        await handleListKnights()
      } catch (error) {
        toast.error(error.message ?? 'Error to edit knight')
      }
    }

    onMounted(() => {
      handleListKnights()
    })

    return {
      modules: [Pagination, Navigation],
      handleRemoveKnight,
      handleUpdateKnight,
      KNIGHTS
    }
  }
}
</script>

<template>
  <section class="home-container">
    <div class="wrapper-header">
      <Card
        name="Name"
        nickname="Nickname"
        age="0"
        attack="0"
        exp="0"
        weapon="0"
        typeWeapon="spear"
        attribute="strength"
      />
      <WeaponInformation />
    </div>

    <h1 class="title" v-if="KNIGHTS.length">All Knights</h1>

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
          :onUpdateKnight="({ nickname }) => handleUpdateKnight({ knight_id: knight.id, nickname })"
          :onRemoveKnight="() => handleRemoveKnight({ knight_id: knight.id })"
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
