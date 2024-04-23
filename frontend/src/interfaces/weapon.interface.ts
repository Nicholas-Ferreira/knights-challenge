export interface Weapon {
  name: 'sword' | 'spear' | 'bow' | 'shield' | 'staff'
  mod: number | string
  attr: string
  equipped: boolean
}
