import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum NotificationType {
  INFO = 'INFO',
  ALERTE = 'ALERTE',
  URGENCE = 'URGENCE',
}

registerEnumType(NotificationType, {
  name: 'NotificationType',
  description: 'Notification severity type',
});

@ObjectType()
@Entity('notifications')
export class Notification {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column('text')
  message!: string;

  @Field(() => NotificationType)
  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type!: NotificationType;

  @Field(() => Boolean)
  @Column({ default: false })
  isRead!: boolean;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;
}
