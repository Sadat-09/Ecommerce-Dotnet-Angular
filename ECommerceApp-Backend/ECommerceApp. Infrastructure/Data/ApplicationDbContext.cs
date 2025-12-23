using ECommerceApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.Price).HasColumnType("decimal(18,2)");

                
                entity.HasOne(e => e.Category)
                      .WithMany(c => c.Products)
                      .HasForeignKey(e => e.CategoryId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
            });

            
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Electronics", Description = "Electronic devices and accessories" },
                new Category { Id = 2, Name = "Books", Description = "Books and educational materials" },
                new Category { Id = 3, Name = "Clothing", Description = "Apparel and fashion items" }
            );

            
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Laptop", Description = "High-end gaming laptop", Price = 1299.99m, Stock = 50, CategoryId = 1 },
                new Product { Id = 2, Name = "Mouse", Description = "Wireless mouse", Price = 25.99m, Stock = 200, CategoryId = 1 },
                new Product { Id = 3, Name = "Keyboard", Description = "Mechanical keyboard", Price = 75.00m, Stock = 150, CategoryId = 1 },
                new Product { Id = 4, Name = "C# Programming Book", Description = "Learn C# from scratch", Price = 45.00m, Stock = 100, CategoryId = 2 },
                new Product { Id = 5, Name = "Clean Code Book", Description = "Best practices for writing clean code", Price = 50.00m, Stock = 80, CategoryId = 2 },
                new Product { Id = 6, Name = "T-Shirt", Description = "Cotton t-shirt", Price = 19.99m, Stock = 500, CategoryId = 3 },
                new Product { Id = 7, Name = "Jeans", Description = "Blue denim jeans", Price = 59.99m, Stock = 300, CategoryId = 3 }
            );
        }
    }
}