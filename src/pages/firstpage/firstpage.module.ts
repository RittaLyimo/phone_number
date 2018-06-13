import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstpagePage } from './firstpage';

@NgModule({
  declarations: [
    FirstpagePage,
  ],
  imports: [
    IonicPageModule.forChild(FirstpagePage),
  ],
})
export class FirstpagePageModule {}
