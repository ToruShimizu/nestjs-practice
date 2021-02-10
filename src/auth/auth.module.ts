import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    //** importして設定を入れておく */
    JwtModule.register({
      //** パスワードを暗号化する。本番環境では長くする。人に公開しない */
      secret: 'secret',
      //* 有効期限 */
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
  ],

  controllers: [AuthController],

  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
