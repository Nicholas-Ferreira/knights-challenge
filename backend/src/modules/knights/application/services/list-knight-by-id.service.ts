import { Injectable, NotFoundException } from '@nestjs/common';
import { KnightRepository } from '../../infra/database/mongo/repositories/knight';
import { CalculateKnightAttack } from '../helpers/calculate-knight-attack';
import { CalculateKnightExperience } from '../helpers/calculate-knight-experience';
import { IListKnightByIdService } from '../../domain/services/list-knight-by-id';
import { ObjectId } from 'mongodb';

@Injectable()
export class ListKnightByIdService implements IListKnightByIdService {
  constructor(
    private readonly knightRepository: KnightRepository,
    private readonly calculateKnightAttack: CalculateKnightAttack,
    private readonly calculateKnightExperience: CalculateKnightExperience,
  ) {}

  async execute({
    id,
  }: IListKnightByIdService.Input): Promise<IListKnightByIdService.Output> {
    const knight = await this.knightRepository.findOne({
      where: { _id: new ObjectId(id), deletedAt: null },
    });

    if (!knight) {
      throw new NotFoundException('Knight not found');
    }

    const attack = this.calculateKnightAttack.execute({
      equippedWeaponMod: knight.weapons.find((weapon) => weapon.equipped).mod,
      keyAttributeMod: knight.attributes[knight.keyAttribute],
    });

    const experience = this.calculateKnightExperience.execute({
      age: knight.birthday,
    });

    return {
      name: knight.name,
      age: knight.birthday,
      weaponsAmount: knight.weapons.length,
      attribute: knight.keyAttribute,
      attack,
      experience,
    };
  }
}
