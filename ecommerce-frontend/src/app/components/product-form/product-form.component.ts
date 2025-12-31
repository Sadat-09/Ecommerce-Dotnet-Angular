import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CreateProductDto, UpdateProductDto } from '../../models/product';
import { Category } from '../../models/category';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  product: CreateProductDto | UpdateProductDto = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: 0
  };
  
  categories: Category[] = [];
  isEditMode = false;
  productId: number | null = null;
  loading = false;
  error = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = +id;
      this.loadProduct(this.productId);
    }
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = {
          id: data.id,
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          categoryId: data.categoryId
        };
      },
      error: (err) => {
        this.error = 'Failed to load product';
        console.error('Error loading product:', err);
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, this.product as UpdateProductDto).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (err) => {
          this. error = 'Failed to update product';
          this.loading = false;
          console.error('Error updating product:', err);
        }
      });
    } else {
      this. productService.createProduct(this. product as CreateProductDto).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (err) => {
          this.error = 'Failed to create product';
          this.loading = false;
          console.error('Error creating product:', err);
        }
      });
    }
  }
}