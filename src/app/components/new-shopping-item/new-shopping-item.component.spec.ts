import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShoppingItemComponent } from './new-shopping-item.component';

describe('NewShoppingItemComponent', () => {
  let component: NewShoppingItemComponent;
  let fixture: ComponentFixture<NewShoppingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewShoppingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShoppingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
