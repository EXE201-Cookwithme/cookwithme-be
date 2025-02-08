import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async createComment(userId: string, createCommentDto: CreateCommentDto) {
    const comment = await this.commentRepository.createComment(
      userId,
      createCommentDto,
    );
    return comment;
  }

  async getCommentsByPostId(postId: string) {
    const comments = await this.commentRepository.getCommentsByPostId(postId);
    return comments;
  }
}
