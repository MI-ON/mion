import { Injectable } from '@nestjs/common';
import { UserRepository } from '@repositories/user.repository';
import { UserEntity } from '@/entities';
import { StoreResolverService } from '@graphql/resolvers/stores/stores.resolver.service';
import { In } from 'typeorm';

@Injectable()
export class UserResolverService {
  constructor(private readonly userRepository: UserRepository, private readonly store: StoreResolverService) {}

  public async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ email });
  }

  public async getVotedUsersByStoreName(storeName: string): Promise<UserEntity[]> {
    const emailList = await this.store.getVotedStoreUserEmailList(storeName);
    return this.userRepository.find({ email: In(emailList) });
  }

  public async register(email: string, fullName: string, avatarUrl: string): Promise<UserEntity> {
    return this.userRepository.save({
      email,
      fullName,
      avatarUrl,
    });
  }

  public async addFullName(email: string, fullName: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      user.fullName = fullName;
      return this.userRepository.save(user);
    }
    return user;
  }
}
