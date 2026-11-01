/* ==========================================================================
   LARA NIKOLAU — content & placeholder imagery
   All images are royalty-free Unsplash photographs used ONLY as stand-ins
   matching the mood of Lara's Instagram (natural light, genuine emotion,
   editorial warmth). They are NOT her work and should be replaced later.
   ========================================================================== */

function img(id, w) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w || 1600}&q=80`;
}

const CATEGORIES = [
  { slug: 'portraits', label: 'Portraits' },
  { slug: 'weddings', label: 'Weddings' },
  { slug: 'events', label: 'Events' },
  { slug: 'fashion', label: 'Fashion' },
  { slug: 'commercial', label: 'Commercial' },
  { slug: 'travel', label: 'Travel' },
  { slug: 'editorial', label: 'Editorial' },
];

const PORTFOLIO = [
  { category: 'portraits', title: 'Quiet Light', size: 'tall', img: img('1519741497674-611481863552') },
  { category: 'portraits', title: 'Still', size: 'portrait', img: img('1544005313-94ddf0286df2') },
  { category: 'weddings', title: 'The Vow', size: 'wide', img: img('1517841905240-472988babdf9') },
  { category: 'fashion', title: 'Ombres', size: 'full', img: img('1524504388940-b1c1722653e1') },
  { category: 'portraits', title: 'Unposed', size: 'tall', img: img('1534528741775-53994a69daeb') },
  { category: 'editorial', title: 'Reverie', size: 'portrait', img: img('1494790108377-be9c29b29330') },
  { category: 'weddings', title: 'After the Ceremony', size: 'tall', img: img('1522673607200-164d1b6ce486') },
  { category: 'fashion', title: 'Poise', size: 'portrait', img: img('1529626455594-4ff0802cfb7e') },
  { category: 'travel', title: 'Far Shore', size: 'wide', img: img('1507525428034-b723cf961d3e') },
  { category: 'portraits', title: 'Held', size: 'tall', img: img('1508214751196-bcfd4ca60f91') },
  { category: 'events', title: 'Champagne Hour', size: 'portrait', img: img('1511795409834-ef04bbd61622') },
  { category: 'fashion', title: 'Atelier', size: 'tall', img: img('1487412720507-e7ab37603c6f') },
  { category: 'editorial', title: 'Chiaroscuro', size: 'full', img: img('1520250497591-112f2f40a3f4') },
  { category: 'weddings', title: 'Ever After', size: 'wide', img: img('1518895949257-7621c3c786d7') },
  { category: 'travel', title: 'Into the Pines', size: 'tall', img: img('1441974231531-c6227db76b6e') },
  { category: 'portraits', title: 'Afternoon', size: 'portrait', img: img('1548142813-c348350df52b') },
  { category: 'commercial', title: 'The Brand Story', size: 'wide', img: img('1600607687939-ce8a6c25118c') },
  { category: 'fashion', title: 'Draped', size: 'tall', img: img('1517649763962-0c623066013b') },
  { category: 'travel', title: 'Horizon Line', size: 'wide', img: img('1470071459604-3b5ec3a7fe05') },
  { category: 'editorial', title: 'Muse', size: 'portrait', img: img('1496345875659-11f7dd282d1d') },
  { category: 'portraits', title: 'Nearer', size: 'tall', img: img('1516727003284-a96541e51e9c') },
  { category: 'events', title: 'The Gathering', size: 'portrait', img: img('1509783236416-c9ad59bae472') },
  { category: 'weddings', title: 'Two Rings', size: 'tall', img: img('1518895949257-7621c3c786d7') },
  { category: 'travel', title: 'Low Tide', size: 'full', img: img('1445205170230-053b83016050') },
  { category: 'fashion', title: 'Line & Form', size: 'portrait', img: img('1483985988355-763728e1935b') },
  { category: 'commercial', title: 'Studio Work', size: 'wide', img: img('1556905055-8f358a7a47b2') },
  { category: 'portraits', title: 'Soft Focus', size: 'tall', img: img('1506929562872-bb421503ef21') },
  { category: 'editorial', title: 'Threshold', size: 'portrait', img: img('1533105079780-92b9be482077') },
];

const PROJECTS = [
  {
    slug: 'sunday-light',
    title: 'Sunday Light',
    category: 'Family Portrait',
    location: 'Concord, Massachusetts',
    date: 'October 2025',
    cover: img('1519741497674-611481863552', 2000),
    description: 'An unhurried morning with three generations — linen, orchard light, and the kind of quiet that only happens before noon.',
    body: 'This session was never meant to feel like a production. We walked, we waited, we let the children lead. The photographs that remain are the ones that happened in between — a hand on a shoulder, a glance across the grass, light moving through the trees.',
    gallery: [
      img('1519741497674-611481863552', 1800),
      img('1522673607200-164d1b6ce486', 1600),
      img('1548142813-c348350df52b', 1600),
      img('1516727003284-a96541e51e9c', 1600),
      img('1508214751196-bcfd4ca60f91', 1600),
    ],
  },
  {
    slug: 'the-meadow-vow',
    title: 'The Meadow Vow',
    category: 'Wedding',
    location: 'The Berkshires, Massachusetts',
    date: 'June 2025',
    cover: img('1518895949257-7621c3c786d7', 2000),
    description: 'A late-spring wedding in the hills — wildflowers, worn wood, and vows spoken just before the light turned gold.',
    body: 'The brief was simple: stay close, stay honest, and do not interrupt the day. From the quiet of getting ready to the last dance under string lights, the work was to notice — not to arrange.',
    gallery: [
      img('1518895949257-7621c3c786d7', 1800),
      img('1517841905240-472988babdf9', 1600),
      img('1518895949257-7621c3c786d7', 1600),
      img('1511795409834-ef04bbd61622', 1600),
      img('1509783236416-c9ad59bae472', 1600),
    ],
  },
  {
    slug: 'held-in-gold',
    title: 'Held in Gold',
    category: 'Maternity & Couples',
    location: 'Cape Ann, Massachusetts',
    date: 'August 2025',
    cover: img('1508214751196-bcfd4ca60f91', 2000),
    description: 'A coastal evening for two, documenting the last weeks before a family of two became three.',
    body: 'Maternity work, at its best, is not about the pose. It is about the atmosphere between two people who already know something is changing. We shot until the horizon went pink, then a little after.',
    gallery: [
      img('1508214751196-bcfd4ca60f91', 1800),
      img('1534528741775-53994a69daeb', 1600),
      img('1494790108377-be9c29b29330', 1600),
      img('1544005313-94ddf0286df2', 1600),
      img('1507525428034-b723cf961d3e', 1600),
    ],
  },
  {
    slug: 'after-hours',
    title: 'After Hours',
    category: 'Fashion Editorial',
    location: 'Boston, Massachusetts',
    date: 'March 2025',
    cover: img('1524504388940-b1c1722653e1', 2000),
    description: 'A study of silhouette and restraint — tailored forms photographed in the pale winter light of the Back Bay.',
    body: 'Shot over two days in a quiet studio and along empty streets at first light. The series leans into negative space and tonal restraint, letting garment and gesture hold the frame.',
    gallery: [
      img('1524504388940-b1c1722653e1', 1800),
      img('1487412720507-e7ab37603c6f', 1600),
      img('1529626455594-4ff0802cfb7e', 1600),
      img('1496345875659-11f7dd282d1d', 1600),
      img('1483985988355-763728e1935b', 1600),
    ],
  },
];

const TESTIMONIALS = [
  {
    quote: 'Lara has a rare gift for making you forget the camera is there. The images from our wedding feel less like photographs and more like memories that were always ours.',
    name: 'Isabelle & Marco',
    role: 'Berkshires Wedding',
  },
  {
    quote: 'She photographed our family the way I hope we will remember these years — unhurried, tender, and completely ourselves.',
    name: 'The Ellison Family',
    role: 'Concord Session',
  },
  {
    quote: 'Working with Lara on our campaign was effortless. She arrived with a clear point of view and delivered images with more restraint and elegance than we imagined.',
    name: 'Noor Al-Sayed',
    role: 'Creative Director, Maison Adele',
  },
  {
    quote: 'Every portrait she has taken of me feels like the truest version of who I was at that moment. That is a rare kind of talent.',
    name: 'Claire Whitfield',
    role: 'Portrait Client',
  },
];

const SERVICES = [
  {
    title: 'Portrait Photography',
    slug: 'portrait',
    image: img('1544005313-94ddf0286df2', 1400),
    description: 'Individual, family, couple, and maternity sessions made to feel like a conversation — never a performance.',
    includes: ['Pre-session consultation', '1–2 hours on location', 'Guided but unposed direction', 'A curated gallery of fully edited images'],
    price: 'From $650',
  },
  {
    title: 'Wedding Photography',
    slug: 'wedding',
    image: img('1518895949257-7621c3c786d7', 1400),
    description: 'Documentary-led wedding coverage with an editorial eye — present for the quiet hours as much as the vows.',
    includes: ['Full planning conversation', '8–10 hours of coverage', 'Second photographer on request', 'Online gallery & print rights for personal use'],
    price: 'From $4,200',
  },
  {
    title: 'Event Photography',
    slug: 'event',
    image: img('1511795409834-ef04bbd61622', 1400),
    description: 'Discreet, cinematic coverage of dinners, gatherings, and celebrations — the atmosphere, not just the guest list.',
    includes: ['Advance walkthrough', 'Half or full-day coverage', 'Candid & detail-led approach', 'Edited gallery within two weeks'],
    price: 'From $1,400',
  },
  {
    title: 'Brand & Commercial Photography',
    slug: 'commercial',
    image: img('1600607687939-ce8a6c25118c', 1400),
    description: 'Visual identity work for studios, hospitality, and independent brands who want a point of view rather than stock.',
    includes: ['Creative direction & shot list', 'Half or full-day studio or location shoot', 'Usage licensing for web & print', 'Curated final asset library'],
    price: 'Custom quote',
  },
  {
    title: 'Fashion Photography',
    slug: 'fashion',
    image: img('1524504388940-b1c1722653e1', 1400),
    description: 'Editorial fashion imagery for designers, stylists, and publications — mood, movement, and considered art direction.',
    includes: ['Pre-production & moodboard', 'Studio or location shoot day', 'Collaboration with stylists & MUAs', 'Retouched editorial-ready selects'],
    price: 'Custom quote',
  },
  {
    title: 'Corporate Photography',
    slug: 'corporate',
    image: img('1556905055-8f358a7a47b2', 1400),
    description: 'Executive portraits and workplace stories for teams who want to look like themselves — polished, never stiff.',
    includes: ['On-location or studio sessions', 'Individual & team portraits', 'Fast-turnaround headshot sets', 'A consistent visual style across teams'],
    price: 'From $1,200',
  },
];
