import { Injectable } from '@nestjs/common';
import { CheckInRepository, PostRepository } from '@repositories';
import { PostEntity } from '@/entities';
import { Equal, Like } from 'typeorm';

@Injectable()
export class PostResolverService {
  constructor(private readonly postRepository: PostRepository, private readonly checkInRepository: CheckInRepository) {}

  public getDate(isToday: boolean): string {
    let date = new Date();
    if (!isToday) {
      date = new Date(date.setDate(date.getDate() + 1));
    }
    const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    return formatDate;
  }

  public async getPosts(keyword: string): Promise<PostEntity[]> {
    return this.postRepository.find({
      where: [
        { storeName: Equal(`${keyword}`) },
        { storeName: Like(`%${keyword}%`) },
        { categoryName: Like(`%${keyword}%`) },
      ],
    });
  }

  public async getSubInfo(storeName: string): Promise<{ count: number; sum: number }> {
    const count = await this.postRepository.count({ storeName });
    const sum = await this.postRepository.totalRatingByName(storeName);

    return {
      count,
      sum: Number(sum),
    };
  }

  public async addPost(
    storeName: string,
    categoryName: string,
    email: string,
    content: string,
    rating: number,
  ): Promise<boolean> {
    const today = new Date().setHours(0, 0, 0, 0);
    try {
      const checkIn = await this.checkInRepository.findOne({
        storeName,
        email,
        checkedInAt: today,
      });
      if (!checkIn) {
        throw new Error('Not checked in yet');
      }
      await this.postRepository.save({
        storeName,
        categoryName,
        email,
        content,
        rating,
      });
      return true;
    } catch {
      return false;
    }
  }

  public async deletePost(id: number): Promise<boolean> {
    try {
      const post = await this.postRepository.findOne({ id });
      if (!post) {
        throw new Error('Post not exists');
      }

      await this.postRepository.delete({ id });
      return true;
    } catch {
      return false;
    }
  }

  public async updatePost(id: number, content: string, rating: number): Promise<boolean> {
    try {
      const post = await this.postRepository.findOne({ id });
      if (!post) {
        throw new Error('Post not exists');
      }

      await this.postRepository.save({
        ...post,
        content,
        rating,
      });
      return true;
    } catch {
      return false;
    }
  }
}
