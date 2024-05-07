/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';

import { find } from '../../../core/DependencyInjection';
import { HashProvider, hashProviderAlias } from '../../../providers/hash/HashProvider';
import { JwtProvider, jwtProviderAlias } from '../../../providers/jwt/JwtProvider';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'boolean', default: false })
  isOwner: boolean;

  static async generateAuthData(userId: string): Promise<UserAuthData> {
  	const jwtProvider = find<JwtProvider>(jwtProviderAlias);
  	return jwtProvider.generate({
  		subject: userId,
  	});
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  	const hashProvider = find<HashProvider>(hashProviderAlias);
  	return hashProvider.verify(password, hashedPassword);
  }
}

export type UserAuthData = {
	token: string;
	expInSecs: number;
}
