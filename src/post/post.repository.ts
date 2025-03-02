import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { remove as removeDiacritics } from 'diacritics';
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

  async getPosts(categoryName: string, keyword: string) {
    const filter: Record<string, any> = {};

    if (keyword) {
      const keywordUnaccent = removeDiacritics(keyword).toLowerCase();
      filter.titleUnaccent = { $regex: keywordUnaccent, $options: 'i' };
    }

    if (categoryName) {
      filter.categoryName = categoryName;
    }

    const posts = await this.postModel.find(filter).populate('categoryId');
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

  async updateExistingPosts() {
    const posts = await this.postModel.find();
    for (const post of posts) {
      post.titleUnaccent = removeDiacritics(post.title).toLowerCase();
      await post.save();
    }
    console.log('Updated all posts with unaccented titles.');
  }
}
