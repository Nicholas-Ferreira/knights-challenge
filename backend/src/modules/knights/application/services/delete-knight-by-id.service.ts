import { Injectable, NotFoundException } from '@nestjs/common';
import { KnightRepository } from '../../infra/database/mongo/repositories/knight';
import { ObjectId } from 'mongodb';
import { IDeleteKnightByIdService } from '../../domain/services/delete-knight-by-id';

@Injectable()
export class DeleteKnightByIdService implements IDeleteKnightByIdService {
  constructor(private readonly knightRepository: KnightRepository) {}

  async execute({
    id,
  }: IDeleteKnightByIdService.Input): Promise<IDeleteKnightByIdService.Output> {
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
      { $set: { deletedAt: new Date() } },
    );

    return;
  }
}
