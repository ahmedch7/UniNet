import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { HomeDemoOneComponent } from './components/pages/home-demo-one/home-demo-one.component';
import { HomeDemoTwoComponent } from './components/pages/home-demo-two/home-demo-two.component';
import { AboutComponent } from './components/pages/about/about.component';
import { TeamComponent } from './components/pages/team/team.component';
import { AppointmentComponent } from './components/pages/appointment/appointment.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { ProjectsDetailsComponent } from './components/pages/projects-details/projects-details.component';
import { ServicesStyleOneComponent } from './components/pages/services-style-one/services-style-one.component';
import { ServicesStyleTwoComponent } from './components/pages/services-style-two/services-style-two.component';
import { ServicesDetailsComponent } from './components/pages/services-details/services-details.component';
import { BlogStyleOneComponent } from './components/pages/blog-style-one/blog-style-one.component';
import { BlogStyleTwoComponent } from './components/pages/blog-style-two/blog-style-two.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { ShopComponent } from './components/pages/shop/shop.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { ProductsDetailsComponent } from './components/pages/products-details/products-details.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PreloaderComponent,
    HomeDemoOneComponent,
    HomeDemoTwoComponent,
    AboutComponent,
    TeamComponent,
    AppointmentComponent,
    ProjectsComponent,
    ProjectsDetailsComponent,
    ServicesStyleOneComponent,
    ServicesStyleTwoComponent,
    ServicesDetailsComponent,
    BlogStyleOneComponent,
    BlogStyleTwoComponent,
    BlogDetailsComponent,
    ShopComponent,
    CartComponent,
    CheckoutComponent,
    ProductsDetailsComponent,
    ContactComponent,
    PricingComponent,
    FaqComponent,
    TestimonialsComponent,
    NotFoundComponent,
    SignInComponent,
    SignUpComponent,
    ComingSoonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
