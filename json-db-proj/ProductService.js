import axios from 'axios';

export default class ProductService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL
    });
  }

  async getAllProducts() {
    try {
      const response = await this.api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const response = await this.api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
  }

  async createProduct(product) {
    try {
      const response = await this.api.post('/products', product);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const response = await this.api.put(`/products/${id}`, updatedProduct);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      await this.api.delete(`/products/${id}`);
      console.log(`Product with id ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
  }
}