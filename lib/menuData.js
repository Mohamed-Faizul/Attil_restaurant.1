const image = (src, alt) => ({ src, alt });

export const menuCategories = [
  {
    id: "south",
    name: "South Indian",
    eyebrow: "REGIONAL HERITAGE",
    description: "Comforting staples and bright coastal spice from the South.",
    preview: image("/South/South Indian1.jfif", "South Indian platter at Attil"),
    items: [
      ["South Indian Platter", "A generous tasting of crisp, soft and savoury South Indian favourites.", "/South/South Indian1.jfif"],
      ["Masala Dosa", "Golden fermented rice crepe folded around a fragrant potato masala." , "/South/si2.jfif"],
      ["Medu Vada", "Crisp lentil fritters with a tender centre, made for dipping in sambar.", "/South/si3.jfif"],
      ["Sambar Rice", "Fragrant rice cooked with aromatic sambar spices and garden vegetables.", "/South/si4.jfif"],
      ["Idli Sambar", "Cloud-soft steamed rice cakes served with warm, slow-simmered sambar.", "/South/si5.jfif"],
      ["South Indian Special", "A homestyle plate layered with warming spices, chutney and comfort.", "/South/si6.jfif"],
    ],
  },
  {
    id: "north",
    name: "North Indian",
    eyebrow: "RICH & AROMATIC",
    description: "Slow-cooked gravies, warm breads and the deep perfume of the North.",
    preview: image("/North/ni1.jfif", "North Indian dish at Attil"),
    items: [
      ["Butter Chicken", "Silky tomato gravy, tender chicken and a gentle finish of butter and cream.", "/North/ni1.jfif"],
      ["Paneer Tikka Masala", "Charred paneer folded through a rich, aromatic masala sauce.", "/North/ni2.jfif"],
      ["Kadai Chicken", "Succulent chicken tossed with peppers, onions and roasted kadai spices.", "/North/ni3.jfif"],
      ["Dal Makhani", "Black lentils simmered low and slow until luxuriously creamy.", "/North/ni4.jfif"],
      ["Shahi Paneer", "Soft paneer in a fragrant, velvety gravy with a subtle royal sweetness.", "/North/ni5.jfif"],
      ["North Indian Feast", "A generous spread of fragrant curries and breads made for sharing.", "/North/ni6.jfif"],
    ],
  },
  {
    id: "chinese",
    name: "Chinese",
    eyebrow: "FIERY WOK HEAT",
    description: "Sizzling wok favourites with bright vegetables and Attil-style fire.",
    preview: image("/Chinese/ci1.jfif", "Chinese cuisine at Attil"),
    items: [
      ["Schezwan Fried Rice", "Smoky wok-tossed rice with crisp vegetables and a lively chilli finish.", "/Chinese/ci1.jfif"],
      ["Hakka Noodles", "Springy noodles tossed with colourful vegetables and savoury wok seasoning.", "/Chinese/ci2.jfif"],
      ["Dragon Chicken", "Crisp chicken glazed in a bold, sweet-hot Indo-Chinese sauce.", "/Chinese/ci3.jfif"],
      ["Gobi Manchurian", "Crisp cauliflower bites coated in a glossy ginger-garlic Manchurian glaze.", "/Chinese/ci4.jfif"],
      ["Chilli Paneer", "Golden paneer, peppers and onions brought together with a sharp chilli sauce.", "/Chinese/ci5.jfif"],
      ["Wok Tossed Special", "A generous wok plate layered with aromatics, crunch and savoury heat.", "/Chinese/ci6.jfif"],
    ],
  },
  {
    id: "tandoor",
    name: "Tandoor",
    eyebrow: "GLOWING CHARCOAL",
    description: "Smoky kebabs and clay-oven plates kissed by live fire.",
    preview: image("/Tandoor/t1.jfif", "Tandoor dish at Attil"),
    items: [
      ["Chicken Tikka", "Tender chicken marinated in yoghurt and spices, charred at the edges.", "/Tandoor/t1.jfif"],
      ["Tandoori Chicken", "Juicy chicken roasted in the clay oven for a deep, smoky finish.", "/Tandoor/t2.jfif"],
      ["Seekh Kebab", "Seasoned minced meat shaped on skewers and grilled over glowing charcoal.", "/Tandoor/t3.jfif"],
      ["Tandoori Fish", "Delicate fish fillet kissed with spice, smoke and a squeeze of citrus.", "/Tandoor/t4.jfif"],
      ["Garlic Naan", "Pillowy clay-oven bread brushed with butter and fragrant roasted garlic.", "/Tandoor/t5.jfif"],
      ["Tandoor Sharing Platter", "A smoky selection of Attil favourites, built for the centre of the table.", "/Tandoor/t6.jfif"],
    ],
  },
  {
    id: "continental",
    name: "Continental",
    eyebrow: "MODERN GOURMET",
    description: "International comfort food finished with a polished Attil touch.",
    preview: image("/continential/c1.jfif", "Continental dish at Attil"),
    items: [
      ["Creamy Alfredo Pasta", "Silken cream sauce, herbs and pasta for a warm, indulgent classic.", "/continential/c1.jfif"],
      ["Chicken Steak", "Juicy grilled chicken served with a savoury sauce and generous sides.", "/continential/c2.jfif"],
      ["Veg Sizzler", "Seasonal vegetables served hot with a dramatic sizzle and rich sauce.", "/continential/c3.jfif"],
      ["Grilled Chicken", "Flame-kissed chicken with a lightly seasoned crust and tender centre.", "/continential/c4.jfif"],
      ["Cheesy French Fries", "Crisp fries finished with bubbling cheese and a savoury seasoning.", "/continential/c5.jfif"],
      ["Continental Platter", "A colourful spread of international favourites for relaxed sharing.", "/continential/c6.jfif"],
    ],
  },
  {
    id: "pantry",
    name: "Pantry & Beverages",
    eyebrow: "POUR, SIP, SHARE",
    description: "Easy refreshment, sweet finishes and little comforts between courses.",
    preview: image("/pantry&Beverage/pb1.jfif", "Pantry and beverage selection at Attil"),
    items: [
      ["Fresh Lime Cooler", "A bright, icy pour of lime, sweetness and sparkling refreshment.", "/pantry&Beverage/pb1.jfif"],
      ["Mango Lassi", "Thick yoghurt blended with ripe mango for a cool, creamy classic.", "/pantry&Beverage/pb2.jfif"],
      ["Fresh Fruit Salad", "Seasonal fruit cut fresh and served bright, juicy and chilled.", "/pantry&Beverage/pb3.jfif"],
      ["Chocolate Brownie", "A rich, fudgy square with a warm cocoa centre and soft crumb.", "/pantry&Beverage/pb4.jfif"],
      ["Falooda", "A layered chilled dessert with silky vermicelli, rose and creamy sweetness.", "/pantry&Beverage/pb5.jfif"],
      ["Attil Refreshment", "A chilled pantry favourite to round out the table on a sweet note.", "/pantry&Beverage/pb6.jfif"],
    ],
  },
].map((category) => ({
  ...category,
  items: category.items.map(([name, description, src], index) => ({ name, description, animationDelay: index * 120, accentPosition: index % 2 ? "left" : "right", image: image(src, `${name} at Attil`) })),
}));

export const categoryIds = menuCategories.map(({ id }) => id);

export const categoryUrl = (id) => {
  if (typeof window === "undefined") return `https://yoursite.com/menu?category=${id}`;
  return `${window.location.origin}/menu?category=${id}`;
};