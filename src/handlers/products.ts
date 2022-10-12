import { Product } from '../models/products';
import { ProductType, ProductUpdatedType } from '../types/types';
import { Application, Request, Response } from 'express';
import { verifyToken } from './users';

const productInstance = new Product();

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: ProductType = {
      product_name: req.body.product_name as unknown as string,
      price: req.body.price as unknown as number,
      category: req.body.category as unknown as string,
    };
    if (
      !productData.product_name ||
      !productData.category ||
      !productData.price
    ) {
      res.status(400);
      res.send('ProductName & Price & Category are required');
      return;
    }
    const newProduct: ProductType = await productInstance.createProduct(
      productData
    );
    res.json({ product: newProduct });
  } catch (err) {
    res.status(400);
    res.json({ message: err });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const productData: ProductUpdatedType = {
      product_name: req.body.product_name as unknown as string,
      category: req.body.category as unknown as string,
      price: req.body.price as unknown as number,
    };
    if (
      !productData.product_name ||
      !productData.category ||
      !productData.price
    ) {
      res.status(400);
      res.send('Please check The ProductName & Price & Category are required');
      return;
    }
    const updatedProduct: ProductUpdatedType =
      await productInstance.updateProduct(id, productData);
    res.json({ product: updatedProduct });
  } catch (err) {
    res.status(400);
    res.json({ message: err });
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const products: ProductType[] = await productInstance.index();
    res.json(products);
  } catch (err) {
    //handle-error
    res.status(404).json({ message: err });
  }
};

const getProductsInCategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.category as unknown as string;
    const products: ProductType[] = await productInstance.getProductsInCategory(
      category
    );
    res.json({ products: products });
  } catch (err) {
    //handle-error
    res.status(404).json({ message: err });
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const product: ProductType = await productInstance.getProduct(id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    await productInstance.deleteProduct(id);
    res.send('the Product deleted successfully');
  } catch (err) {
    //handle-error
    res.status(400).json({ message: err });
  }
};

const productRouter = (app: Application) => {
  //REQUEST_CREATE_PRODUCTS
  app.post('/products/create', verifyToken, createProduct);
  //REQUEST_GET_PRODUCTS
  app.get('/products', index);
  //REQUEST_GET_PRODUCTS_BY_ID
  app.get('/products/:id', getProduct);
  //REQUEST_UPDATE_PRODUCT
  app.put('/products/update/:id', verifyToken, updateProduct);
  //REQUEST_GET_PRODUCT_BY_CATEGORY
  app.get('/products/category/:category', getProductsInCategory);
  //REQUEST_DELETE_PRODUCT
  app.delete('/products/:id', verifyToken, deleteProduct);
};

export default productRouter;
