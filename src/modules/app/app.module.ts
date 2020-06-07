import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '@config/database';
import { AuthModule } from '@auth-module/auth.module';
import { UserModule } from '@user-module/user.module';
import { TwoFactorModule } from '@twofactor-module/two-factor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UserModule,
    TwoFactorModule,
  ],
})
export class AppModule {}