import { Injectable } from '@angular/core';
import { Theme } from '../models/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeClass = 'theme-stylesheet';

  private createStyleSheetEl() {
    // Create the link element with the themeClass class so it can be retrieved later
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(this.themeClass);
    return linkEl;
  }

  setTheme(theme: Theme) {
    // Get the link element created in the element above
    let linkEl = document.head.querySelector<HTMLLinkElement>(
      `.${this.themeClass}`
    );

    if (!linkEl) {
      // If it doesn't exist then call the above method and append the element to the head element
      linkEl = this.createStyleSheetEl();
      document.head.appendChild(linkEl);
    }

    // Set the href of the link element to point to the new theme
    linkEl.href = `assets/themes/${theme.name}.css`;
  }
}
