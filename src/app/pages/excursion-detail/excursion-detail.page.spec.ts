import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExcursionDetailPage } from './excursion-detail.page';

describe('ExcursionDetailPage', () => {
  let component: ExcursionDetailPage;
  let fixture: ComponentFixture<ExcursionDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExcursionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
