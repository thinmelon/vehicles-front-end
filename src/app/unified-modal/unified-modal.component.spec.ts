import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedModalComponent } from './unified-modal.component';

describe('UnifiedModalComponent', () => {
  let component: UnifiedModalComponent;
  let fixture: ComponentFixture<UnifiedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnifiedModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnifiedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
