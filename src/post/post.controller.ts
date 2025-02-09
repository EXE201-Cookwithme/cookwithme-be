import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  // @Post(':userId')
  // @ApiOperation({ summary: 'Create post' })
  // @ApiParam({ name: 'userId', type: 'string' })
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       title: {
  //         type: 'string',
  //         default: 'this is title',
  //       },
  //       description: {
  //         type: 'string',
  //         default: 'the action of providing or supplying something for use.',
  //       },
  //       author: {
  //         type: 'string',
  //         default: 'this is summary',
  //       },
  //       categoryId: {
  //         type: 'string',
  //         default: 'this is summary',
  //       },
  //       images: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //       links:{
  //         type: 'string',
  //       }
  //     },
  //     required: ['title', 'description', 'content', 'categoryId', 'image'],
  //   },
  // })
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     fileFilter: (req: any, file: Express.Multer.File, callback: Function) => {
  //       // Kiểm tra định dạng file ảnh
  //       if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp)$/)) {
  //         return callback(
  //           new BadRequestException(
  //             'Only image files (jpeg, png, gif, webp) are allowed!',
  //           ),
  //           false,
  //         );
  //       }
  //       callback(null, true);
  //     },
  //   }),
  // )
  // createPost(
  //   @Body() createPostDto: CreatePostDto,
  //   @Param('userId') userId: string,
  //   @UploadedFile() image: Express.Multer.File,
  // ) {
  //   return this.postService.createPost(userId, createPostDto, image);
  // }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  async getPosts() {
    return this.postService.getPosts();
  }

  @Get('category/:categoryName')
  @ApiOperation({ summary: 'Get posts by categoryName' })
  async getPostByCategoryId(@Param('categoryName') categoryName: string) {
    return this.postService.getPostByCategoryId(categoryName);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by id' })
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }
}
