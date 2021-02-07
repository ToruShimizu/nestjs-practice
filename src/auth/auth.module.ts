import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      /** 本番環境では長くする。人に公開しない */
      secret: 'secret',
      /** 有効期限 */
      signOptions: {},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
