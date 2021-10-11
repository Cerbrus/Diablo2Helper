import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPaneDevComponent } from './tab-pane-dev.component';

describe('TabPaneDevComponent', () => {
  let component: TabPaneDevComponent;
  let fixture: ComponentFixture<TabPaneDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabPaneDevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPaneDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
