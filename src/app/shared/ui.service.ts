import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UiService {
  constructor(private snackBar: MatSnackBar){}

  openSnackBar(message: string, action: string = null, duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}