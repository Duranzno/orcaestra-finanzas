import { NgModule } from '@angular/core';
import { IconHome, IconUsers,IconUser, IconPlusCircle, IconFileText,IconCalendar } from 'angular-feather';

const icons = [
  IconHome,
  IconUsers,
  IconUser,
  IconPlusCircle,
  IconFileText,
  IconCalendar
];

@NgModule({
  exports: icons
})
export class IconsModule { }