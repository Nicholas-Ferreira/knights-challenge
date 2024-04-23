import { Injectable } from '@nestjs/common';
import { ICreateKnightService } from '../../domain/services/create-knight';
import { KnightRepository } from '../../infra/database/mongo/repositories/knight';
import { CalculateKnightAttack } from '../helpers/calculate-knight-attack';
import { CalculateKnightExperience } from '../helpers/calculate-knight-experience';

@Injectable()
export class CreateKnightService implements ICreateKnightService {
  constructor(
    private readonly knightRepository: KnightRepository,
    private readonly calculateKnightAttack: CalculateKnightAttack,
    private readonly calculateKnightExperience: CalculateKnightExperience,
  ) {}

  async execute(
    params: ICreateKnightService.Params,
  ): Promise<ICreateKnightService.Output> {
    const knight = await this.knightRepository.save({
      ...params,
      deletedAt: null,
    });

    const equippedWeapon = knight.weapons.find((weapon) => weapon.equipped);

    const attack = this.calculateKnightAttack.execute({
      equippedWeaponMod: equippedWeapon.mod,
      keyAttributeMod: knight.attributes[knight.keyAttribute],
    });

    const experience = this.calculateKnightExperience.execute({
      age: knight.birthday,
    });

    return { ...knight, attack, experience };
  }
}
