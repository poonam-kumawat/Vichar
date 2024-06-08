import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsDashboardComponent } from './blogs-dashboard.component';

describe('BlogsDashboardComponent', () => {
  let component: BlogsDashboardComponent;
  let fixture: ComponentFixture<BlogsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
