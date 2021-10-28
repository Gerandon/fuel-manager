import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVehiclesComponent } from './my-vehicles.component';

describe('MyVehiclesComponent', () => {
  let component: MyVehiclesComponent;
  let fixture: ComponentFixture<MyVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyVehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
