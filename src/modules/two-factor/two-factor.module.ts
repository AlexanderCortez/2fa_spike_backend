import { Module } from '@nestjs/common';
import { TwoFactorController } from '@twofactor-module/two-factor.controller';
import { TwoFactorService } from '@twofactor-module/two-factor.service';
import { UserService } from '@user-module/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [TwoFactorController],
  providers: [TwoFactorService, UserService]
})
export class TwoFactorModule {}