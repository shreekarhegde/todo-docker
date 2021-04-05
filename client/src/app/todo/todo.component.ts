import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  todoText: string = "";
  todoList: any = [];
  isTodoListEmpty = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.isTodoListEmpty = true;
    this.updateList();
  }

  onAddTodoText() {
    if (this.todoText) {
      console.log("adding the todoText - ", this.todoText);
      let todoObj = {
        text: this.todoText,
        isCompleted: false,
        buttonText: "Done",
      };

      this.httpService.postRequest("/todo", todoObj, {}).subscribe(
        (res) => {
          console.log("res: todo added", res);
          this.updateList();
        },
        (err) => {
          console.log("err: post", err);
        }
      );
    }
  }

  updateList() {
    this.httpService.getRequest("/todo", {}).subscribe(
      (res: any) => {
        this.todoList = res.data;
        this.todoText = "";
        this.isTodoListEmpty = false;
      },
      (err) => {
        console.log("err: something went wrong", err);
      }
    );
  }

  onClearTodoText() {
    console.log("clearing the todoList - ", this.todoList);
    this.httpService.deleteRequest("/todo", {}).subscribe(
      (res) => {
        console.log("res: delete", res);
        this.todoList = [];
      },
      (err) => {
        console.log("err: delete", err);
      }
    );
  }

  onCompletingTask(todoId: any) {
    let obj = this.todoList.find((todo) => todo._id === todoId);
    if (obj.isCompleted) {
      const patchObj = {
        buttonText: "Done",
        isCompleted: false,
      };
      this.httpService.patchRequest(`/todo/${todoId}`, patchObj, {}).subscribe(
        (res) => {
          console.log("patch res", res);
          this.updateList();
        },
        (err) => {
          console.log("patch err", err);
        }
      );
    } else {
      const patchObj = {
        buttonText: "Undone",
        isCompleted: true,
      };
      this.httpService.patchRequest(`/todo/${todoId}`, patchObj, {}).subscribe(
        (res) => {
          console.log("patch res", res);
          this.updateList();
        },
        (err) => {
          console.log("err update", err);
        }
      );
    }
  }
}
