import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCreateionComponent } from './blog-createion.component';

describe('BlogCreateionComponent', () => {
  let component: BlogCreateionComponent;
  let fixture: ComponentFixture<BlogCreateionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogCreateionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogCreateionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
