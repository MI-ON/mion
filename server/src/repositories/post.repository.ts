import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { PostEntity } from '../entities';

export interface IPostSumModel extends PostEntity {
  sum: number;
}

@EntityRepository(PostEntity)
export class PostRepository extends BaseRepository<PostEntity> {
  public async countByName(storeName: string): Promise<number> {
    return this.count({ storeName });
  }

  public async totalRatingByName(storeName: string): Promise<number> {
    const { sum } = await this.createQueryBuilder().select('SUM(rating)', 'sum').where({ storeName }).getRawOne();
    return sum || 0;
  }
}
