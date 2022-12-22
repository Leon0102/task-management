import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/services/task.service';

export interface Task {
  Task_ID: number;
  Task_Assigned_Employee_ID: number;
  Task_Owner_ID: number;
  Task_Subject: string;
  Task_Start_Date: Date;
  Task_Due_Date: Date;
  Task_Status: number;
  Task_Priority: number;
  Task_Completion: number;
  Task_Parent_ID: number;
}


@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {


  listPopupVisible = false;
  isTaskDetailVisible: boolean = false;
  isPopupVisible!: boolean;
  lists: any[] = [];
  tasks!: Task[];

  statuses: any[] = [];
  priorities: any[] = [1, 2, 3];
  employees: any = [];
  employeesInfo: any = [];
  taskDetails: any = {};

  constructor(public service: TaskService) {
    // const tasks = service.getTasks();
    // const lists = service.getLists();

    // service.getEmployees().forEach((employee: any) => {
    //   this.employees[employee.ID] = employee.Name;
    // });

    // this.statuses = lists.map((list: any) => list.text);

    // this.statuses.forEach((status) => {
    //   this.lists.push(tasks.filter((task: any) => task.Task_Status === status));
    // });

  }

  onListReorder(e: any) {
    const list = this.lists.splice(e.fromIndex, 1)[0];
    this.lists.splice(e.toIndex, 0, list);

    const status = this.statuses.splice(e.fromIndex, 1)[0];
    this.statuses.splice(e.toIndex, 0, status);
  }

  onTaskDragStart(e: any) {
    e.itemData = e.fromData[e.fromIndex];
  }

  onTaskDrop(e: any) {
    e.fromData.splice(e.fromIndex, 1);
    e.toData.splice(e.toIndex, 0, e.itemData);
  }

  deleteTask(taskId: any) {
    this.service.deleteTask(taskId).subscribe((data: any) => {
      console.log(data);
    });
    this.lists.forEach((list: any) => {
      list.forEach((task: any) => {
        if (task.id === taskId) {
          list.splice(list.indexOf(task), 1);
        }
      });
    });

  }

  deleteList(listId: number) {
    this.statuses.forEach((status, index) => {
      if (listId === status.id) {
        this.statuses.splice(index, 1);
        this.lists.splice(index, 1);
      }
    }
    );
    this.service.deleteList(listId).subscribe((data: any) => {
      console.log(data);
    });
  }

  toggleTaskDetail(task: Task): void {
    this.isTaskDetailVisible = !this.isTaskDetailVisible;
    this.taskDetails = task;
    console.log(this.taskDetails);
  }

  editTask(e: any): void {
    this.taskDetails = e;
    console.log(this.taskDetails);
  }

  listIdCurrent!: number;
  togglePopup(listId: number): void {
    console.log(listId);
    this.isPopupVisible = !this.isPopupVisible;
    this.listIdCurrent = listId;
  }


  listName: string = '';
  listColor: string = '';
  addList() {
    console.log(this.listName, this.listColor);
    const list = {
      text: this.listName,
      color: this.listColor
    }
    this.service.addNewList(list).subscribe((data: any) => {
      console.log(data);
      this.statuses.push(list.text);
    });
    window.location.reload();
    this.listPopupVisible = false;
  }

  taskSubject: string = '';
  taskStatus: string = '';
  taskPriority: string = '';
  taskAssignedEmployee: string = '';
  taskStartDate: any;
  taskDueDate: any;
  taskDescription: string = '';
  addNewTask() {
    const taskAssignedEmployee = this.employeesInfo.find((employee: any) => employee.Name === this.taskAssignedEmployee);
    const newTask = {
      // id: new Date().getTime(),
      Task_Subject: this.taskSubject,
      Task_Start_Date: this.taskStartDate,
      Task_Due_Date: this.taskDueDate,
      Task_Status: this.listIdCurrent,
      Task_Priority: this.taskPriority,
      Task_Assigned_Employee_ID: taskAssignedEmployee.ID,
      Task_Completion: 0,
      Task_Owner_ID: 1,
    };
    this.service.addNewTask(newTask).subscribe((data: any) => {
      console.log(data);
    });
    window.location.reload();
  }

  submitButtonOptions = {
    text: "Submit the Form",
    useSubmitBehavior: true
  }

  ngOnInit(): void {
    this.service.getEmployees().subscribe((data: any) => {
      data.forEach((employee: any) => {
        this.employeesInfo.push(employee);
        this.employees[employee.ID] = employee.Name;
      })
    });

    this.service.getLists().subscribe((data: any) => {
      this.statuses = data.map(function (list: any) {
        return {
          text: list.text,
          id: list.id
        }
      })
    });

    this.service.getTasks().subscribe((data: any) => {
      this.statuses.forEach((status: any) => {
        // console.log(status.text);
        this.lists.push(data.filter((task: any) => task.Task_Status === status.id));
      });
    });

    console.log(this.lists);
  }
}
