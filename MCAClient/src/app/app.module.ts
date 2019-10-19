import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MaterialModule } from './material-module/material-module.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventsComponent } from './events/events.component';
import { EventsTabsComponent } from './events-tabs/events-tabs.component';
import { MatTabsModule, MatDialogModule } from '@angular/material';
import { MDBBootstrapModule, ChartsModule, BaseChartDirective } from 'angular-bootstrap-md';
import { CountryGraphComponent } from './graphs/country-graph/country-graph.component';
import { YearGraphComponent } from './graphs/year-graph/year-graph.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { UsersComponent } from './users/users.component';
import { OverviewComponent } from './overview/overview.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    EventsComponent,
    EventsTabsComponent,
    YearGraphComponent,
    CountryGraphComponent,
    EventEditComponent,
    UsersComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    LayoutModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    FormsModule,
    NgbModule,
    ChartsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [HttpClient],
  entryComponents:[EventEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
