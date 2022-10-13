//Models-Test_Product
import { Product } from '../../models/products';
import { ProductType } from '../../types/types';

const product = new Product();

//Models-Test_Product

//CREATE_PRODUCT

describe('Models-Test_Product', () => {
    it('Models-Test_Product for Create Product', async () => {
      const result: ProductType = await product.createProduct({
        product_name: 'bags',
        category: 'clothes',
        price: 1000,
      });
      expect(result).toBeInstanceOf(Object);
    });
    
//GET_Product

    it('Model Product getProduct', async () => {
      const result: ProductType = await product.getProduct(1);
      expect(result.product_name).toEqual('bags');
      expect(result.price).toEqual(2000);
      expect(result.product_name).not.toEqual('Electronic');
      expect(result.category).toEqual('clothes');
      expect(result).toBeInstanceOf(Object);
    });

//getProduct_By_Category

it('Models-Test_Product for getProductsInCategory', async () => {
    const result: ProductType[] = await product.getProductsInCategory('clothes');
    expect(result).toBeInstanceOf(Array);
  });

  //Make_Sure_About_Methods

  it('Models-Test_Product createProduct toBeDefined for createUser successfully', () => {
    expect(product.createProduct).toBeDefined();
  });
  
  it('Models-Test_Product getProduct toBeDefined for getAllproducts', () => {
    expect(product.getProduct).toBeDefined();
  });

  it('Models-Test_Product index toBeDefined  for getAllproducts', () => {
    expect(product.index).toBeDefined();
  });
 
  it('Models-Test_Product updateProduct toBeDefined and update for user successfully', () => {
    expect(product.updateProduct).toBeDefined();
  });
});
  
