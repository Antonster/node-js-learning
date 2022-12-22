import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
	public client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	public async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Database connected');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[PrismaService] Database connection failed: ' + e.message);
			}
		}
	}

	public async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
