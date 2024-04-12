import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'vehicle-list',
    loadChildren: () => import('./pages/vehicle-list/vehicle-list.module').then( m => m.VehicleListPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'excursion-detail/:slug',
    loadChildren: () => import('./pages/excursion-detail/excursion-detail.module').then( m => m.ExcursionDetailPageModule)
  },
  {
    path: 'excursion-checkout',
    loadChildren: () => import('./pages/excursion-checkout/excursion-checkout.module').then( m => m.ExcursionCheckoutPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
