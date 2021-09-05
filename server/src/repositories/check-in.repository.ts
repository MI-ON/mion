import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { CheckInEntity } from '../entities';

@EntityRepository(CheckInEntity)
export class CheckInRepository extends BaseRepository<CheckInEntity> {}
