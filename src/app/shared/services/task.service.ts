import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';

@Injectable()
export class TaskService {

    private tasks: any;
    private lists: any;
    private employees: any;

    constructor(
        private http: HttpClient,
    ) { }


    getTasks() {
        return this.http.get('http://localhost:3000/tasks').pipe(delay(500))
    }

    getLists() {
        return this.http.get('http://localhost:3000/lists').pipe(delay(500))
    }

    addNewList(list: any) {
        return this.http.post('http://localhost:3000/lists', list).pipe(delay(500))
    }

    deleteList(listId: number) {
        return this.http.delete(`http://localhost:3000/lists/${listId}`)
    }

    addNewTask(task: any) {
        return this.http.post('http://localhost:3000/tasks', task)
    }

    deleteTask(taskId: any) {
        return this.http.delete(`http://localhost:3000/tasks/${taskId}`)
    }

    getEmployees() {
        return this.http.get('http://localhost:3000/employees')
    }
}
