import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockModule } from 'ng-mocks';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { CommonComponentsModule } from './components/common/common-components.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,
        // NgMocks is a third party library that helps with mocking dependencies for testing.
        // Here I am mocking the modules imported by the app module and used in the app component
        MockModule(MatSidenavModule),
        MockModule(MatListModule),
        MockModule(MatToolbarModule),
        MockModule(MatButtonModule),
        MockModule(MatIconModule),
        MockModule(CommonComponentsModule),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should setup the side nav router links', () => {
    expect(component.sideNavItems).toEqual([
      {
        label: 'Home',
        route: ['/'],
      },
      {
        label: 'Favourites',
        route: ['/favourites'],
      },
    ]);

    // Get all the mat list items in the side nav
    const matListItemEls = fixture.debugElement.queryAll(
      By.directive(MatListItem)
    );

    // Get the RouterLink from the mat list items
    const routerLinks = matListItemEls.map((de) =>
      de.injector.get(RouterLinkWithHref)
    );

    // Confirm each mat list item has the label set correctly
    matListItemEls.forEach((de: DebugElement, index: number) => {
      expect((de.nativeElement as HTMLElement).textContent?.trim()).toEqual(
        component.sideNavItems[index].label
      );
    });

    // Confirm each mat list item has the RouterLink href set correctly
    routerLinks.forEach((link: RouterLinkWithHref, index: number) => {
      expect(link.href).toEqual(component.sideNavItems[index].route.join('/'));
    });
  });

  it('should setup layout with toolbar, sidenav and router outlet', () => {
    // Get the toolbar component instance
    const toolbar: MatToolbar = fixture.debugElement.query(
      By.directive(MatToolbar)
    )?.componentInstance;

    expect(toolbar).not.toBeUndefined();
    expect(toolbar).toEqual(jasmine.any(MatToolbar));

    // Get the sidenav component instance
    const sidenav: MatSidenav = fixture.debugElement.query(
      By.directive(MatSidenav)
    )?.componentInstance;

    expect(sidenav).not.toBeUndefined();
    expect(sidenav).toEqual(jasmine.any(MatSidenav));

    // Get the router outlet
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));

    expect(routerOutlet).not.toBeUndefined();
  });
});
