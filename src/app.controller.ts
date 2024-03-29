import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  //** ベタで書くとこのようになる */
  // @Get('hello')
  // getHello() {
  //   const appService = new AppService()
  //   return appService.getHello()
  //   return 'hello'
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
//** serviceの＠Injectableとmoduleのprovidersにより内部的にはこうなっている */
// new AppController(new AppService());
