import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritePageRoutingModule } from './favorite-routing.module';

import { FavoritePage } from './favorite.page';
import { NgIconsModule } from '@ng-icons/core';
import { ionStarOutline, ionStarSharp } from '@ng-icons/ionicons';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritePageRoutingModule,
    NgIconsModule.withIcons({ ionStarOutline, ionStarSharp }),
  ],
  declarations: [FavoritePage]
})
export class FavoritePageModule {}
