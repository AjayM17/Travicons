import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimReadMorePipe, ReturnFirstUrlPipe } from './cutom.pipe';


@NgModule({
  declarations: [TrimReadMorePipe,ReturnFirstUrlPipe],
  imports: [
    CommonModule
  ],
  exports: [TrimReadMorePipe,ReturnFirstUrlPipe]
})
export class PipeModule { }
