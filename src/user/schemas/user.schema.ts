import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../roles/role.enum';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop()
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
