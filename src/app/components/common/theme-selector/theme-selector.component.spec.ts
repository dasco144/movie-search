import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { MockModule, MockService } from 'ng-mocks';
import { ThemeService } from '../../../services/theme.service';

import { ThemeSelectorComponent } from './theme-selector.component';

describe('ThemeSelectorComponent', () => {
  let component: ThemeSelectorComponent;
  let fixture: ComponentFixture<ThemeSelectorComponent>;

  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeSelectorComponent],
      imports: [
        MockModule(MatIconModule),
        MockModule(MatButtonModule),
        MockModule(MatMenuModule),
      ],
      providers: [
        { provide: ThemeService, useValue: MockService(ThemeService) },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSelectorComponent);

    themeService = TestBed.inject(ThemeService);
    spyOn(themeService, 'setTheme');

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load default theme', () => {
    expect(component.currentTheme).toEqual(component.themes[0]);
    expect(themeService.setTheme).toHaveBeenCalledWith(component.themes[0]);
  });

  it('should set theme on theme button click', () => {
    const themeButtons = fixture.debugElement.queryAll(
      By.directive(MatMenuItem)
    );

    themeButtons[1].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.currentTheme).toEqual(component.themes[1]);
    expect(themeService.setTheme).toHaveBeenCalledWith(component.themes[1]);

    themeButtons[2].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.currentTheme).toEqual(component.themes[2]);
    expect(themeService.setTheme).toHaveBeenCalledWith(component.themes[2]);

    themeButtons[3].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.currentTheme).toEqual(component.themes[3]);
    expect(themeService.setTheme).toHaveBeenCalledWith(component.themes[3]);
  });
});
