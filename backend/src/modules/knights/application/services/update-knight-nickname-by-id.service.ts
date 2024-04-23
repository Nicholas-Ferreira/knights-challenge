import { Injectable, NotFoundException } from '@nestjs/common';
import { KnightRepository } from '../../infra/database/mongo/repositories/knight';
import { ObjectId } from 'mongodb';
import { IUpdateKnightNicknameByIdService } from '../../domain/services/update-knight-nickname-by-id';

@Injectable()
export class UpdateKnightNicknameByIdService
  implements IUpdateKnightNicknameByIdService
{
  constructor(private readonly knightRepository: KnightRepository) {}

  async execute({
    id,
    nickname,
  }: IUpdateKnightNicknameByIdService.Input): Promise<IUpdateKnightNicknameByIdService.Output> {
    const knight = await this.knightRepository.findOne({
      where: { _id: new ObjectId(id), deletedAt: null },
    });

    if (!knight) {
      throw new NotFoundException('Knight not found');
    }

    await this.knightRepository.updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: { nickname } },
    );

    return;
  }
}
