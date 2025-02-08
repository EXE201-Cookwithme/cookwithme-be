import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentRepository {
  constructor(@InjectModel('Comment') private commentModel: Model<Comment>) {}

  async createComment(userId: string, createCommentDto: CreateCommentDto) {
    const comment = await this.commentModel.create({
      ...createCommentDto,
      userId,
    });
    return comment.populate('userId');
  }

  async getCommentsByPostId(postId: string) {
    const comments = await this.commentModel
      .find({ postId })
      .populate('userId');
    return comments;
  }
}
