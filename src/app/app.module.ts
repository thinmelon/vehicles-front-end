import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UnifiedModalComponent} from './unified-modal/unified-modal.component';
import {IndexComponent} from './index/index.component';
import {LoginGuard} from './services/authentication.service';
import {BackboneService} from './services/backbone.service';


@NgModule({
    declarations: [
        AppComponent,
        UnifiedModalComponent,
        IndexComponent
    ],
    entryComponents: [
        UnifiedModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
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
