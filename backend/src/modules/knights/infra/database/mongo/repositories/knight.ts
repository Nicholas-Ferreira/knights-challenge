import { Injectable } from '@nestjs/common';
import { DataSource, MongoRepository } from 'typeorm';
import { Knight } from '../entities/knight.entity';

@Injectable()
export class KnightRepository extends MongoRepository<Knight> {
  constructor(private dataSource: DataSource) {
    super(Knight, dataSource.createEntityManager());
  }
}
