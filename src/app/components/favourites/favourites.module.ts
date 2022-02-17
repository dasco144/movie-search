import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CommonComponentsModule } from '../common/common-components.module';
import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesComponent } from './favourites.component';

@NgModule({
  declarations: [FavouritesComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    FavouritesRoutingModule,
    CommonComponentsModule,
  ],
})
export class FavouritesModule {}
