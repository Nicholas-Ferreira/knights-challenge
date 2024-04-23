<script setup lang="ts">
import './CreateKnightView.css'
import { ref, computed } from 'vue'
import { useToast } from 'vue-toast-notification'

import Card from '../../components/CardComponent.vue'
import { CalculateKnightAttack } from '../../helpers/calculate-knight-attack'
import { CalculateKnightExperience } from '../../helpers/calculate-knight-experience'

import type { Knight } from 'interfaces/knights.interface'
import type { Weapon } from 'interfaces/weapon.interface'
import type { Attributes } from 'interfaces/attributes.interface'
import { KnightsService } from '../../services/knights'

const toast = useToast()

const weapons = ref<Weapon>({
  name: '' as Weapon['name'],
  mod: '',
  attr: '',
  equipped: false
})

const formItems = ref<Knight>({
  name: '',
  nickname: '',
  birthday: '',
  weapons: [],
  attributes: {
    strength: '',
    dexterity: '',
    constitution: '',
    intelligence: '',
    wisdom: '',
    charisma: ''
  },
  keyAttribute: '' as keyof Attributes
})

const optionsWeapons = [
  { text: 'Sword', value: 'sword' },
  { text: 'Spear', value: 'spear' },
  { text: 'Bow', value: 'bow' },
  { text: 'Shield', value: 'shield' },
  { text: 'Staff', value: 'staff' }
]

const optionsAttributes = [
  { text: 'Strength', value: 'strength' },
  { text: 'Dexterity', value: 'dexterity' },
  { text: 'Constitution', value: 'constitution' },
  { text: 'Intelligence', value: 'intelligence' },
  { text: 'Wisdom', value: 'wisdom' },
  { text: 'Charisma', value: 'charisma' }
]

const onCreateKnight = async () => {
  try {
    await KnightsService.createKnights(formItems.value)

    toast.success('Knight created successfully!', {
      dismissible: true
    })
  } catch (error) {
    toast.error('Error to create knight!', {
      dismissible: true
    })
  }
}

const onAddWeapon = () => {
  if (formItems.value.weapons.length >= 6) {
    return toast.error('You can only add six weapons!', {
      dismissible: true
    })
  }
  if (!weapons.value.name || !weapons.value.attr || !weapons.value.mod)
    return toast.error('You need fill in all fields!', {
      dismissible: true
    })

  formItems.value.weapons.push({
    name: weapons.value.name,
    mod: weapons.value.mod,
    attr: weapons.value.attr,
    equipped: weapons.value.equipped
  })

  weapons.value = {
    name: '' as Weapon['name'],
    mod: '',
    attr: '',
    equipped: false
  }
}

const onRemoveWeapon = (weapon: Weapon) => {
  formItems.value.weapons = formItems.value.weapons.filter(
    (currentWeapon: Weapon) => currentWeapon !== weapon
  )
}

const setEquipped = (value: boolean) => {
  weapons.value.equipped = value
}

const hasEquippedWeapon = computed(() => {
  setEquipped(false)

  return formItems.value.weapons.some((weapon) => weapon.equipped)
})

const keyAttr = computed(() => +formItems.value.attributes[formItems.value.keyAttribute])
const typeWeapon = computed(() => {
  const equippedWeapon = formItems.value.weapons.find((weapon) => weapon.equipped)
  return equippedWeapon ? equippedWeapon.name : formItems.value.weapons[0]?.name
})

const attack = computed(() =>
  new CalculateKnightAttack().execute({
    equippedWeaponMod: Number(formItems.value.weapons.find((weapon) => weapon.equipped)?.mod),
    keyAttributeMod: Number(keyAttr.value)
  })
)

const experience = computed(() =>
  new CalculateKnightExperience().execute({
    age: Number(formItems.value.birthday)
  })
)

const CardAttributes = computed(() => ({
  name: formItems.value.name,
  nickname: formItems.value.nickname,
  age: +formItems.value.birthday,
  attack: attack.value,
  exp: experience.value,
  weapon: formItems.value.weapons.length,
  typeWeapon: typeWeapon.value || 'bow',
  attribute: formItems.value.keyAttribute
}))
</script>

