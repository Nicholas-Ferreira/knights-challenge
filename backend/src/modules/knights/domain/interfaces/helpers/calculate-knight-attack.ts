export namespace ICalculateKnightAttackHelper {
  export type Input = {
    keyAttributeMod: number;
    equippedWeaponMod: number;
  };

  export type Output = number;
}

export interface ICalculateKnightAttackHelper {
  execute(
    data: ICalculateKnightAttackHelper.Input,
  ): ICalculateKnightAttackHelper.Output;
}
