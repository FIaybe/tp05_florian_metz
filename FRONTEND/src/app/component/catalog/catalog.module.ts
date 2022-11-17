import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { DisplayCatalogComponent } from './catalog.component';
import { DetailsComponent } from './details/details.component';

const appChild: Routes = [
  {
    path: '',
    component: DisplayCatalogComponent,
  },
  {
    path: 'detail/:id',
    component: DetailsComponent,
  }
];

@NgModule({
  declarations: [
    DisplayCatalogComponent,
    DetailsComponent,
  ],
  imports: [
    RouterModule.forChild(appChild),
    CommonModule,
    MatDividerModule,
    MatCardModule,
    HttpClientModule,
    SearchBarModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class DisplayCatalogModule { }
