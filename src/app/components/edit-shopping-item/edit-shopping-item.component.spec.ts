import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShoppingItemComponent } from './edit-shopping-item.component';

describe('EditShoppingItemComponent', () => {
  let component: EditShoppingItemComponent;
  let fixture: ComponentFixture<EditShoppingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShoppingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShoppingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
