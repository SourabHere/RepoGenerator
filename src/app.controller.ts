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
      let data=await this.appService.create_repo(code).then(data=>{
        return "Repository Created Succesfully!"
      })
      .catch(error=>{
        return "Error in Creating Repository, Maybe a repository exists with same name as 'new_repo'"
      })
      return data;
  }

}
