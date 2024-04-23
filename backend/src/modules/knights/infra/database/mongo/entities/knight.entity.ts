import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Weapon } from '../../../../domain/entities/weapon';
import { Attributes } from '../../../../domain/entities/attributes';

@Entity()
export class Knight {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  birthday: number;

  @Column()
  weapons: Weapon[];

  @Column()
  attributes: Attributes;

  @Column()
  keyAttribute: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  deletedAt: Date | null;
}
