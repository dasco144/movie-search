import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, MockService } from 'ng-mocks';
import { of } from 'rxjs';

import { MovieSearchResult } from '../../models/movie-detail';
import { MovieService } from '../../services/movie.service';
import { getNewMovieSearchResult } from '../../testing/helpers.spec';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        // Provide a mock implementation of the MovieService, by providing
        // the MockService type as the injection token with a mock implementation as the value
        { provide: MovieService, useValue: MockService(MovieService) },
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        MockModule(MatButtonModule),
        MockModule(MatIconModule),
        MockModule(MatFormFieldModule),
        MockModule(MatInputModule),
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  describe('submit', () => {
    let router: Router;
    let form: DebugElement;
    let ngModel: NgModel;
    let input: HTMLInputElement;

    beforeEach(() => {
      // Spy on the router navigate method
      router = TestBed.inject(Router);
      spyOn(router, 'navigate');

      // Get the form element
      form = fixture.debugElement.query(By.css('form'));

      // Get the input element
      const inputDebugEl = fixture.debugElement.query(By.directive(MatInput));
      input = inputDebugEl.nativeElement as HTMLInputElement;

      // Get the ngModel from the MatInput
      ngModel = inputDebugEl.injector.get(NgModel);
      // Spy on the controls markAsTouched method
      spyOn(ngModel.control, 'markAsTouched');
    });

    it('should navigate to movies route after submit', fakeAsync(() => {
      const newValue = 'test';

      // Set a new value for the input, detect changes and wait for fixture stability
      input.value = newValue;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable();
      flushMicrotasks();

      // Dispatch the submit event on the form and detect changes
      form.nativeElement.dispatchEvent(new Event('submit'));
      fixture.detectChanges();

      expect(component.searchValue).toEqual(newValue);
      expect(ngModel.control.markAsTouched).not.toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/movies'], {
        queryParams: { search: 'test' },
      });
    }));

    it('should not navigate to movies route after submit if invalid', fakeAsync(() => {
      const newValue = '';

      // Set a new value for the input, detect changes and wait for fixture stability
      input.value = newValue;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable();
      flushMicrotasks();

      // Dispatch the submit event on the form and detect changes
      form.nativeElement.dispatchEvent(new Event('submit'));
      fixture.detectChanges();

      expect(component.searchValue).toEqual(newValue);
      expect(ngModel.control.markAsTouched).toHaveBeenCalledWith();
      expect(router.navigate).not.toHaveBeenCalled();
    }));
  });

  describe("I'm Lucky search", () => {
    let router: Router;
    let button: HTMLButtonElement;
    let ngModel: NgModel;
    let input: HTMLInputElement;
    let movieSearchResults: MovieSearchResult[];

    beforeEach(() => {
      // Spy on the router navigate and return a promise that resolves
      router = TestBed.inject(Router);
      spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

      // Create some mock data for the mock MovieSearchResult object
      movieSearchResults = [];

      for (let index = 1; index <= 5; index++) {
        movieSearchResults.push(getNewMovieSearchResult(index));
      }

      // Mock the search method of the MovieService to return an observable with a mock MovieSearchResult object
      const movieService = TestBed.inject(MovieService);
      spyOn(movieService, 'search').and.returnValue(
        of({
          Response: true,
          Search: movieSearchResults,
          totalResults: movieSearchResults.length,
        })
      );

      // Get the element for the I'm feeling lucky button
      button = fixture.debugElement.queryAll(By.directive(MatButton))[1]
        .nativeElement as HTMLButtonElement;

      // Get the input element
      const inputDebugEl = fixture.debugElement.query(By.directive(MatInput));
      input = inputDebugEl.nativeElement as HTMLInputElement;

      // Get the ngModel from the MatInput
      ngModel = inputDebugEl.injector.get(NgModel);
      // Spy on the controls markAsTouched method
      spyOn(ngModel.control, 'markAsTouched');
    });

    it("should navigate to movies route after clicking I'm Lucky button", fakeAsync(() => {
      const newValue = 'test';

      // Set a new value for the input, detect changes and wait for fixture stability
      input.value = newValue;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable();
      flushMicrotasks();

      // Dispatch the click event on the button, detect changes and use tick to simulate passage
      // of time to allow the the observable to emit to its piped operators
      button.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();

      expect(component.searchValue).toEqual(newValue);
      expect(ngModel.control.markAsTouched).not.toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([
        '/movies',
        movieSearchResults[0].imdbID,
      ]);
    }));

    it("should not navigate to movies route after clicking I'm Lucky button if invalid", fakeAsync(() => {
      const newValue = '';

      // Set a new value for the input, detect changes and wait for fixture stability
      input.value = newValue;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable();
      flushMicrotasks();

      // Dispatch the click event on the button, detect changes and use tick to simulate passage
      // of time to allow the the observable to emit to its piped operators
      button.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();

      expect(component.searchValue).toEqual(newValue);
      expect(ngModel.control.markAsTouched).toHaveBeenCalledWith();
      expect(router.navigate).not.toHaveBeenCalled();
    }));
  });
});
