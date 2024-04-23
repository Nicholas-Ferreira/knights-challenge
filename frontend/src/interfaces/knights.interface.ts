import type { Attributes } from './attributes.interface'
import type { Weapon } from './weapon.interface'

export interface Knight {
  name: string
  nickname: string
  birthday: number | string
  weapons: Weapon[]
  attributes: Attributes
  keyAttribute: keyof Attributes
}

export interface CreateKnightsResponse extends Knight {
  _id: string
  attack: number
  experience: number
  deletedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

export type ListKnightsResponse = {
  id: string
  name: string
  age: number
  weaponsAmount: number
  attribute: keyof Attributes
  attack: number
  experience: number
}
