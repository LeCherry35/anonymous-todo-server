import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './models/todo.entity';

@Controller('api/todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get(':boardId')
    async find(@Param('boardId') boardId:string): Promise<Todo[]> {
        return this.todosService.findByBoard(boardId);
    }

    @Post()
    async create(@Body() todo: Todo): Promise<Todo> {
        const newTodo = await this.todosService.create(todo);
        return newTodo;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
        
        const updatedTodo = await this.todosService.update(id, todo);
        if (!updatedTodo) {
            throw new NotFoundException('Todo not found');
        }
        return updatedTodo;
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<any> {
        console.log('id', id);

        
        const todo = await this.todosService.findOne(id);
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        await this.todosService.delete(id);
        return { message: 'Todo deleted'}
    }
}
