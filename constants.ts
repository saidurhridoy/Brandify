import { Magazine, AdPackage } from './types';

export const CATEGORIES: string[] = ['Fashion', 'Real Estate', 'Automobile', 'Lifestyle', 'Tech', 'Food'];

const PACKAGES: AdPackage[] = [
  { id: 'pkg1', name: 'Full Page Ad', description: 'A full-page, full-color advertisement.', price: 500 },
  { id: 'pkg2', name: 'Half Page Ad', description: 'A half-page, full-color advertisement.', price: 300 },
  { id: 'pkg3', name: 'Quarter Page Ad', description: 'A quarter-page, full-color advertisement.', price: 175 },
  { id: 'pkg4', name: 'Inside Cover', description: 'Premium placement on the inside front cover.', price: 800 },
  { id: 'pkg5', name: 'Digital Placement', description: 'Banner ad on our digital edition.', price: 250 },
  { id: 'pkg6', name: 'Sponsored Article', description: 'A 2-page feature article written by our team.', price: 1200 },
  { id: 'pkg7', name: 'Social Media Campaign', description: 'A week-long campaign across our social channels.', price: 600 },
];

export const MAGAZINES: Magazine[] = [
  {
    id: 'mag1',
    name: 'Vogue Elevated',
    category: 'Fashion',
    description: 'The pinnacle of fashion journalism. Vogue Elevated sets trends and showcases the most iconic designs and designers from around the globe. A must-read for fashion connoisseurs.',
    thumbnailUrl: 'https://picsum.photos/seed/vogue/400/500',
    mediaKitUrl: '#',
    issues: [
      { id: 'issue1a', date: 'October 2023' },
      { 
        id: 'issue1b', 
        date: 'September 2023', 
        coverUrl: 'https://picsum.photos/seed/vogue_issue2/400/500',
        pages: [
          'https://picsum.photos/seed/vogue_p1/800/1000',
          'https://picsum.photos/seed/vogue_p2/800/1000',
          'https://picsum.photos/seed/vogue_p3/800/1000',
          'https://picsum.photos/seed/vogue_p4/800/1000',
        ],
      },
      { id: 'issue1c', date: 'August 2023' },
    ],
    packages: PACKAGES,
  },
  {
    id: 'mag2',
    name: 'Architectural Digest',
    category: 'Real Estate',
    description: 'Explore the world\'s most beautiful homes. Architectural Digest is the leading international authority on design and architecture, providing exclusive access to stunning properties.',
    thumbnailUrl: 'https://picsum.photos/seed/arch/400/500',
    mediaKitUrl: '#',
    issues: [
      { id: 'issue2a', date: 'Fall 2023', coverUrl: 'https://picsum.photos/seed/arch_issue1/400/500' },
      { 
        id: 'issue2b', 
        date: 'Summer 2023', 
        coverUrl: 'https://picsum.photos/seed/arch_issue2/400/500',
        pages: [
            'https://picsum.photos/seed/arch_p1/800/1000',
            'https://picsum.photos/seed/arch_p2/800/1000',
        ]
      },
    ],
    packages: PACKAGES,
  },
  {
    id: 'mag3',
    name: 'Auto Today',
    category: 'Automobile',
    description: 'The ultimate guide for car enthusiasts. Auto Today features in-depth reviews, first drives, and the latest news from the automotive world, from luxury sedans to powerful supercars.',
    thumbnailUrl: 'https://picsum.photos/seed/auto/400/500',
    mediaKitUrl: '#',
    issues: [
      { id: 'issue3a', date: 'November 2023', coverUrl: 'https://picsum.photos/seed/auto_issue1/400/500' },
      { id: 'issue3b', date: 'October 2023', coverUrl: 'https://picsum.photos/seed/auto_issue2/400/500' },
      { id: 'issue3c', date: 'September 2023', coverUrl: 'https://picsum.photos/seed/auto_issue3/400/500' },
      { id: 'issue3d', date: 'August 2023', coverUrl: 'https://picsum.photos/seed/auto_issue4/400/500' },
    ],
    packages: PACKAGES,
  },
  {
    id: 'mag4',
    name: 'SHOWCASE',
    category: 'Lifestyle',
    description: 'Curating the best in luxury living. SHOWCASE covers everything from travel and fine dining to high-end gadgets and wellness, defining the modern affluent lifestyle.',
    thumbnailUrl: 'https://picsum.photos/seed/showcase/400/500',
    mediaKitUrl: '#',
    issues: [
      { id: 'issue4a', date: 'Holiday 2023' },
      { id: 'issue4b', date: 'Autumn 2023', coverUrl: 'https://picsum.photos/seed/showcase_issue2/400/500' },
    ],
    packages: PACKAGES,
  },
  {
    id: 'mag5',
    name: 'Wired Forward',
    category: 'Tech',
    description: 'Where tomorrow is realized. Wired Forward explores the future of technology, science, business, and culture, and how they are shaping our world in profound ways.',
    thumbnailUrl: 'https://picsum.photos/seed/wired/400/500',
    mediaKitUrl: '#',
    issues: [
      { 
        id: 'issue5a', 
        date: 'October 2023',
        pages: [
            'https://picsum.photos/seed/wired_p1/800/1000',
            'https://picsum.photos/seed/wired_p2/800/1000',
            'https://picsum.photos/seed/wired_p3/800/1000',
        ]
      },
      { id: 'issue5b', date: 'September 2023' },
      { id: 'issue5c', date: 'August 2023', coverUrl: 'https://picsum.photos/seed/wired_issue3/400/500' },
    ],
    packages: PACKAGES,
  },
  {
    id: 'mag6',
    name: 'Bon Appétit',
    category: 'Food',
    description: 'For those who love to cook and eat. Bon Appétit delivers delicious recipes, restaurant reviews, and captivating stories from the world of food.',
    thumbnailUrl: 'https://picsum.photos/seed/food/400/500',
    mediaKitUrl: '#',
    issues: [
      { id: 'issue6a', date: 'November 2023', coverUrl: 'https://picsum.photos/seed/food_issue1/400/500' },
      { id: 'issue6b', date: 'October 2023', coverUrl: 'https://picsum.photos/seed/food_issue2/400/500' },
    ],
    packages: PACKAGES,
  },
];