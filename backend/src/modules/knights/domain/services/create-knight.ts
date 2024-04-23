export namespace ICreateKnightService {
  export type Params = {
    name: string;
    nickname: string;
    birthday: number;
    attributes: {
      strength: number;
      dexterity: number;
      constitution: number;
      intelligence: number;
      wisdom: number;
      charisma: number;
    };
    weapons: {
      name: string;
      mod: number;
      attr: string;
      equipped: boolean;
    }[];
  };
  export type Output = ICreateKnightService.Params & {
    attack: number;
    experience: number;
  };
}

export interface ICreateKnightService {
  execute(
    data: ICreateKnightService.Params,
  ): Promise<ICreateKnightService.Output>;
}