<template>
  <Card
    :name="CardAttributes.name"
    :nickname="CardAttributes.nickname"
    :age="CardAttributes.age"
    :attack="CardAttributes.attack"
    :exp="CardAttributes.exp"
    :weapon="CardAttributes.weapon"
    :typeWeapon="CardAttributes.typeWeapon"
    :attribute="CardAttributes.attribute"
  />

  <section class="create-container">
    <h1 class="title">Create Knight</h1>
    <form class="wrapper-form" @submit.prevent="onCreateKnight">
      <input v-model="formItems.name" type="text" placeholder="Name" class="form-item" />

      <div class="form-row">
        <input v-model="formItems.nickname" type="text" placeholder="Nickname" class="form-item" />
        <input
          v-model="formItems.birthday"
          type="number"
          placeholder="Birthday"
          class="form-item"
        />
      </div>

      <div v-if="!!formItems.weapons.length" class="weapon-added">
        <div v-for="weapon in formItems.weapons" :key="weapon.name">
          <span>{{ weapon.name || '-' }}</span>
          <span>{{ weapon.mod || '-' }}</span>
          <span>{{ weapon.attr || '-' }}</span>
          <span>{{ weapon.equipped ? 'Equipped' : 'Not equipped' }}</span>
          <button @click="onRemoveWeapon(weapon)" class="form-button-remove">Remover</button>
        </div>
      </div>

      <div class="form-row">
        <div class="select-wrapper form-item">
          <select
            v-model="weapons.name"
            placeholder="Weapon name"
            :class="{ 'select-placeholder': !weapons.name }"
          >
            <option value="" disabled selected>Weapon name</option>
            <option v-for="option in optionsWeapons" :value="option.value" :key="option.value">
              {{ option.text }}
            </option>
          </select>

          <v-icon name="fa-sort-down" scale="1.2" class="select-arrow" />
        </div>

        <input v-model="weapons.mod" type="number" placeholder="Weapon mod" class="form-item" />

        <div class="select-wrapper form-item">
          <select
            v-model="weapons.attr"
            placeholder="Weapon attribute"
            :class="{ 'select-placeholder': !weapons.attr }"
          >
            <option value="" disabled selected>Weapon attribute</option>
            <option v-for="option in optionsAttributes" :value="option.value" :key="option.value">
              {{ option.text }}
            </option>
          </select>
          <v-icon name="fa-sort-down" scale="1.2" class="select-arrow" />
        </div>

        <label for="equippedWeapon" class="wrapper-checkbox flex items-center">
          <input
            :disabled="hasEquippedWeapon"
            id="equippedWeapon"
            v-model="weapons.equipped"
            type="checkbox"
            :true-value="true"
            :false-value="false"
            placeholder="Weapon equipped"
          />
          <span class="checkmark"></span>
          <span class="no-select cursor-pointer">Equipped weapon</span>
        </label>

        <button type="button" @click="onAddWeapon" class="form-button-added">Add weapon</button>
      </div>

      <div class="form-row">
        <input
          v-model="formItems.attributes.strength"
          type="number"
          placeholder="Strength"
          class="form-item"
        />
        <input
          v-model="formItems.attributes.dexterity"
          type="number"
          placeholder="Dexterity"
          class="form-item"
        />
        <input
          v-model="formItems.attributes.constitution"
          type="number"
          placeholder="Constitution"
          class="form-item"
        />
        <input
          v-model="formItems.attributes.intelligence"
          type="number"
          placeholder="Intelligence"
          class="form-item"
        />
        <input
          v-model="formItems.attributes.wisdom"
          type="number"
          placeholder="Wisdom"
          class="form-item"
        />
        <input
          v-model="formItems.attributes.charisma"
          type="number"
          placeholder="Charisma"
          class="form-item"
        />
        <div class="select-wrapper form-item">
          <select
            v-model="formItems.keyAttribute"
            placeholder="Attribute Key"
            :class="{ 'select-placeholder': !formItems.keyAttribute }"
          >
            <option value="" disabled selected>Attribute key</option>
            <option v-for="option in optionsAttributes" :value="option.value" :key="option.value">
              {{ option.text }}
            </option>
          </select>
          <v-icon name="fa-sort-down" scale="1.2" class="select-arrow" />
        </div>
      </div>

      <button type="submit" value="Add" class="form-submit">Create knight</button>
    </form>
  </section>
</template>
