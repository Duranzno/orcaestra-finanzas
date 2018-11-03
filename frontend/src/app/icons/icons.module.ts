import { NgModule } from '@angular/core';
import { IconHome, IconUsers,IconUser, IconPlusCircle, IconFileText } from 'angular-feather';

const icons = [
  IconHome,
  IconUsers,
  IconUser,
  IconPlusCircle,
  IconFileText
];

@NgModule({
  exports: icons
})
export class IconsModule { }