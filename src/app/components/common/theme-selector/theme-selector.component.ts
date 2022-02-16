import { Component } from '@angular/core';
import { Theme } from '../../../models/theme';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
})
export class ThemeSelectorComponent {
  currentTheme?: Theme;

  themes = [
    {
      name: 'deeppurple-amber',
      displayName: 'Deep Purple & Amber',
    },
    {
      name: 'indigo-pink',
      displayName: 'Indigo & Pink',
    },
    {
      name: 'pink-bluegrey',
      displayName: 'Pink & Blue-grey',
    },
    {
      name: 'purple-green',
      displayName: 'Purple & Green',
    },
  ];

  constructor(private themeService: ThemeService) {
    // TODO Load theme from local storage
    this.currentTheme = this.themes[0];
  }

  selectTheme(themeName: string) {
    const theme = this.themes.find(
      (currentTheme) => currentTheme.name === themeName
    );

    if (!theme) {
      return;
    }

    this.currentTheme = theme;

    this.themeService.setTheme(this.currentTheme);
  }
}
