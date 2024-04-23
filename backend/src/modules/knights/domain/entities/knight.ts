import { Attributes } from './attributes';
import { Weapon } from './weapon';

export interface Knight {
  id: string;
  name: string;
  nickname: string;
  birthday: number;
  weapons: Weapon;
  attributes: Attributes;
  keyAttribute: string;
}
