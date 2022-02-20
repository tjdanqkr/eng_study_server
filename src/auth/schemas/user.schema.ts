import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true })
  id: string;

  @Prop()
  password: string;

  @Prop()
  userName: string;

  @Prop()
  phoneNum: number;

  @Prop()
  bigCategory: number;

  @Prop()
  middleCategory: number;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
