import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../../models/category';

@Component({
  selector:  'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  category: CreateCategoryDto | UpdateCategoryDto = {
    name:  '',
    description: ''
  };
  
  isEditMode = false;
  categoryId:  number | null = null;
  loading = false;
  error = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot. paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.categoryId = +id;
      this.loadCategory(this.categoryId);
    }
  }

  loadCategory(id: number): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (data) => {
        this.category = {
          id: data.id,
          name: data.name,
          description: data.description
        };
      },
      error: (err) => {
        this.error = 'Failed to load category';
        console.error('Error loading category:', err);
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    if (this.isEditMode && this.categoryId) {
      this.categoryService.updateCategory(this.categoryId, this.category as UpdateCategoryDto).subscribe({
        next: () => {
          this.router.navigate(['/categories']);
        },
        error:  (err) => {
          this.error = 'Failed to update category';
          this.loading = false;
          console.error('Error updating category:', err);
        }
      });
    } else {
      this.categoryService. createCategory(this.category as CreateCategoryDto).subscribe({
        next: () => {
          this.router.navigate(['/categories']);
        },
        error: (err) => {
          this. error = 'Failed to create category';
          this.loading = false;
          console.error('Error creating category:', err);
        }
      });
    }
  }
}