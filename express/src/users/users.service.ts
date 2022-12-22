import { UserModel } from '@prisma/client';
import { compare } from 'bcryptjs';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import { IUserService } from './users.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}

	public async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const existedUser = await this.usersRepository.find(email);

		if (existedUser) {
			return null;
		}

		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, +salt);

		return this.usersRepository.create(newUser);
	}

	public async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);

		if (!existedUser) {
			return false;
		}

		const user = new User(existedUser.email, existedUser.name, existedUser.password);

		return await user.comparePasswords(password);
	}

	public async getUserInfo(email: string): Promise<UserModel | null> {
		return await this.usersRepository.find(email);
	}
}
