import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';
import { SendNotificationInput } from './send-notification.input';

@InputType()
export class UpdateNotificationInput extends PartialType(SendNotificationInput) {
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}
