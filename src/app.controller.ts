import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  
  @Get()
  @Render('toDoForm.hbs')
  root() {
    return { 
      title: 'To Do Register',
      message: 'Please fill the fields below to register a new task',
      body: ``
   };
  }
   
}