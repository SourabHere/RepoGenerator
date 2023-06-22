import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index.ejs')
  async root() {
    return {}
  }

  // making route for "/api/auth/github" where we will recieve the code as query
  @Get("/api/auth/github")
  async start_code(@Query() query: { code: string,path:string }){
    const code = query.code;
    // console.log(code);
    try{
      await this.appService.create_repo(code);
      return "Repository Created Succesfully!"

    }
    catch(err){
      console.log(err);
      return err;
    }
  }

}
