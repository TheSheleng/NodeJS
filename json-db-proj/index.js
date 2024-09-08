import ProductService from './ProductService.js'; 

const productService = new ProductService('http://localhost:3000');

async function main() {
  // Получение всех продуктов
  const products = await productService.getAllProducts();
  console.log('All Products:', products);

  // Получение продукта по ID
  const product = await productService.getProductById(1);
  console.log('Product with ID 1:', product);

  // Создание нового продукта
  const newProduct = { name: 'New Product', price: 400 };
  const createdProduct = await productService.createProduct(newProduct);
  console.log('Created Product:', createdProduct);

  // Обновление существующего продукта
  const updatedProduct = { name: 'Updated Product', price: 500 };
  const productAfterUpdate = await productService.updateProduct(1, updatedProduct);
  console.log('Updated Product with ID 1:', productAfterUpdate);

  // Удаление продукта
  await productService.deleteProduct(2);
  console.log('Deleted Product with ID 2');
}

main().catch(console.error);