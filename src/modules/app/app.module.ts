import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '@config/database';
import { AuthModule } from '@auth-module/auth.module';
import { UserModule } from '@user-module/user.module';
import { TwoFactorModule } from '@twofactor-module/two-factor.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UserModule,
    TwoFactorModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../../', 'client'),
    }),
  ],
})
export class AppModule {}