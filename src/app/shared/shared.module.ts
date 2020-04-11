import { NgModule } from "@angular/core";
import { MaterialModule } from '../materials-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  FlexLayoutModule,
]
@NgModule({
  imports: modules,
  exports: modules
})
export class SharedModule {}