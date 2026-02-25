import { Router, Request, Response } from 'express';
import { query, body, validationResult } from 'express-validator';
import Product from '../models/Product';
import { ProductsResponse } from '../types';

const router = Router();

// GET /api/products
// Query params: search, category, page, limit
router.get(
    '/',
    [
        query('page')
            .optional()
            .isInt({ min: 1 })
            .withMessage('page must be a positive integer'),
        query('limit')
            .optional()
            .isInt({ min: 1, max: 50 })
            .withMessage('limit must be between 1 and 50'),
        query('search')
            .optional()
            .isString()
            .trim()
            .isLength({ max: 100 })
            .withMessage('search must be a string under 100 chars'),
        query('category')
            .optional()
            .isString()
            .trim()
            .withMessage('category must be a string'),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const search = (req.query.search as string) || '';
        const categoryFilter = (req.query.category as string) || '';
        const pageNum = parseInt((req.query.page as string) || '1', 10);
        const limitNum = parseInt((req.query.limit as string) || '8', 10);

        try {
            // Build MongoDB query
            const queryObj: any = {};

            if (search) {
                // Use text search if text index exists, otherwise regex
                queryObj.$text = { $search: search };
            }

            if (categoryFilter) {
                queryObj.category = categoryFilter;
            }

            // Pagination and count
            const totalItems = await Product.countDocuments(queryObj);
            const totalPages = Math.ceil(totalItems / limitNum);
            const startIndex = (pageNum - 1) * limitNum;

            const products = await Product.find(queryObj)
                .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
                .skip(startIndex)
                .limit(limitNum);

            // Get all unique categories for filter UI (can be optimized/cached)
            const categories = await Product.distinct('category');

            const result: ProductsResponse = {
                products: products as any, // Cast due to Document type
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: pageNum,
                    limit: limitNum,
                },
                categories: categories.sort(),
            };

            res.json(result);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Internal server error while fetching products' });
        }
    }
);

// POST /api/products
router.post(
    '/',
    [
        body('title').isString().trim().notEmpty().withMessage('Title is required'),
        body('price').isNumeric().withMessage('Price must be a number'),
        body('category').isString().trim().notEmpty().withMessage('Category is required'),
        body('image').isString().trim().notEmpty().withMessage('Image URL is required'),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        try {
            const { title, price, category, image } = req.body;
            const newProduct = new Product({ title, price, category, image });
            await newProduct.save();
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Internal server error while creating product' });
        }
    }
);

// GET /api/products/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params['id']);

        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        res.json(product);
    } catch (error) {
        // Check if error is due to invalid ObjectId
        if (error instanceof Error && error.name === 'CastError') {
            res.status(400).json({ error: 'Invalid product ID format' });
            return;
        }
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
