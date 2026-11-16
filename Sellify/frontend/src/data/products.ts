export type ProductPrice = {
  size: "S" | "M" | "L";
  price: number;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  images: string[];
  prices: ProductPrice[];
  category: string;
  brand: string;
  average_rating: number;
  ratings_count: string;
  quantity: number;
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export const products: Product[] = [
  {
    _id: "p1",
    name: "Classic Cotton T-Shirt",
    description:
      "A wardrobe essential made from 100% combed cotton. Breathable, soft and built to keep its shape wash after wash.",
    images: [
      img("photo-1521572163474-6864f9cf17ab"),
      img("photo-1576566588028-4147f3842f27"),
    ],
    prices: [
      { size: "S", price: 19.99 },
      { size: "M", price: 22.99 },
      { size: "L", price: 24.99 },
    ],
    category: "T-Shirts",
    brand: "Uniqlo",
    average_rating: 4.6,
    ratings_count: "1,204",
    quantity: 80,
  },
  {
    _id: "p2",
    name: "Oxford Slim Shirt",
    description:
      "A crisp oxford shirt with a modern slim fit. Woven from breathable cotton for all-day comfort at the office or out.",
    images: [
      img("photo-1596755094514-f87e34085b2c"),
      img("photo-1602810318383-e386cc2a3ccf"),
    ],
    prices: [
      { size: "S", price: 39.99 },
      { size: "M", price: 44.99 },
      { size: "L", price: 49.99 },
    ],
    category: "Shirts",
    brand: "Zara",
    average_rating: 4.4,
    ratings_count: "642",
    quantity: 55,
  },
  {
    _id: "p3",
    name: "Oversized Fleece Hoodie",
    description:
      "Heavyweight fleece with a relaxed oversized silhouette, kangaroo pocket and ribbed cuffs. Your new cold-day favourite.",
    images: [
      img("photo-1556821840-3a63f95609a7"),
      img("photo-1620799140408-edc6dcb6d633"),
    ],
    prices: [
      { size: "S", price: 49.99 },
      { size: "M", price: 54.99 },
      { size: "L", price: 59.99 },
    ],
    category: "Hoodies",
    brand: "H&M",
    average_rating: 4.7,
    ratings_count: "918",
    quantity: 70,
  },
  {
    _id: "p4",
    name: "Classic Bomber Jacket",
    description:
      "A timeless bomber with a smooth lining and zip front. Light enough to layer, warm enough to go solo.",
    images: [
      img("photo-1551028719-00167b16eac5"),
      img("photo-1591047139829-d91aecb6caea"),
    ],
    prices: [
      { size: "S", price: 89.99 },
      { size: "M", price: 99.99 },
      { size: "L", price: 109.99 },
    ],
    category: "Jackets",
    brand: "Nike",
    average_rating: 4.8,
    ratings_count: "431",
    quantity: 40,
  },
  {
    _id: "p5",
    name: "Slim Fit Jeans",
    description:
      "Premium denim with just the right amount of stretch. A slim leg that moves with you from day to night.",
    images: [
      img("photo-1542272604-787c3835535d"),
      img("photo-1541099649105-f69ad21f3246"),
    ],
    prices: [
      { size: "S", price: 59.99 },
      { size: "M", price: 64.99 },
      { size: "L", price: 69.99 },
    ],
    category: "Jeans",
    brand: "Levi's",
    average_rating: 4.5,
    ratings_count: "2,087",
    quantity: 90,
  },
  {
    _id: "p6",
    name: "Everyday Running Sneakers",
    description:
      "Responsive cushioning meets a breathable knit upper. Comfortable enough for a run, clean enough for the street.",
    images: [
      img("photo-1542291026-7eec264c27ff"),
      img("photo-1560769629-975ec94e6a86"),
    ],
    prices: [
      { size: "S", price: 74.99 },
      { size: "M", price: 79.99 },
      { size: "L", price: 84.99 },
    ],
    category: "Shoes",
    brand: "Adidas",
    average_rating: 4.9,
    ratings_count: "3,142",
    quantity: 120,
  },
  {
    _id: "p7",
    name: "Minimalist Everyday Watch",
    description:
      "A clean three-hand dial with a stainless steel case. Water resistant and built to go with everything.",
    images: [img("photo-1523275335684-37898b6baf30")],
    prices: [
      { size: "S", price: 49.99 },
      { size: "M", price: 54.99 },
      { size: "L", price: 59.99 },
    ],
    category: "Accessories",
    brand: "Casio",
    average_rating: 4.3,
    ratings_count: "764",
    quantity: 60,
  },
  {
    _id: "p8",
    name: "Everyday Backpack",
    description:
      "A durable everyday carry with a padded laptop sleeve and plenty of pockets. Commute, travel, repeat.",
    images: [img("photo-1553062407-98eeb64c6a62")],
    prices: [
      { size: "S", price: 59.99 },
      { size: "M", price: 69.99 },
      { size: "L", price: 79.99 },
    ],
    category: "Accessories",
    brand: "Herschel",
    average_rating: 4.6,
    ratings_count: "1,530",
    quantity: 75,
  },
  {
    _id: "p9",
    name: "Tailored Wool Suit",
    description:
      "A two-piece suit in a premium wool blend. Sharp shoulders and a clean drape for weddings and boardrooms.",
    images: [
      img("photo-1594938298603-c8148c4dae35"),
      img("photo-1591932935015-7692032717ee"),
    ],
    prices: [
      { size: "S", price: 149.99 },
      { size: "M", price: 169.99 },
      { size: "L", price: 189.99 },
    ],
    category: "Suits",
    brand: "Zara",
    average_rating: 4.8,
    ratings_count: "312",
    quantity: 25,
  },
  {
    _id: "p10",
    name: "Embroidered Kurta",
    description:
      "A breathable cotton kurta with subtle embroidery. A modern take on a timeless traditional staple.",
    images: [
      img("photo-1610652492500-ded49ceeb378"),
      img("photo-1583391733956-6c78276477ea"),
    ],
    prices: [
      { size: "S", price: 44.99 },
      { size: "M", price: 49.99 },
      { size: "L", price: 54.99 },
    ],
    category: "Traditional Wear",
    brand: "FabIndia",
    average_rating: 4.7,
    ratings_count: "528",
    quantity: 48,
  },
  {
    _id: "p11",
    name: "Cozy Crewneck Sweatshirt",
    description:
      "Brushed fleece inside, smooth on the outside. A relaxed crewneck that layers effortlessly all year round.",
    images: [
      img("photo-1571945153237-4929e783af4a"),
      img("photo-1578681994339-b8b0c1c7d3a2"),
    ],
    prices: [
      { size: "S", price: 39.99 },
      { size: "M", price: 44.99 },
      { size: "L", price: 49.99 },
    ],
    category: "Sweatshirts",
    brand: "Gap",
    average_rating: 4.5,
    ratings_count: "887",
    quantity: 65,
  },
  {
    _id: "p12",
    name: "Stretch Chino Trousers",
    description:
      "Comfortable cotton twill with a hint of stretch. Dress them up or down, they always fit right.",
    images: [img("photo-1594633312681-425c7b97ccd1")],
    prices: [
      { size: "S", price: 49.99 },
      { size: "M", price: 54.99 },
      { size: "L", price: 59.99 },
    ],
    category: "Pants",
    brand: "Dockers",
    average_rating: 4.4,
    ratings_count: "673",
    quantity: 58,
  },
  {
    _id: "p13",
    name: "Linen Summer Shorts",
    description:
      "Lightweight linen blend with an elastic waist. Made for hot days and easy weekends.",
    images: [img("photo-1624378439575-d8705ad7ae80")],
    prices: [
      { size: "S", price: 29.99 },
      { size: "M", price: 32.99 },
      { size: "L", price: 34.99 },
    ],
    category: "Shorts",
    brand: "H&M",
    average_rating: 4.2,
    ratings_count: "405",
    quantity: 72,
  },
  {
    _id: "p14",
    name: "Graphic Print Tee",
    description:
      "A bold graphic tee on soft ringspun cotton. Stand out without trying too hard.",
    images: [img("photo-1618354691373-d851c5c3a990")],
    prices: [
      { size: "S", price: 24.99 },
      { size: "M", price: 27.99 },
      { size: "L", price: 29.99 },
    ],
    category: "T-Shirts",
    brand: "Nike",
    average_rating: 4.6,
    ratings_count: "1,118",
    quantity: 85,
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((product) => product._id === id);