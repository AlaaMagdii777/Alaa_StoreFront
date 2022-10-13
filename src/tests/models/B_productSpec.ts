//Models-Test_Product
import { Product } from '../../models/products';
import { ProductType } from '../../types/types';

const product = new Product();

const productData=  {
    "product_name": "bags",
    "category": "clothes",
    "price":1000 
  }

//Models-Test_Product

describe('Models-Test_Product', () => {
    it('Models-Test_Product for Create Product', async () => {
      const result: ProductType = await product.createProduct({
        product_name: 'bags',
        category: 'clothes',
        price: 1000,
      });
      expect(result).toBeInstanceOf(Object);
    });
  
    it('Model Product getProduct', async () => {
      const result: ProductType = await product.getProduct(1);
      expect(result.product_name).toEqual('bags');
      expect(result.price).toEqual(1000);
      expect(result.product_name).not.toEqual('Electronic');
      expect(result.category).toEqual('clothes');
      expect(result).toBeInstanceOf(Object);
    });
});
  
