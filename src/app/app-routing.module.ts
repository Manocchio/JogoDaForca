import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'game', loadChildren: './game/game.module#GamePageModule' },
  { path: 'game/:nome', loadChildren: './game/game.module#GamePageModule' },
  { path: 'sobre', loadChildren: './sobre/sobre.module#SobrePageModule' },
  { path: 'desenvolvedores', loadChildren: './desenvolvedores/desenvolvedores.module#DesenvolvedoresPageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  { path: 'final', loadChildren: './final/final.module#FinalPageModule' },
  { path: 'final/:resultado', loadChildren: './final/final.module#FinalPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
