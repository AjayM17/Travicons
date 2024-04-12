import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExcursionCheckoutPage } from './excursion-checkout.page';

describe('ExcursionCheckoutPage', () => {
  let component: ExcursionCheckoutPage;
  let fixture: ComponentFixture<ExcursionCheckoutPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExcursionCheckoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
