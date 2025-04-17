import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorDetailDialogsComponent } from './director-detail-dialogs.component';

describe('DirectorDetailDialogsComponent', () => {
  let component: DirectorDetailDialogsComponent;
  let fixture: ComponentFixture<DirectorDetailDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectorDetailDialogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorDetailDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
