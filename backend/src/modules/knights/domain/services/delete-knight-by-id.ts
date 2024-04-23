export namespace IDeleteKnightByIdService {
  export type Input = {
    id: string;
  };

  export type Output = Error | void;
}

export interface IDeleteKnightByIdService {
  execute(
    data: IDeleteKnightByIdService.Input,
  ): Promise<IDeleteKnightByIdService.Output>;
}
