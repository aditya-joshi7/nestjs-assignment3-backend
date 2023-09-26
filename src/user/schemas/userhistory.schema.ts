import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class UserHistory {
  @Prop()
  email: string;
  @Prop()
  question_id: string;
}

export const UserHistorySchema = SchemaFactory.createForClass(UserHistory);
UserHistorySchema.index({ email: 1, question_id: 1 }, { unique: true });
