document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Show the corresponding page
            const pageId = this.getAttribute('data-page');
            pages.forEach(page => {
                if (page.id === pageId) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && 
            !event.target.closest('.sidebar') && 
            !event.target.closest('.menu-toggle') && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
    
    // Order search and filter
    const orderSearch = document.getElementById('order-search');
    const statusSelect = document.getElementById('status-select');
    const ordersTable = document.getElementById('orders-table');
    
    if (orderSearch && statusSelect && ordersTable) {
        orderSearch.addEventListener('input', filterOrders);
        statusSelect.addEventListener('change', filterOrders);
        
        function filterOrders() {
            const searchValue = orderSearch.value.toLowerCase();
            const statusValue = statusSelect.value;
            
            const rows = ordersTable.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const orderId = row.cells[0].textContent.toLowerCase();
                const customerName = row.cells[1].textContent.toLowerCase();
                const status = row.cells[4].textContent.toLowerCase();
                
                const matchesSearch = orderId.includes(searchValue) || customerName.includes(searchValue);
                const matchesStatus = statusValue === 'all' || status.includes(statusValue);
                
                if (matchesSearch && matchesStatus) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
    }
    
    // Product search and filter
    const productSearch = document.getElementById('product-search');
    const categorySelect = document.getElementById('category-select');
    const priceRange = document.getElementById('price-range');
    const productsGrid = document.querySelector('.products-grid');
    
    if (productSearch && categorySelect && priceRange && productsGrid) {
        productSearch.addEventListener('input', filterProducts);
        categorySelect.addEventListener('change', filterProducts);
        priceRange.addEventListener('change', filterProducts);
        
        function filterProducts() {
            const searchValue = productSearch.value.toLowerCase();
            const categoryValue = categorySelect.value;
            const priceValue = priceRange.value;
            
            const products = productsGrid.querySelectorAll('.product-card');
            
            products.forEach(product => {
                const name = product.querySelector('h3').textContent.toLowerCase();
                const category = product.querySelector('.product-category').textContent.toLowerCase();
                const priceText = product.querySelector('.product-price').textContent;
                const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ''));
                
                let matchesSearch = name.includes(searchValue);
                let matchesCategory = categoryValue === 'all' || category.includes(categoryValue.toLowerCase());
                let matchesPrice = true;
                
                if (priceValue !== 'all') {
                    const [min, max] = priceValue.split('-').map(val => {
                        if (val === '+') return Infinity;
                        return parseFloat(val);
                    });
                    
                    matchesPrice = price >= min && (max === Infinity || price <= max);
                }
                
                if (matchesSearch && matchesCategory && matchesPrice) {
                    product.style.display = '';
                } else {
                    product.style.display = 'none';
                }
            });
        }
    }
    
    // File upload preview
    const productImage = document.getElementById('product-image');
    const imagePreview = document.getElementById('image-preview');
    const fileName = document.getElementById('file-name');
    
    if (productImage && imagePreview && fileName) {
        productImage.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                }
                
                reader.readAsDataURL(this.files[0]);
                fileName.textContent = this.files[0].name;
            }
        });
    }
    
    // Edit product modal
    const editButtons = document.querySelectorAll('.edit-product');
    const editModal = document.getElementById('edit-product-modal');
    const closeModal = document.querySelector('.close-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    
    if (editButtons.length && editModal) {
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                
                // In a real application, you would fetch the product data from the server
                // For this demo, we'll use dummy data
                const productData = {
                    id: productId,
                    name: this.closest('.product-card').querySelector('h3').textContent,
                    category: this.closest('.product-card').querySelector('.product-category').textContent.split(': ')[1],
                    price: this.closest('.product-card').querySelector('.product-price').textContent.replace('$', ''),
                    stock: this.closest('.product-card').querySelector('.product-stock').textContent.split(': ')[1].replace(' units', ''),
                    features: Array.from(this.closest('.product-card').querySelectorAll('.product-features li')).map(li => li.textContent).join('\n'),
                    image: this.closest('.product-card').querySelector('.product-image img').src
                };
                
                // Populate the edit form
                document.getElementById('edit-product-id').value = productData.id;
                document.getElementById('edit-product-name').value = productData.name;
                document.getElementById('edit-product-category').value = productData.category.toLowerCase();
                document.getElementById('edit-product-price').value = productData.price;
                document.getElementById('edit-product-stock').value = productData.stock;
                document.getElementById('edit-product-features').value = productData.features;
                document.getElementById('edit-image-preview').src = productData.image;
                document.getElementById('edit-file-name').textContent = 'Current image';
                
                // Show the modal
                editModal.style.display = 'block';
            });
        });
        
        // Close modal functionality
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                editModal.style.display = 'none';
            });
        }
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                editModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === editModal) {
                editModal.style.display = 'none';
            }
        });
    }
    
    // Edit product image preview
    const editProductImage = document.getElementById('edit-product-image');
    const editImagePreview = document.getElementById('edit-image-preview');
    const editFileName = document.getElementById('edit-file-name');
    
    if (editProductImage && editImagePreview && editFileName) {
        editProductImage.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    editImagePreview.src = e.target.result;
                }
                
                reader.readAsDataURL(this.files[0]);
                editFileName.textContent = this.files[0].name;
            }
        });
    }
    
    // Form submissions
    const addProductForm = document.getElementById('add-product-form');
    const editProductForm = document.getElementById('edit-product-form');
    
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to the server
            alert('Product added successfully!');
            this.reset();
            document.getElementById('image-preview').src = 'https://via.placeholder.com/300x200?text=Product+Image';
            document.getElementById('file-name').textContent = 'No file chosen';
        });
    }
    
    if (editProductForm) {
        editProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to the server
            alert('Product updated successfully!');
            editModal.style.display = 'none';
        });
    }
});