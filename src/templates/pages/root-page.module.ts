import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {MaterialModule} from '../../../core/material.module';
import {AdminSettingsComponent} from './settings/admin-settings.component';
import {AdminRoutingModule} from './admin-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule, MaterialModule,
        AdminRoutingModule],
    exports: [AdminComponent],
    declarations: [AdminComponent, AdminSettingsComponent],
    providers: []
})
export class AdminModule {
}

export * from './admin.component';
