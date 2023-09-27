import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../app.module';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  sortedUsers: string = 'asc';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => (this.users = data.users));
  }

  handleDelete(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  handleSort(type: keyof User): void {
    this.users.sort((a, b) => (a[type] > b[type] ? 1 : -1));
    if (this.sortedUsers === 'desc') {
      this.users.reverse();
    }
    this.sortedUsers = this.sortedUsers === 'asc' ? 'desc' : 'asc';
  }
}
