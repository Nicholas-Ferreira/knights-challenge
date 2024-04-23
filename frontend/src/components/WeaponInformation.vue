<script setup lang="ts">
import WeaponTemplate from './WeaponTemplate.vue'
import BowIcon from './icons/IconBow.vue'
import ShieldIcon from './icons/IconShield.vue'
import MageIcon from './icons/IconMage.vue'
import SwordIcon from './icons/IconSword.vue'
import SpearIcon from './icons/IconSpear.vue'
</script>

<template>
  <div class="container">
    <WeaponTemplate>
      <template #icon>
        <SwordIcon />
      </template>
      <template #heading>Sword</template>
      <p>
        A sharp-bladed weapon, versatile and agile, ideal for close combat and defensive skills.
      </p>
    </WeaponTemplate>

    <WeaponTemplate>
      <template #icon>
        <ShieldIcon />
      </template>
      <template #heading>Shield</template>
      <p>
        A sturdy defensive device used to protect the user from enemy attacks, increasing their
        resilience and defense in battle.
      </p>
    </WeaponTemplate>

    <WeaponTemplate>
      <template #icon>
        <BowIcon />
      </template>
      <template #heading>Bow</template>

      <p>
        A long-range weapon that shoots arrows accurately, allowing effective ranged attacks against
        enemies.
      </p>
    </WeaponTemplate>

    <WeaponTemplate>
      <template #icon>
        <SpearIcon />
      </template>
      <template #heading>Spear</template>

      <p>
        A versatile polearm weapon, offering additional reach and effectiveness both in close combat
        and at a distance. Ideal for thrusting, piercing, or throwing at enemies.
      </p>
    </WeaponTemplate>

    <WeaponTemplate>
      <template #icon>
        <MageIcon />
      </template>
      <template #heading>Staff</template>

      <p>
        A magical instrument used by wizards to channel mystical energies, offering powerful magical
        attacks and support abilities.
      </p>
    </WeaponTemplate>
  </div>
</template>

<style scoped>
.container {
  margin-left: 1.8rem;
}
</style>
