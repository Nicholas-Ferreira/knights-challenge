export namespace ICalculateKnightExperienceHelper {
  export type Input = {
    age: number;
  };

  export type Output = number;
}

export interface ICalculateKnightExperienceHelper {
  execute(
    data: ICalculateKnightExperienceHelper.Input,
  ): ICalculateKnightExperienceHelper.Output;
}
