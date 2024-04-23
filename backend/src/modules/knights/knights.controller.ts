import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateKnightService,
  DeleteKnightByIdService,
  ListAllKnightService,
} from './application/services';
import { ICreateKnightService } from './domain/services/create-knight';
import { IListAllKnightsService } from './domain/services/list-all-knight';
import { ListKnightByIdService } from './application/services/list-knight-by-id.service';
import { IListKnightByIdService } from './domain/services/list-knight-by-id';
import { IDeleteKnightByIdService } from './domain/services/delete-knight-by-id';
import { UpdateKnightNicknameByIdService } from './application/services/update-knight-nickname-by-id.service';

@Controller('/knights')
export class KnightsController {
  constructor(
    private readonly createKnightService: CreateKnightService,
    private readonly listAllKnightService: ListAllKnightService,
    private readonly listKnightByIdService: ListKnightByIdService,
    private readonly deleteKnightByIdService: DeleteKnightByIdService,
    private readonly updateKnightNicknameByIdService: UpdateKnightNicknameByIdService,
  ) {}

  @Post()
  create(
    @Body() body: ICreateKnightService.Params,
  ): Promise<ICreateKnightService.Output> {
    return this.createKnightService.execute(body);
  }

  @Get()
  listAll(
    @Query('filter') filter: string,
  ): Promise<IListAllKnightsService.Output> {
    return this.listAllKnightService.execute({ filter });
  }

  @Get(':id')
  listOne(@Param('id') id: string): Promise<IListKnightByIdService.Output> {
    return this.listKnightByIdService.execute({ id });
  }

  @HttpCode(204)
  @Delete(':id')
  deleteOne(@Param('id') id: string): Promise<IDeleteKnightByIdService.Output> {
    return this.deleteKnightByIdService.execute({ id });
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() body: { nickname: string },
  ): Promise<IDeleteKnightByIdService.Output> {
    return this.updateKnightNicknameByIdService.execute({
      id,
      nickname: body.nickname,
    });
  }
}
