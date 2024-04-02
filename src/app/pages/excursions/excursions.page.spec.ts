import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExcursionsPage } from './excursions.page';

describe('ExcursionsPage', () => {
  let component: ExcursionsPage;
  let fixture: ComponentFixture<ExcursionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExcursionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
