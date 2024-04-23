export namespace IListKnightByIdService {
  export type Input = {
    id: string;
  };

  export type Output =
    | {
        name: string;
        age: number;
        weaponsAmount: number;
        attribute: string;
        attack: number;
        experience: number;
      }
    | Error;
}

export interface IListKnightByIdService {
  execute(
    data: IListKnightByIdService.Input,
  ): Promise<IListKnightByIdService.Output>;
}
