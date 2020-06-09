import { Controller, Post, UseGuards, Req, UnprocessableEntityException, Body, ForbiddenException, HttpCode } from '@nestjs/common';
import { TwoFactorService } from '@twofactor-module/two-factor.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TwoFactorResponse } from '@utils/docs/two-factor-response.doc';
import { UserService } from '@user-module/user.service';
import { TwoFactorActivateDTO } from '@twofactor-module/dto/activate.dto';

@Controller('two-factor')
@ApiTags('Two Factor')
export class TwoFactorController {
  constructor(
    private readonly twoFactorService: TwoFactorService,
    private readonly userService: UserService,
  ) {}

  @Post('generate')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async generate(
    @Req() req,
  ): Promise<TwoFactorResponse> {
    const { user } = req;
    if (user.twoAuthEnabled) {
      throw new UnprocessableEntityException('Two-factor is already enabled, to generate it again, disable it');
    }
    const twoFactorGenerate = await this.twoFactorService.generate(user);
    await this.userService.setTwoAuthSecretKey(user.id, twoFactorGenerate.secret);
    return {
      data: {
        qrImage: twoFactorGenerate.qrImage,
        secret: twoFactorGenerate.secret,
      },
    };
  }

  @Post('activate')
  @ApiBearerAuth()
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  async activate(
    @Req() req,
    @Body() body: TwoFactorActivateDTO,
  ): Promise<void> {
    const { user } = req;
    if (!user.twoAuthKey) {
      throw new UnprocessableEntityException('Two-factor Key has not been generated');
    }
    const isValid = this.twoFactorService.validate(body.token, user.twoAuthKey);
    if (!isValid) {
      throw new ForbiddenException('Token is invalid');
    }
    await this.userService.enableOrDisableTwoFactor(user.id, true);
  }

  @Post('deactivate')
  @ApiBearerAuth()
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  async deactivate(
    @Req() req,
  ): Promise<void> {
    const { user } = req;
    if (!user.twoAuthEnabled) {
      throw new UnprocessableEntityException('Two-factor is not enabled');
    }
    await this.userService.enableOrDisableTwoFactor(user.id, false);
  }

  @Post('validate')
  @ApiBearerAuth()
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  async validate(
    @Req() req,
    @Body() body: TwoFactorActivateDTO,
  ): Promise<void> {
    const { user } = req;
    if (!user.twoAuthEnabled) {
      throw new UnprocessableEntityException('Two-factor is not enabled');
    }
    const isValid = this.twoFactorService.validate(body.token, user.twoAuthKey);
    if (!isValid) {
      throw new ForbiddenException('Token is invalid');
    }
  }
}