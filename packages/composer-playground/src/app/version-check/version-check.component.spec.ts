/* tslint:disable:no-unused-variable */
/* tslint:disable:no-unused-expression */
/* tslint:disable:no-var-requires */
/* tslint:disable:max-classes-per-file */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VersionCheckComponent } from './version-check.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'angular-2-local-storage';
import * as sinon from 'sinon';

describe('VersionCheckComponent', () => {
    let component: VersionCheckComponent;
    let fixture: ComponentFixture<VersionCheckComponent>;
    let debug: DebugElement;
    let element: HTMLElement;

    let storageBool: boolean;

    let ngbActiveModalMock = {
        close: sinon.stub(),
        dismiss: sinon.stub()
    };

    let localStorageServiceMock = {
        clearAll: () => {
            return storageBool;
        }
    };

    let reload;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VersionCheckComponent],
            providers: [{provide: NgbActiveModal, useValue: ngbActiveModalMock},
                {provide: LocalStorageService, useValue: localStorageServiceMock}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VersionCheckComponent);
        component = fixture.componentInstance;
        debug = fixture.debugElement.query(By.css('h1'));
        element = debug.nativeElement;

        fixture.detectChanges();
    });

    it('should create component', () => {
        component.should.be.ok;
    });

    it('should have correct title', () => {
        element.textContent.should.contain('Invalid version!');
    });

    it('should handle unsupported browser for clearLocalStorage', () => {
        storageBool = false;

        (() => {
            component.clearLocalStorage();
        }).should.throw(Error, 'Failed to clear local storage');

    });
});
