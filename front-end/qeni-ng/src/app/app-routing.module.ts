import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { AddVoitureComponent } from './components/pages/add-voiture/add-voiture/add-voiture.component';
import { AppointmentComponent } from './components/pages/appointment/appointment.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { BlogStyleOneComponent } from './components/pages/blog-style-one/blog-style-one.component';
import { BlogStyleTwoComponent } from './components/pages/blog-style-two/blog-style-two.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { DashbordComponent } from './components/pages/dashbord/dashbord.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { HomeDemoOneComponent } from './components/pages/home-demo-one/home-demo-one.component';
import { HomeDemoTwoComponent } from './components/pages/home-demo-two/home-demo-two.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { PreodreComponent } from './components/pages/preordre/preodre/preodre.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { ProductsDetailsComponent } from './components/pages/products-details/products-details.component';
import { ProjectsDetailsComponent } from './components/pages/projects-details/projects-details.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { ServicesDetailsComponent } from './components/pages/services-details/services-details.component';
import { ServicesStyleOneComponent } from './components/pages/services-style-one/services-style-one.component';
import { ServicesStyleTwoComponent } from './components/pages/services-style-two/services-style-two.component';
import { ShopComponent } from './components/pages/shop/shop.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { TeamComponent } from './components/pages/team/team.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { UpdateVoitureComponent } from './components/pages/update-voiture/update-voiture.component';
import { VoituresComponent } from './components/pages/voitures/voitures.component';

const routes: Routes = [
    //{path: '', component: HomeDemoOneComponent},
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    {path:'dashbord',component:DashbordComponent},
    {path: 'home', component: HomeDemoTwoComponent},
    {path: 'about', component: AboutComponent},
    {path: 'team', component: TeamComponent},
    {path: 'appointment/:id', component: AppointmentComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'projects-details', component: ProjectsDetailsComponent},
    {path: 'forgotPassword', component: ForgotPasswordComponent},
    {path: 'faq', component: FaqComponent},
    // {path: 'testimonials', component: TestimonialsComponent},
    {path: 'sign-in', component: SignInComponent},
    {path:'add-voiture',component: AddVoitureComponent},
    {path:'preodre/:id',component:PreodreComponent},
    {path:'update-voiture/:id',component:UpdateVoitureComponent},
    {path:'voitures',component:VoituresComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'coming-soon', component: ComingSoonComponent},
    {path: 'services-1', component: ServicesStyleOneComponent},
    {path: 'services-2', component: ServicesStyleTwoComponent},
    {path: 'service-details', component: ServicesDetailsComponent},
    {path: 'resetPassword/:id', component: ResetPasswordComponent},
    // {path: 'blog-2', component: BlogStyleTwoComponent},
    // {path: 'blog-details', component: BlogDetailsComponent},
    {path: 'shop', component: ShopComponent},
    {path: 'cart', component: CartComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'products-details', component: ProductsDetailsComponent},
    {path: 'contact', component: ContactComponent},
    // Here add new pages component

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }