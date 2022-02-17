import { Component, OnInit } from '@angular/core';

import { Theme } from '../../../models/theme';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
})
export class ThemeSelectorComponent implements OnInit {
  currentTheme?: Theme;

  themes: Theme[] = [
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

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // TODO Load theme from local storage
    this.selectTheme(this.themes[0]);
  }

  selectTheme(theme: Theme) {
    this.currentTheme = theme;
    this.themeService.setTheme(this.currentTheme);
  }
}
