import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesComponent } from './favourites.component';
import { CommonComponentsModule } from '../common/common-components.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
