import { ICalculateKnightExperienceHelper } from '../../domain/interfaces/helpers/calculate-knight-experience';

export class CalculateKnightExperience
  implements ICalculateKnightExperienceHelper
{
  execute({
    age,
  }: ICalculateKnightExperienceHelper.Input): ICalculateKnightExperienceHelper.Output {
    if (age < 7) return 0;

    return Math.floor((age - 7) * Math.pow(22, 1.45));
  }
}
