import { Inject, Injectable } from '@nestjs/common';
import { Cacheable } from 'cacheable';

@Injectable()
export class CacheService {
    constructor(@Inject('CACHE_INSTANCE') private readonly cache: Cacheable) { }

    async get<T>(key: string): Promise<T | null> {
        const value = await this.cache.get(key);
        return value as T;
    }

    async set<T>(key: string, value: T, ttl?: number | string): Promise<void> {
        await this.cache.set(key, value, ttl);
    }

    async delete(key: string): Promise<void> {
        await this.cache.delete(key);
    }
}