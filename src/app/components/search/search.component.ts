import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { first, from, map, switchMap } from 'rxjs';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  searchValue = '';

  @ViewChild(MatInput)
  private search?: MatInput;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngAfterViewInit(): void {
    // Focus the search input when the dom is initialised
    this.search?.focus();
    // Use the change detector to detect changes, since the search focus triggers an input change on the MatInput, and causes a
    // Expression has changed after it was checked error
    this.cdRef.detectChanges();
  }

  onSubmit(formModel: NgModel): void {
    // Validate the form model to ensure it is valid, if not then force
    // the error to show by marking the control as touched
    if (formModel.invalid) {
      formModel.control.markAsTouched();
      return;
    }

    // Trigger the navigation to the movies route with the current search value as a query param
    void this.router.navigate(['/movies'], {
      queryParams: { search: this.searchValue },
    });
  }

  luckySearch(formModel: NgModel): void {
    // Validate the form model to ensure it is valid, if not then force
    // the error to show by marking the control as touched
    if (formModel.invalid) {
      formModel.control.markAsTouched();
      return;
    }

    // Trigger the search with the current search value. We can use the default search since the api
    // doesn't provided a way to get a specific number of results. You can only get 10 at a time while searching
    // so I'll take the first result from the first page
    this.movieService
      .search(this.searchValue)
      .pipe(
        // Take first to complete the observable after the first emission
        first(),
        // Get the first movie from the results
        map((results) => results.Search[0]),
        // Navigate to movie detail route with the first movie's id
        switchMap((movie) =>
          from(this.router.navigate(['/movies', movie.imdbID]))
        )
      )
      .subscribe();
  }
}
