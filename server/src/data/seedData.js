const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Boutique = require('../models/Boutique');

const seedProductsData = [
  {
    title: 'Silk Satin Tailored Blazer',
    description: 'An exquisitely structured double-breasted blazer crafted from pure Mulberry silk with satin lapels.',
    price: 480,
    originalPrice: 590,
    category: 'Outerwear',
    aesthetic: 'Minimalist Elegance',
    color: 'Midnight Black',
    colorHex: '#121212',
    stock: 15,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1548624149-f1e944f86d8a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.9,
    reviewCount: 28,
    isFeatured: true,
    brand: 'Atelier Sync',
  },
  {
    title: 'Architectural Pleated Midi Dress',
    description: 'A striking asymmetric pleat silhouette engineered for fluid motion and modern gala evenings.',
    price: 650,
    originalPrice: 780,
    category: 'Dresses',
    aesthetic: 'Silent Luxury',
    color: 'Champagne Cream',
    colorHex: '#F3E5D8',
    stock: 8,
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 5.0,
    reviewCount: 42,
    isFeatured: true,
    brand: 'Haute Sync',
  },
  {
    title: 'Cashmere Oversized Knit Sweater',
    description: 'Ultra-soft grade A Mongolian cashmere sweater with ribbed cuffs and relaxed dropped shoulders.',
    price: 320,
    originalPrice: 390,
    category: 'Tops',
    aesthetic: 'Parisian Chic',
    color: 'Oatmeal Beige',
    colorHex: '#D6C5B3',
    stock: 22,
    sizes: ['S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.8,
    reviewCount: 35,
    isFeatured: true,
    brand: 'Atelier Sync',
  },
  {
    title: 'Wide-Leg Wool Crepe Trousers',
    description: 'High-waisted tailored trousers featuring deep front pleats and side slip pockets.',
    price: 290,
    originalPrice: 340,
    category: 'Bottoms',
    aesthetic: 'Minimalist Elegance',
    color: 'Charcoal Grey',
    colorHex: '#36454F',
    stock: 18,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.7,
    reviewCount: 19,
    isFeatured: false,
    brand: 'Haute Sync',
  },
  {
    title: 'Sculptural Leather Mules 85mm',
    description: 'Handcrafted Italian nappa leather mules with a geometrically sculpted heel.',
    price: 420,
    originalPrice: 510,
    category: 'Footwear',
    aesthetic: 'Silent Luxury',
    color: 'Ivory White',
    colorHex: '#FFFFF0',
    stock: 10,
    sizes: ['S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.9,
    reviewCount: 15,
    isFeatured: true,
    brand: 'StyleSync Footwear',
  },
  {
    title: 'Structured Geometric Tote Bag',
    description: 'Minimalist box-grain calfskin leather bag with brushed gold hardware and magnetic tab closure.',
    price: 520,
    originalPrice: 620,
    category: 'Accessories',
    aesthetic: 'Minimalist Elegance',
    color: 'Rich Cognac Brown',
    colorHex: '#8B4513',
    stock: 7,
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.9,
    reviewCount: 50,
    isFeatured: true,
    brand: 'Atelier Leatherwork',
  },
  {
    title: 'Cyber Chrome Matrix Bomber Jacket',
    description: 'Futuristic metallic finish bomber jacket with water-resistant shell and utility arm pouch.',
    price: 495,
    originalPrice: 580,
    category: 'Outerwear',
    aesthetic: 'Cyberpunk Luxury',
    color: 'Metallic Silver',
    colorHex: '#C0C0C0',
    stock: 6,
    sizes: ['M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.8,
    reviewCount: 11,
    isFeatured: false,
    brand: 'CyberSync',
  },
  {
    title: 'Raw Edge Japanese Denim Trousers',
    description: 'Selvedge denim pants with tapered ankles, contrast stitching, and relaxed waist rise.',
    price: 240,
    originalPrice: 280,
    category: 'Bottoms',
    aesthetic: 'Urban Streetwear',
    color: 'Deep Indigo',
    colorHex: '#000080',
    stock: 14,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.6,
    reviewCount: 21,
    isFeatured: false,
    brand: 'Urban Sync',
  },
];

const seedCategoriesData = [
  { name: 'Outerwear', slug: 'outerwear', description: 'Tailored blazers, coats, and jackets', itemCount: 2 },
  { name: 'Dresses', slug: 'dresses', description: 'Gala gowns, cocktail dresses, and midi dresses', itemCount: 1 },
  { name: 'Tops', slug: 'tops', description: 'Cashmere knits, silk blouses, and shirts', itemCount: 1 },
  { name: 'Bottoms', slug: 'bottoms', description: 'Pleated trousers, denim, and silk skirts', itemCount: 2 },
  { name: 'Footwear', slug: 'footwear', description: 'Sculptural mules, boots, and heels', itemCount: 1 },
  { name: 'Accessories', slug: 'accessories', description: 'Handcrafted bags, jewelry, and belts', itemCount: 1 },
];

const seedDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount > 0) {
      console.log('📦 Database already seeded with products.');
      return;
    }

    console.log('🌱 Seeding initial products, categories, and accounts...');

    // Seed Categories
    await Category.deleteMany({});
    await Category.insertMany(seedCategoriesData);

    // Seed Products
    await Product.deleteMany({});
    await Product.insertMany(seedProductsData);

    // Seed Users (Customer & Admin)
    await User.deleteMany({});
    const adminUser = await User.create({
      name: 'Boutique Administrator',
      email: 'admin@stylesync.ai',
      password: 'Admin@123',
      role: 'admin',
    });

    const customerUser = await User.create({
      name: 'Sophia Vance',
      email: 'customer@stylesync.ai',
      password: 'Customer@123',
      role: 'customer',
    });

    // Seed Boutique details
    await Boutique.deleteMany({});
    await Boutique.create({
      name: 'StyleSync Haute Atelier',
      description: 'AI-Powered High Fashion Boutique & Stylist House',
      ownerAdmin: adminUser._id,
    });

    console.log('✅ Database Seeding Complete!');
    console.log('🔑 Default Customer: customer@stylesync.ai / Customer@123');
    console.log('🔑 Default Admin: admin@stylesync.ai / Admin@123');
  } catch (error) {
    console.error('❌ Error Seeding Database:', error.message);
  }
};

module.exports = seedDatabase;
