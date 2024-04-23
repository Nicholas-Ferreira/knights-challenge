export namespace IListAllHeroesKnightsService {
  export type Output = {
    name: string;
    age: number;
    weaponsAmount: number;
    attribute: string;
    attack: number;
    experience: number;
  }[];
}

export interface IListAllHeroesKnightsService {
  execute(): Promise<IListAllHeroesKnightsService.Output>;
}
