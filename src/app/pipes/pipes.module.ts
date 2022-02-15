import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviePosterPipe } from './movie-poster.pipe';

@NgModule({
  declarations: [MoviePosterPipe],
  imports: [CommonModule],
  exports: [MoviePosterPipe],
})
export class PipesModule {}
