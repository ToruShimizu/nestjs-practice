import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
//** nestjs専用の関数にプロパティを渡して、返ってきたコンストラクタ関数を継承する */
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * jwtの設定
   */

  constructor() {
    super({
      //** jwtトークンがどこにあるか */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //** 有効期限が切れているトークンを有効にするか */
      ignoreExpiration: false,
      //** moduleにあるsecret */
      secretOrKey: 'secret',
    });
  }
  //** これは必須 */
  //** ここに到達している時点で、ある程度チェックは済んでいるため記述は少ない */
  async validate(payload: JwtPayload) {
    // ** @UseGuards(AuthGuard('jwt'))のハンドラーでreqで受け取れる */
    return payload;
  }
}
