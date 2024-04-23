import { Injectable } from '@nestjs/common';
import { KnightRepository } from '../../infra/database/mongo/repositories/knight';
import { IListAllKnightsService } from '../../domain/services/list-all-knight';
import { CalculateKnightAttack } from '../helpers/calculate-knight-attack';
import { CalculateKnightExperience } from '../helpers/calculate-knight-experience';

@Injectable()
export class ListAllKnightService implements IListAllKnightsService {
  constructor(
    private readonly knightRepository: KnightRepository,
    private readonly calculateKnightAttack: CalculateKnightAttack,
    private readonly calculateKnightExperience: CalculateKnightExperience,
  ) {}

  async execute({ filter }): Promise<IListAllKnightsService.Output> {
    const whereParams =
      filter === 'heroes' ? { deletedAt: { $ne: null } } : { deletedAt: null };

    const knights = await this.knightRepository.find({
      where: whereParams,
    });

    const knightsOutput = knights.map((knight) => {
      const attack = this.calculateKnightAttack.execute({
        equippedWeaponMod: knight.weapons.find((weapon) => weapon.equipped)
          ?.mod,
        keyAttributeMod: knight.attributes[knight.keyAttribute],
      });

      const typeWeapon = knight.weapons.find((weapon) => weapon.equipped)?.name;

      const experience = this.calculateKnightExperience.execute({
        age: knight.birthday,
      });

      return {
        id: knight._id,
        name: knight.name,
        nickname: knight.nickname,
        age: knight.birthday,
        weaponsAmount: knight.weapons.length,
        attribute: knight.keyAttribute,
        typeWeapon: typeWeapon,
        attack,
        experience,
      };
    });

    return knightsOutput;
  }
}
