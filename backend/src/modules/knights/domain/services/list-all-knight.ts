export namespace IListAllKnightsService {
  export type Input = {
    filter: string;
  };

  export type Output = {
    name: string;
    age: number;
    weaponsAmount: number;
    attribute: string;
    attack: number;
    experience: number;
  }[];
}

export interface IListAllKnightsService {
  execute(
    data: IListAllKnightsService.Input,
  ): Promise<IListAllKnightsService.Output>;
}
