const Product = require('../models/productModel');

exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({message: 'Utilisateur ajouté avec succès', product});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

// Récupérer tous les utilisateurs
exports.getProducts = async (req, res) => {
  let products;
  try {
    const searchQuery = req.query.search || '';
    const regex = new RegExp(searchQuery, 'i');
    products = await Product.find({name:  { $regex: regex }});
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

//Récuperer un product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({message: "product not found"})
    }
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};


exports.modifyProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    console.log(product)
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({message: "product not found"})
    }
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

// Delete un product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(204).json();
    } else {
      res.status(404).json({message: "product not found"})
    }
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};