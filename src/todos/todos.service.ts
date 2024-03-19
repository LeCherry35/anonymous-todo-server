import { Repository } from 'typeorm';
import { Todo } from './models/todo.entity';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private todosRepository: Repository<Todo>,
    ) {}

    async findOne(id: string): Promise<Todo> {
        return this.todosRepository.findOne({ where: { id } });
    }
    async findByBoard(boardId: string): Promise<Todo[]> {
        return this.todosRepository.find({ where: { boardId } });
    }

    async create(todo: Partial<Todo>): Promise<Todo> {
        const newTodo = this.todosRepository.create(todo);
        return this.todosRepository.save(newTodo);
    }

    async update(id: string, todo: Partial<Todo>): Promise<Todo> {
        await this.todosRepository.update( id , todo);
        return this.todosRepository.findOne({ where: { id } });
    }
    
    async delete(id: string): Promise<void> {
        await this.todosRepository.delete({ id });
    }
}
