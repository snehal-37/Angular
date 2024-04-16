import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { EdituserService } from '../services/edituser.service';
import { EditdialogComponent } from '../editdialog/editdialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    MatDialogModule,
    EditdialogComponent,
    FormsModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  userDetails: any;
  users!: any;
  url: string = '../assets/user.png';
  inputEmail: string = '';
  maxSizeMB = 5;

  constructor(
    private dialog: MatDialog,
    private ed: EdituserService,
    private route: ActivatedRoute
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(EditdialogComponent, {
      width: '600px',
      height: '900px',
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
  }
  getUserDetails() {
    this.ed.getUserDetails().subscribe((data) => {
      this.userDetails = data[0];
    });
  }
  getImageData(): string | ArrayBuffer | null {
    return this.ed.getImageData();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.size > this.maxSizeMB * 310 * 325) {
        alert(`File size exceeds ${this.maxSizeMB}MB limit.`);
        return;
      }
      const reader = new FileReader();

      reader.onload = () => {
        const imageData = reader.result;
        this.ed.setImageData(imageData);
      };
      reader.readAsDataURL(file);
    }
  }
}
