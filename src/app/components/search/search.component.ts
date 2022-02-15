import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  searchValue = '';

  @ViewChild(MatInput)
  private search?: MatInput;

  constructor(private cdRef: ChangeDetectorRef, private router: Router) {}

  ngAfterViewInit(): void {
    this.search?.focus();
    this.cdRef.detectChanges();
  }

  onSubmit(): void {
    this.router.navigate(['/movies'], {
      queryParams: { search: this.searchValue },
    });
  }
}
