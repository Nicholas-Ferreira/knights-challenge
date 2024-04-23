<script setup lang="ts">
import { computed, ref } from 'vue'
import BackgroundCard from './backgrounds/BackgroundCard.vue'

const props = defineProps<{
  onUpdateKnight?: ({ nickname }: { nickname: string }) => void
  onRemoveKnight?: () => void
  nickname?: string
  name: string
  age?: number
  weapon?: number
  typeWeapon?: 'sword' | 'spear' | 'bow' | 'shield' | 'staff'
  attribute?: string
  attack?: number
  exp?: number
  color?: string
}>()

function randomPerson(type: string, min: number, max: number) {
  return type.concat('_0') + Math.floor(Math.random() * (max - min + 1) + min)
}

function renderPerson() {
  if (props.typeWeapon?.includes('bow')) return randomPerson(props.typeWeapon, 1, 2)

  if (props.typeWeapon?.includes('sword')) return randomPerson(props.typeWeapon, 1, 3)

  return props.typeWeapon ?? 'spear'
}

const customColorByHero = (person?: string) => {
  const color: { [key: string]: string } = {
    ['sword_01']: 'var(--yellow-color)',
    ['sword_02']: 'var(--purple-color)',
    ['sword_03']: 'var(--yellow-color)',
    ['bow_01']: 'var(--green-color)',
    ['bow_02']: 'var(--brown-color)',
    spear: 'var(--red-color)',
    shield: 'var(--orange-color)',
    staff: 'var(--blue-color)'
  }

  return person ? color[person] : 'var(--green-color)'
}

const hero = computed(() => renderPerson())

const isUpdateNickname = ref(false)
const nicknameRef = ref('')

const onEditKnight = () => {
  !!props.onUpdateKnight && props.onUpdateKnight({ nickname: nicknameRef.value })
  isUpdateNickname.value = !isUpdateNickname.value
}

const onChangeNickname = (event: Event) => {
  const target = event.target as HTMLInputElement
  nicknameRef.value = target.value
}
</script>

<template>
  <div>
    <div class="card">
      <div class="wrapper-background">
        <div
          class="wrapper-content"
          :style="{ '--gradient-color': color ?? customColorByHero(hero) }"
        >
          <div class="content">
            <button
              v-if="!!onRemoveKnight"
              class="trash"
              @click="!!onRemoveKnight && onRemoveKnight()"
            >
              <v-icon name="bi-trash-fill" />
            </button>

            <div class="header">
              <img :src="`/persons/${hero}.png`" alt="knight" class="img-knight"/>
            </div>

            <BackgroundCard class="bg-header-card" :color="color ?? customColorByHero(hero)" />

            <h2>{{ name }}</h2>

            <div class="wrapper-nickname" v-if="nickname && !!isUpdateNickname">
              <input type="text" @change="onChangeNickname" />
              <button v-if="!!onUpdateKnight" class="update-knight-confirm" @click="onEditKnight">
                <v-icon name="fa-check" />
              </button>
            </div>

            <div class="wrapper-nickname" v-if="nickname && !isUpdateNickname">
              <span class="nickname">{{ nickname }}</span>

              <button
                v-if="!!onUpdateKnight"
                class="update-knight-edit"
                @click="isUpdateNickname = !isUpdateNickname"
              >
                <v-icon name="bi-pencil" />
              </button>
            </div>

            <div class="wrapper-info">
              <div class="info" v-if="!!age">
                <span>Age</span>
                <span>{{ age }}</span>
              </div>
              <div class="info" v-if="!!weapon">
                <span>Weapon</span>
                <span>{{ weapon }}</span>
              </div>
              <div class="info" v-if="!!attribute">
                <span>Attribute</span>
                <span>{{ attribute }}</span>
              </div>
              <div class="info" v-if="!!attack">
                <span>Attack</span>
                <span>{{ attack }}</span>
              </div>
              <div class="info" v-if="!!exp">
                <span>Exp</span>
                <span>{{ exp }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper-nickname {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  gap: 6px;
  z-index: 3;
  margin-top: -4px;
  margin-bottom: 6px;
}

.wrapper-nickname input {
  background-color: var(--vt-c-divider-light-1);
  color: var(--vt-c-text-dark-2);
  padding: 6px;
  flex: 1;
  border-radius: 5px;
  border: 1px solid var(--vt-c-divider-light-1);
  outline: none;
}

.update-knight-edit,
.update-knight-confirm {
  z-index: 3;
  color: var(--green-color);
  background-color: var(--vt-c-divider-light-1);
  border: 1px solid var(--vt-c-divider-light-1);
  padding: 4px;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}

.trash {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
  color: var(--red-color);
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
}

.nickname {
  font-size: 0.7rem;
  color: var(--color-card-text-info);
  text-shadow: 0 0 5px var(--vt-c-text-dark-3);
  z-index: 3;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 90%;
}

.card {
  overflow: visible;

  width: 320px;
  height: 438px;
}
.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
}

.bg-header-card {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.content h2 {
  font-size: 1.5rem;
  color: var(--color-card-text-info);
  text-shadow: 0 0 5px var(--vt-c-text-dark-3);
  font-weight: bold;
  margin-bottom: 4px;
  z-index: 3;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 90%;
}

.wrapper-info {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  flex: 1;
  gap: 6px;
  z-index: 3;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 6px 12px;
  border-radius: 5px;
  color: var(--color-card-text-info);
  background-color: var(--color-card-background-info);
}

.info span {
  font-size: 0.9rem;
  font-weight: bold;
}

.img-knight {
  width: 60%;
  max-width: 200px;
  max-height: 160px;
  padding: 10px;
  z-index: 2;
}

.wrapper-background {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 300ms;
  box-shadow: 0px 0px 10px 1px var(--color-border-shadow);
  border-radius: 5px;
}

.wrapper-content {
  background: linear-gradient(
    var(--vt-c-black-mute),
    var(--vt-c-black),
    var(--vt-c-black),
    var(--vt-c-black-soft)
  );
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 5px;
  overflow: hidden;
  justify-content: center;
  display: flex;
  align-items: center;
}

.wrapper-content::before {
  position: absolute;
  content: ' ';
  display: block;
  width: 160px;
  height: 160%;
  background: linear-gradient(
    90deg,
    transparent,
    var(--gradient-color),
    var(--gradient-color),
    var(--gradient-color),
    var(--gradient-color),
    transparent
  );
  animation: rotation 20000ms infinite linear;
}

.content {
  position: absolute;
  width: 99%;
  height: 99%;
  background-color: rgb(14, 12, 12);
  border-radius: 5px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

@keyframes rotation {
  0% {
    transform: rotateZ(0deg);
  }

  0% {
    transform: rotateZ(360deg);
  }
}
</style>
