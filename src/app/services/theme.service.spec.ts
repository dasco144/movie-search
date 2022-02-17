import { TestBed } from '@angular/core/testing';

import { Theme } from '../models/theme';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    document.head.querySelector('.theme-stylesheet')?.remove();
  });

  it('should create link and append it to the head element with the with the theme provided', () => {
    // Check that there is not theme link element already
    expect(
      document.head.querySelector<HTMLLinkElement>('.theme-stylesheet')
    ).toBeNull();

    const theme: Theme = {
      name: 'theme',
      displayName: 'Theme',
    };

    service.setTheme(theme);

    const linkEl =
      document.head.querySelector<HTMLLinkElement>('.theme-stylesheet');

    if (!linkEl) {
      fail('Theme link element was not found');
      return;
    }

    // Check that the theme link href is updated
    expect(linkEl.href).toContain(`assets/themes/${theme.name}.css`);
  });

  it('should update existing link head element with the with the theme provided', () => {
    const theme: Theme = {
      name: 'theme',
      displayName: 'Theme',
    };

    service.setTheme(theme);

    const newTheme: Theme = {
      name: 'new-theme',
      displayName: 'New Theme',
    };

    service.setTheme(newTheme);

    let linkEl =
      document.head.querySelector<HTMLLinkElement>('.theme-stylesheet');

    if (!linkEl) {
      fail('Theme link element was not found');
      return;
    }

    // Check that the theme link href is updated
    expect(linkEl.href).toContain(`assets/themes/${newTheme.name}.css`);
  });
});
