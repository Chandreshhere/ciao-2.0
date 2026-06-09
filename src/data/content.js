export const brand = {
  name: 'Ciao Patisserie',
  location: 'Sector 58, Gurgaon',
  instagram: 'ciao_patisserie',
  instagramUrl: 'https://instagram.com/ciao_patisserie',
  whatsapp: '91XXXXXXXXXX', // ← replace with the shop's number
  notice: 'Made to order · 24–48hr advance notice',
}

export const nav = {
  links: [
    { label: 'Menu', href: '#/menu' },
    { label: 'About', href: '#/about' },
  ],
  cta: { label: 'Order Now', href: '#order' },
}

export const hero = {
  eyebrow: 'French Patisserie · Gurgaon',
  // Rich title: array of lines, each an array of segments. gold:true → italic gold.
  titleRich: [
    [{ t: 'Crafted in ' }, { t: 'Paris.', gold: true }],
    [{ t: 'Baked', gold: true }, { t: ' for You.' }],
  ],
  titleLines: ['Crafted in', 'Paris.', 'Baked for You.'],
  sub: 'Modern French pâtisserie — macarons, éclairs, entremets, and bespoke celebration cakes. Every creation balanced, precise, and beautiful.',
  chefCredential: 'Chef Srishti Ghai · Le Cordon Bleu, London',
  ctas: [
    { label: 'Explore Menu', href: '#menu', variant: 'gold' },
    { label: 'Place an Order', href: '#order', variant: 'ghost' },
  ],
  // Full-bleed carousel that fills the lower half of the hero.
  slides: [
    { src: '/gallery/product-02.png', label: 'Signature Custom Cakes' },
    { src: '/gallery/product-11.png', label: 'Bespoke Entremets' },
    { src: '/gallery/product-10.png', label: 'French Macarons' },
    { src: '/gallery/product-01.png', label: 'Dessert Shots' },
  ],
}

export const statement = {
  eyebrow: 'Experience life at Ciao',
  // Sentence split into segments. Segments with `img` are script-gold accents
  // that reveal that image at the cursor on hover.
  parts: [
    { t: 'Find your ' },
    { t: 'sweet escape', img: '/gallery/product-02.png', side: 'right' },
    { t: ' crafted in Paris, savour what ' },
    { t: 'our kitchen', img: '/gallery/product-11.png', side: 'left' },
    { t: ' shapes through the rhythm of the seasons, and let ' },
    { t: 'our story', img: '/gallery/srishti.png', side: 'right' },
    { t: ' become a part of your every celebration.' },
  ],
}

export const ticker = [
  'Macarons',
  'Éclairs',
  'Custom Cakes',
  'Dessert Puddings',
  'Bombshell Brownies',
  'Dessert Shots',
  'Belgian Chocolate',
  'Le Cordon Bleu Trained',
  'No Preservatives',
  'Sector 58, Gurgaon',
]

export const stats = [
  { num: '2017', label: 'Est. Founded' },
  { num: '8+', label: 'Years of Craft' },
  { num: '100%', label: 'Made to Order' },
  { num: '0', label: 'Preservatives' },
  { num: '∞', label: 'Custom Flavours' },
]

export const vitrine = {
  eyebrow: 'The Display',
  title: ['From Our', 'Vitrine'], // "Vitrine" = italic gold
  sub: 'Each creation handcrafted fresh. No two look the same.',
  cases: [
    {
      cat: 'Celebration',
      name: 'Custom Cakes',
      img: '/gallery/product-07.png',
      desc: 'Bespoke celebration cakes designed around your moment — sculpted, layered, and finished entirely by hand.',
    },
    {
      cat: 'Indulgence',
      name: 'Dessert Shots',
      img: '/gallery/product-01.png',
      desc: 'Individual layered desserts in glass — silky, balanced, and made fresh to order for every gathering.',
    },
    {
      cat: 'Signature',
      name: 'Macarons',
      img: '/gallery/product-10.png',
      desc: 'Delicate Parisian macarons with crisp shells and smooth ganache, in a rotating palette of seasonal flavours.',
    },
    {
      cat: 'Pudding',
      name: 'Shot Collection',
      img: '/gallery/product-04.png',
      desc: 'A curated collection of spoonable puddings and creams, each one a small, precise indulgence.',
    },
    {
      cat: 'Bespoke',
      name: 'Entremets',
      img: '/gallery/product-11.png',
      desc: 'Multi-textured French entremets — mousse, crémeux, and glaze composed into a single refined slice.',
    },
  ],
}

export const order = {
  eyebrow: 'Order',
  title: ['Ready to', 'Order?'], // "Order?" = italic gold
  sub: 'All items are made fresh to order. Please allow 24–48 hours. Custom cakes require 48–72 hours advance notice.',
  whatsappText: "Hi Ciao Patisserie! I'd like to place an order.",
  formTitle: ['Send an', 'Enquiry'], // "Enquiry" = italic gold
  selectOptions: [
    'Signature Chocolate Cake (700g/1kg)',
    'Fruit Cake (700g/1kg)',
    'Custom Celebration Cake',
    'Macarons — Box of 16 (₹1,800)',
    'Éclairs — Box of 8 (₹1,200)',
    'Mini Cupcakes — Box of 12 (₹1,500)',
    'Dessert Pudding (500g/1kg)',
    'Dessert Shots — Box of 9 (₹1,800)',
    'Cake Shots (Liquor Based) — Box of 9 (₹1,800)',
    'Bombshell Brownies — Box of 9 (₹1,200)',
    'Corporate / Gifting Order',
    'Dessert Table for Event',
  ],
  success: "✓ Thank you! We'll confirm your order on WhatsApp within a few hours.",
}

export const chef = {
  eyebrow: 'The Chef',
  name: ['Srishti', 'Ghai'], // "Ghai" = italic gold
  role: 'Owner & Chef Pâtissier',
  bio: [
    'Trained at Le Cordon Bleu, London and honed at L’Opéra, New Delhi, Srishti founded Ciao Patisserie in 2017 — built on precision, creativity, and the finest ingredients.',
    'Her philosophy: balanced desserts, minimal sugar, maximum flavour. Now in Gurgaon, bringing authentic French craftsmanship with a contemporary sensibility.',
  ],
  milestones: [
    'Le Cordon Bleu, London — Pastry Arts',
    'L’Opéra, New Delhi — Professional Experience',
    'Founded Ciao Patisserie, 2017',
    'Now at Sector 58, Gurgaon',
  ],
  quote: 'Balanced desserts, minimal sugar, and maximum flavour.',
  portrait: '/gallery/srishti.png',
}
