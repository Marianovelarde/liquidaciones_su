"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getAllProducts = exports.createProduct = void 0;
const product_services_1 = require("../services/product.services");
const node_console_1 = require("node:console");
const createProduct = async (req, res) => {
    try {
        const product = await (0, product_services_1.createProductService)(req.body);
        (0, node_console_1.log)("Producto creado:", product);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createProduct = createProduct;
const getAllProducts = async (_req, res) => {
    try {
        const products = await (0, product_services_1.getAllProductsService)();
        (0, node_console_1.log)("Productos obtenidos:", products);
        res.json(products);
    }
    catch {
        res.status(500).json({ error: "Error obteniendo productos" });
    }
};
exports.getAllProducts = getAllProducts;
const updateProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = await (0, product_services_1.updateProductService)(id, req.body);
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await (0, product_services_1.deleteProductService)(id);
        res.json({ message: "Producto eliminado" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteProduct = deleteProduct;
