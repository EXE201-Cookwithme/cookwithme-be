import { BadRequestException, Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { CreatePostDto } from './dto/create-post.dto';
import { v4 as uuid } from 'uuid';
@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private configService: ConfigService,
  ) {}
  private readonly s3 = new S3Client({
    credentials: {
      accessKeyId: this.configService.get<string>('ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>('SECRET_KEY'),
    },
    region: this.configService.get<string>('BUCKET_REGION'),
  });

  async createPost(
    userId: string,
    createPostDto: CreatePostDto,
    image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('No image uploaded');
    }
    const Key: string = `${uuid()}-${image.originalname}`;
    const Bucket = this.configService.get<string>('BUCKET_NAME');
    const ContentType = image.mimetype;
    const command = new PutObjectCommand({
      Bucket,
      Key,
      Body: image.buffer,
      ContentType,
    });
    const fileStatus = await this.s3.send(command);
    if (fileStatus.$metadata.httpStatusCode === 200) {
      const video = await this.postRepository.createPost(
        userId,
        Key,
        createPostDto,
      );
      return { data: video, message: 'Video uploaded successfully' };
    }
  }

  async getPosts() {
    const posts = await this.postRepository.getPosts();
    return { data: posts, message: 'Posts fetched successfully' };
  }

  async getPostByCategoryId(categoryId: string) {
    const posts = await this.postRepository.getPostByCategoryId(categoryId);
    return { data: posts, message: 'Posts fetched successfully' };
  }

  async getPostById(id: string) {
    const post = await this.postRepository.getPostById(id);
    return { data: post, message: 'Post fetched successfully' };
  }
}
