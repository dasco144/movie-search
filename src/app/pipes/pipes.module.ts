import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MoviePosterPipe } from './movie-poster.pipe';

@NgModule({
  declarations: [MoviePosterPipe],
  imports: [CommonModule],
  exports: [MoviePosterPipe],
})
export class PipesModule {}
