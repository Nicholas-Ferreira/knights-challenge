import { ICalculateKnightAttackHelper } from '../../domain/interfaces/helpers/calculate-knight-attack';

export class CalculateKnightAttack implements ICalculateKnightAttackHelper {
  execute({
    equippedWeaponMod,
    keyAttributeMod,
  }: ICalculateKnightAttackHelper.Input): number {
    const attack =
      10 + this.getAttributeMod(keyAttributeMod) + equippedWeaponMod;

    return attack;
  }

  private getAttributeMod(mainAttributeMod: number) {
    const rangeMods = [
      { min: 0, max: 8, mod: -2 },
      { min: 9, max: 10, mod: -1 },
      { min: 11, max: 12, mod: 0 },
      { min: 13, max: 15, mod: 1 },
      { min: 16, max: 18, mod: 2 },
      { min: 19, max: 20, mod: 3 },
    ];

    const mod = rangeMods.find(
      (range) => mainAttributeMod >= range.min && mainAttributeMod <= range.max,
    )?.mod;

    return mod ?? 0;
  }
}
