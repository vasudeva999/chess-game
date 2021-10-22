import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChessComponent } from './components/chess/chess.component';
import { WinComponent } from './components/win/win.component';

const routes: Routes = [
  {path: "", component: ChessComponent},
  {path: "win/:player", component: WinComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [
  ChessComponent,
  WinComponent
]
