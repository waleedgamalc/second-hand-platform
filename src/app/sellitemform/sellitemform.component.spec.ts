import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellitemformComponent } from './sellitemform.component';

describe('SellitemformComponent', () => {
  let component: SellitemformComponent;
  let fixture: ComponentFixture<SellitemformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellitemformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellitemformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
