import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TaskGroupsService } from './task-groups.service';
import { CreateTaskGroupDto } from './dto/create-task-group.dto';
import { UpdateTaskGroupDto } from './dto/update-task-group.dto';
import { IUser } from 'src/users/user.interface';
import { User } from 'src/decorators/user.decorator';

@Controller('task-groups')
export class TaskGroupsController {
  constructor(private readonly taskGroupsService: TaskGroupsService) {}

  @Post()
  create(@Body() createTaskGroupDto: CreateTaskGroupDto, @User() user: IUser) {
    return this.taskGroupsService.create(createTaskGroupDto, user);
  }

  @Get()
  findAll(@Query('limit') limit: string, @Query('page') page: string) {
    const limitNumber = parseInt(limit) || 10;
    const pageNumber = parseInt(page) || 1;
    return this.taskGroupsService.findAll(limitNumber, pageNumber);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.taskGroupsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskGroupDto: UpdateTaskGroupDto,
  ) {
    return this.taskGroupsService.update(id, updateTaskGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskGroupsService.remove(id);
  }
}
