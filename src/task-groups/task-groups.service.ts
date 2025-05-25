import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskGroupDto } from './dto/create-task-group.dto';
import { UpdateTaskGroupDto } from './dto/update-task-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TaskGroup } from './entities/task-group.schema';
import { Model } from 'mongoose';
import { IUser } from 'src/users/user.interface';

@Injectable()
export class TaskGroupsService {
  constructor(
    @InjectModel(TaskGroup.name) private taskGroupModel: Model<TaskGroup>,
  ) {}

  async create(createTaskGroupDto: CreateTaskGroupDto, user: IUser) {
    const { name, icon_url } = createTaskGroupDto;

    const existsGroup = await this.taskGroupModel.findOne({
      name,
    });
    if (existsGroup)
      throw new ConflictException(`Group ${createTaskGroupDto.name} exists`);
    return await this.taskGroupModel.create({
      name,
      icon_url,
      userId: user._id,
    });
  }

  async findAll(limit: number, page: number) {
    return await this.taskGroupModel
      .find()
      .skip(limit * (page - 1))
      .limit(limit)
      .lean()
      .exec();
  }

  async findById(id: string) {
    const taskGroup = await this.taskGroupModel.findById(id);
    if (!taskGroup) throw new NotFoundException(`Not found Task Group ${id}`);
    return taskGroup;
  }

  async update(id: string, updateTaskGroupDto: UpdateTaskGroupDto) {
    const updatedTaskGroup = await this.taskGroupModel.findByIdAndUpdate(
      id,
      updateTaskGroupDto,
      { new: true },
    );
    if (!updatedTaskGroup)
      throw new NotFoundException(`Not found Task Group ${id}`);

    return updatedTaskGroup;
  }

  async remove(id: string) {
    const deletedTaskGroup = await this.taskGroupModel.findByIdAndDelete(id);
    if (!deletedTaskGroup)
      throw new NotFoundException(`Not found Task Group ${id}`);

    return deletedTaskGroup;
  }
}
