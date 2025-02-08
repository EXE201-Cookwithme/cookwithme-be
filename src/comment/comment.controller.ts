import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Create comment' })
  createComment(
    @Param('userId') userId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.createComment(userId, createCommentDto);
  }

  @Get(':postId')
  @ApiOperation({ summary: 'Get comments by post id' })
  getCommentsByPostId(@Param('postId') postId: string) {
    return this.commentService.getCommentsByPostId(postId);
  }
}
