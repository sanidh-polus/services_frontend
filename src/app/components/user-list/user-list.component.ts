import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { User } from './User';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [NgFor, NgIf],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.css'
})

export class UserListComponent {
    
    @Input() users: User[] = [];
    @Input() userRole: string = '';
    @Output() selectedUser = new EventEmitter<any>();

    public onUserSelect(userId: number): void {
        this.selectedUser.emit(userId); 
    }
}
