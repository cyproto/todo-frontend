import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guard/auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      LayoutModule,
      OverlayModule,
      HttpClientModule,
  ],
  providers: [ AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

