import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ionStarOutline, ionStarSharp } from '@ng-icons/ionicons';
import { NgIconsModule } from '@ng-icons/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgIconsModule.withIcons({ ionStarOutline, ionStarSharp }),
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
