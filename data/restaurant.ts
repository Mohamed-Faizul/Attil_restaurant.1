export type RestaurantImage = {
  src: string;
  alt: string;
};

export type Dish = {
  name: string;
  description: string;
  image: RestaurantImage;
  price?: string;
};

export const restaurant = {
  name: "Attil Multi Cuisine Restaurant",
  shortName: "ATTIL",
  address: "36, Theni Madurai Main Road, Junction, Near Jakkampatti, Andipatti, Tamil Nadu - 625512",
  phone: "7094479447",
  email: "Not published on the reference website",
  instagram: "https://www.instagram.com/attil_multicuisine/?hl=en",
  maps: "https://www.google.com/maps/search/?api=1&query=Attil+Multi+Cuisine+Restaurant+Andipatti",
  sourceReviewScore: "4.3",
  sourceReviewCount: "263",
};

export const images = {
  logo: { src: "/images/logo.png", alt: "Attil Multi Cuisine Restaurant logo" },
  hero: { src: "/images/hero.jpg", alt: "Attil food presentation" },
  interior: { src: "/images/restaurant-interior.webp", alt: "Attil restaurant interior" },
  contact: { src: "/Contact%20heroImg.jfif", alt: "Welcoming dining room at Attil" },
  north: { src: "/images/north indian.jpg", alt: "North Indian cuisine at Attil" },
  south: { src: "/images/south indian.jpg", alt: "South Indian cuisine at Attil" },
  chinese: { src: "/images/chinese.jpg", alt: "Chinese and Indo-Chinese cuisine at Attil" },
  tandoor: { src: "/images/Tandoor & Clay Oven.jpg", alt: "Tandoor and clay oven cooking at Attil" },
  grills: { src: "/images/grills.jpg", alt: "Grilled food at Attil" },
  biryani: { src: "/images/menu-item-biriyani.jpg", alt: "Attil Briyani" },
  veg: { src: "/images/veg.png", alt: "Vegetarian food at Attil" },
  nonVeg: { src: "/images/non-veg.png", alt: "Non vegetarian food at Attil" },
  chef: { src: "/images/restaurant-interior.webp", alt: "Attil kitchen atmosphere" },
} satisfies Record<string, RestaurantImage>;

export const cuisines = [
  { name: "South Indian", label: "REGIONAL HERITAGE", description: "Aromatic dosas, idlis, and authentic Chettinad delicacies.", image: images.south, examples: ["Dosas", "Idlis", "Chettinad"] },
  { name: "North Indian", label: "RICH & AROMATIC", description: "Rich curries, butter chicken, and tandoori specialties.", image: images.north, examples: ["Curries", "Butter chicken", "Tandoori"] },
  { name: "Chinese", label: "FIERY WOK HEAT", description: "Sizzling woks, noodles, and Indo-Chinese fusion.", image: images.chinese, examples: ["Woks", "Noodles", "Fusion"] },
  { name: "Tandoor", label: "GLOWING CHARCOAL", description: "Smoky kebabs, naans, and clay-oven perfection.", image: images.tandoor, examples: ["Kebabs", "Naans", "Clay oven"] },
  { name: "Continental", label: "MODERN GOURMET", description: "International classics with a gourmet touch.", image: images.grills, examples: ["Grills", "Sizzlers", "Classics"] },
];

export const specialties: Dish[] = [
  { name: "Mutton Seekh Kebab", description: "Juicy minced mutton kebabs grilled to smoky perfection on skewers.", image: images.tandoor },
  { name: "Octopus Chicken", description: "Tender chicken cooked with a spicy twist, inspired by octopus-style seasoning.", image: images.nonVeg },
  { name: "Arabian Al Faham", description: "Succulent chicken infused with rich, flavorful masalas.", image: images.grills },
  { name: "Attil Special Tikka", description: "Smoky and spicy tikka with Attil's special blend of herbs and spices.", image: images.north },
  { name: "Attil Briyani", description: "Aromatic basmati rice cooked with tender meat and Attil's signature spice blend.", image: images.biryani },
];

export const menuCategories = [
  { name: "South Indian", dishes: specialties.slice(0, 3) },
  { name: "North Indian", dishes: [specialties[0], specialties[3], { name: "Butter Chicken", description: "A rich curry from the North Indian selection.", image: images.north }] },
  { name: "Chinese", dishes: [{ name: "Chinese Wok Selection", description: "Sizzling woks, noodles, and Indo-Chinese fusion.", image: images.chinese }, specialties[1]] },
  { name: "Tandoor", dishes: [specialties[0], specialties[3], { name: "Tandoor Selection", description: "Smoky kebabs, naans, and clay-oven perfection.", image: images.tandoor }] },
  { name: "Continental", dishes: [specialties[2], { name: "Continental Selection", description: "International classics with a gourmet touch.", image: images.grills }] },
  { name: "Pantry & Beverages", dishes: [{ name: "Pantry & Beverages", description: "Refreshing drinks and delightful desserts.", image: images.veg }] },
];

export const reviews = [
  { name: "Mansur Ilahi", rating: 5, text: "Lunch at The Attil Multi cuisine restaurant was nothing short of spectacular. The warm, rustic decor and gentle music made for a charming atmosphere. I ordered chicken briyani which was perfectly cooked and beautifully presented." },
];

export const faqs = [
  { question: "Where is Attil Multi Cuisine Restaurant located?", answer: restaurant.address },
  { question: "How can I contact the restaurant?", answer: `Call ${restaurant.phone}. An email address is not published on the reference website.` },
  { question: "Does Attil offer different cuisines?", answer: "The reference website lists South Indian, North Indian, Chinese, Tandoor, Continental, and Pantry & Beverages selections." },
];
