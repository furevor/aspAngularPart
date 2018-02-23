import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedNotesComponent } from './imported-notes.component';

describe('ImportedNotesComponent', () => {
  let component: ImportedNotesComponent;
  let fixture: ComponentFixture<ImportedNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportedNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
