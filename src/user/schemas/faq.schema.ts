import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Faq {
  @Prop()
  question: string;
  @Prop()
  answer: string;
  @Prop()
  id: string;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);
