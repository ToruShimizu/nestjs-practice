import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // @Get('hello') 
  // getHello() {
  //   const appService = new AppService()
  //   return appService.getHello()
  //   return 'hello'
  constructor(private readonly appService: AppService) {

  }
  }
  // constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
new AppController(new AppService())