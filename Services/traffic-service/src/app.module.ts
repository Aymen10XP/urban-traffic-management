import { Module } from '@nestjs/common';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TrafficModule } from './traffic/traffic.module';
import { TrafficZone } from './traffic/entities/traffic-zone.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'postgres'),
        port: Number(configService.get('DATABASE_PORT', 5432)),
        username: configService.get('DATABASE_USER', 'admin'),
        password: configService.get('DATABASE_PASSWORD', 'admin123'),
        database: configService.get('DATABASE_NAME', 'traffic_management'),
        entities: [TrafficZone],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET', 'secretKey'),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'src/schema.gql'),
      },
    }),
    TrafficModule,
  ],
})
export class AppModule {}
