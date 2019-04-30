import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UnifiedModalComponent} from './unified-modal/unified-modal.component';
import {IndexComponent} from './index/index.component';
import {LoginGuard} from './services/authentication.service';
import {BackboneService} from './services/backbone.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
    declarations: [
        AppComponent,
        UnifiedModalComponent,
        IndexComponent,
        RegisterComponent
    ],
    entryComponents: [
        UnifiedModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule
    ],
    providers: [
        LoginGuard,
        BackboneService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
