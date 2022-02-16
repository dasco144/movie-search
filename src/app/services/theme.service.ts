import { Injectable } from '@angular/core';
import { Theme } from '../models/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly themeClass = 'theme-stylesheet';

  createStyleSheetEl() {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(this.themeClass);
    return linkEl;
  }

  setTheme(theme: Theme) {
    let linkEl = document.head.querySelector<HTMLLinkElement>(
      `.${this.themeClass}`
    );

    if (!linkEl) {
      linkEl = this.createStyleSheetEl();
      document.head.appendChild(linkEl);
    }

    linkEl.href = `assets/themes/${theme.name}.css`;
  }
}
