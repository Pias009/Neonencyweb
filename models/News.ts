
import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
  title: string;
  content: string;
  imagePath: string;
  videoUrl?: string;
  tags: string[];
  isFeatured: boolean;
  createdAt: Date;
}

const NewsSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  videoUrl: { type: String, required: false },
  tags: { type: [String], default: [] },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.News || mongoose.model<INews>('News', NewsSchema);
