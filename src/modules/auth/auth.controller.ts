import { Controller, UseGuards, Post, Request, Body, ConflictException, HttpCode, Req } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '@auth-module/auth.service';
import { AuthBodyDTO } from '@auth-module/dto/auth-body.dto';
import { UserService } from '@user-module/user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from '@user-module/dto/user.dto';
import { LoginResponse } from '@utils/docs/login-response.doc';
import { SignUpResponse } from '@utils/docs/signup-response.doc';
import { User } from '@entities/user.entity';
import { CheckSessionResponse } from '@utils/docs/check-session.response.doc';
import { plainToClass } from 'class-transformer';
import { UserDoc } from '@utils/docs/user.doc';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @ApiOperation({
    description: 'Use this endpoint if you want to sign in',
    summary: 'Sign In',
  })
  @ApiBody({ type: AuthBodyDTO })
  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  async signIn(
    @Request() req,
  ): Promise<LoginResponse> {
    const { accessToken } = await this.authService.signIn(req.user);
    return {
      data: {
        user: req.user,
        accessToken,
      }
    }
  }

  @ApiOperation({
    description: 'Use this endpoint if you want to sign up',
    summary: 'Sign Up',
  })
  @Post('/signup')
  async signup(
    @Body() user: UserDTO,
  ): Promise<SignUpResponse> {
    const userMatch: User = await this.userService.findByEmail(user.email);
    if (userMatch) {
      throw new ConflictException(`User with email ${user.email} already exists`);
    }
    const newUser = await this.userService.create(user);
    return {
      data: newUser,
    };
  }

  @ApiOperation({
    description: 'Use this endpoint to chech the session',
    summary: 'Check Token',
  })
  @ApiBearerAuth()
  @Post('/check-session-token')
  @UseGuards(AuthGuard('jwt'))
  async checkSessionToken(
    @Req() req,
  ): Promise<CheckSessionResponse> {
    return {
      data: plainToClass(UserDoc, req.user, { excludeExtraneousValues: true }),
    };
  }
}