import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsLocationComponent } from './products-location/products-location.component';
import { DetailsComponent } from './details/details.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
// import { FirebaseService } from './services/firebase.service';
// import { getStorage} from '@angular/fire/storage'
// import { provideStorage } from '@angular/fire/storage';
import { SellitemformComponent } from './sellitemform/sellitemform.component';
import { NgForm } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat'
import {AngularFireStorageModule} from '@angular/fire/compat/storage'

@NgModule({

    declarations: [
    AppComponent,
    HomeComponent,
    ProductsLocationComponent,
    DetailsComponent,
    SellitemformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule .initializeApp(environment.firebase),
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)) ,
    provideAuth (() => getAuth ()),
    provideFirestore (() => getFirestore())
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }