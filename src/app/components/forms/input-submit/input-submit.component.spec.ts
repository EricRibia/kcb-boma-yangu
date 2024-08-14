import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSubmitComponent } from './input-submit.component';

describe('InputSubmitComponent', () => {
  let component: InputSubmitComponent;
  let fixture: ComponentFixture<InputSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
