import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './post.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostRepository {
  constructor(@InjectModel('Post') private postModel: Model<Post>) {}

  async createPost(
    userId: string,
    image: string,
    createPostDto: CreatePostDto,
  ) {
    const post = await this.postModel.create({
      ...createPostDto,
      image,
      userId,
    });
    return post;
  }

  async getPosts() {
    const posts = await this.postModel.find().populate('categoryId');
    return posts;
  }

  async getPostById(id: string) {
    const post = await this.postModel.findById(id).populate('categoryId');

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async getPostByCategoryName(categoryName: string) {
    const posts = await this.postModel
      .find({
        categoryName: categoryName,
      })
      .populate('categoryId');

    return posts;
  }

  async deletePost(id: string) {
    const post = await this.postModel.findByIdAndDelete(id).exec();
    return post;
  }
}
