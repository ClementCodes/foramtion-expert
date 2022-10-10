import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import { MaterialModule } from './components/comments/material.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { highLightDirective } from './directives/highlight.directive';



@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipe,
    TimeAgoPipe,
    highLightDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommentsComponent,
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe,
    TimeAgoPipe,
    highLightDirective
  ]
})
export class SharedModule { }
