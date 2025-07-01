import { Module } from '@nestjs/common';
import { Cacheable } from 'cacheable';
import { createKeyv } from '@keyv/redis';
import { CacheService } from './cache.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    providers: [
        {
            provide: 'CACHE_INSTANCE',
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const redisUrl = `redis://:${configService.get('REDIS_PASSWORD')}@${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`;
                console.log('redisUrl', redisUrl);
                const primary = createKeyv({
                    url: redisUrl,
                });
                return new Cacheable({
                    primary, ttl: '4h'
                });
            },
        },
        CacheService,
    ],
    exports: ['CACHE_INSTANCE', CacheService],
})
export class CacheModule { }