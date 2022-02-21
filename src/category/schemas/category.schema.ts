import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: { createdAt: true, updatedAt: true },
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
    },
  },
})
export class Category {
  @Prop({ auto: true, index: true, _id: true })
  num: number;

  @Prop()
  title: string;

  @Prop()
  type: number;

  @Prop()
  precedence: number;

  @Prop()
  isEnd: boolean;
}
export const CategorySchema = SchemaFactory.createForClass(Category);

export type CategoryDocument = Category & Document;
