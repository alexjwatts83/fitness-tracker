import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UiService {
  private loadingStateChanged = new Subject<boolean>();
  private isLoadintState: boolean;

  constructor(private snackBar: MatSnackBar){

  }

  getLoadingState() {
    return this.isLoadintState;
  }

  getLoadingStateSubject() {
    return this.loadingStateChanged;
  }

  startLoading(){
    this.setLoadingState(true);
    console.log('startLoading');
  }

  finishedLoading(){
    this.setLoadingState(false);
    console.log('finishedLoading');
  }

  private setLoadingState(isLoading: boolean){
    this.isLoadintState = isLoading;
    this.loadingStateChanged.next(isLoading);
  }

  openSnackBar(message: string, action: string = null, duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}