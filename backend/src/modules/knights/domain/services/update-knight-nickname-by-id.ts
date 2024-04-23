export namespace IUpdateKnightNicknameByIdService {
  export type Input = {
    id: string;
    nickname: string;
  };

  export type Output = Error | void;
}

export interface IUpdateKnightNicknameByIdService {
  execute(
    data: IUpdateKnightNicknameByIdService.Input,
  ): Promise<IUpdateKnightNicknameByIdService.Output>;
}
