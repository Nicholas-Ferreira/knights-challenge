import { Module } from '@nestjs/common';
import { KnightsController } from './knights.controller';
import {
  CreateKnightService,
  DeleteKnightByIdService,
  ListAllKnightService,
} from './application/services';
import { KnightRepository } from './infra/database/mongo/repositories/knight';
import { CalculateKnightAttack } from './application/helpers/calculate-knight-attack';
import { CalculateKnightExperience } from './application/helpers/calculate-knight-experience';
import { ListKnightByIdService } from './application/services/list-knight-by-id.service';
import { UpdateKnightNicknameByIdService } from './application/services/update-knight-nickname-by-id.service';

@Module({
  imports: [],
  controllers: [KnightsController],
  providers: [
    ListAllKnightService,
    CreateKnightService,
    KnightRepository,
    CalculateKnightAttack,
    CalculateKnightExperience,
    ListKnightByIdService,
    DeleteKnightByIdService,
    UpdateKnightNicknameByIdService,
  ],
})
export class KnightsModule {}
