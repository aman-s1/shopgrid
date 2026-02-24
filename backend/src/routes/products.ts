import { Router, Request, Response } from 'express';
import { query, validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';
import { Product, ProductsResponse } from '../types';

const router = Router();

// Load products from JSON file
function loadProducts(): Product[] {
    const filePath = path.join(__dirname, '../../data/products.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as Product[];
}

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
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const search = (req.query.search as string) || '';
        const category = (req.query.category as string) || '';
        const pageNum = parseInt((req.query.page as string) || '1', 10);
        const limitNum = parseInt((req.query.limit as string) || '8', 10);

        let products = loadProducts();

        // Filter by search (title match, case-insensitive)
        if (search) {
            products = products.filter((p) =>
                p.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filter by category
        if (category) {
            products = products.filter(
                (p) => p.category.toLowerCase() === category.toLowerCase()
            );
        }

        // Get all unique categories for filter UI
        const allProducts = loadProducts();
        const categories = [...new Set(allProducts.map((p) => p.category))].sort();

        // Pagination
        const totalItems = products.length;
        const totalPages = Math.ceil(totalItems / limitNum);
        const startIndex = (pageNum - 1) * limitNum;
        const paginated = products.slice(startIndex, startIndex + limitNum);

        const result: ProductsResponse = {
            products: paginated,
            pagination: {
                totalItems,
                totalPages,
                currentPage: pageNum,
                limit: limitNum,
            },
            categories,
        };

        res.json(result);
    }
);

// GET /api/products/:id
router.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params['id'] as string, 10);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid product ID' });
        return;
    }

    const products = loadProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
    }

    res.json(product);
});

export default router;
