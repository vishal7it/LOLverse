import { Meme, Template } from '../context/MemeContext';

export const mockUsers = [
  {
    id: 'user-1',
    username: 'meme_lord',
    email: 'memelord@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'user-2',
    username: 'meme_queen',
    email: 'memequeen@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'user-3',
    username: 'dank_memer',
    email: 'dankmemer@example.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
];

export const mockTemplates: Template[] = [
  {
    id: 'template-1',
    name: 'Distracted Boyfriend',
    imageUrl: 'https://i.imgflip.com/1ur9b0.jpg',
    category: 'classics',
  },
  {
    id: 'template-2',
    name: 'Drake Hotline Bling',
    imageUrl: 'https://i.imgflip.com/30b1gx.jpg',
    category: 'classics',
  },
  {
    id: 'template-3',
    name: 'Two Buttons',
    imageUrl: 'https://i.imgflip.com/1g8my4.jpg',
    category: 'classics',
  },
  {
    id: 'template-4',
    name: 'Change My Mind',
    imageUrl: 'https://i.imgflip.com/24y43o.jpg',
    category: 'debate',
  },
  {
    id: 'template-5',
    name: 'Expanding Brain',
    imageUrl: 'https://i.imgflip.com/1jwhww.jpg',
    category: 'multi-panel',
  },
  {
    id: 'template-6',
    name: 'Woman Yelling at Cat',
    imageUrl: 'https://i.imgflip.com/345v97.jpg',
    category: 'animals',
  },
  {
    id: 'template-7',
    name: 'Buff Doge vs. Cheems',
    imageUrl: 'https://i.imgflip.com/43a45p.png',
    category: 'animals',
  },
  {
    id: 'template-8',
    name: 'Always Has Been',
    imageUrl: 'https://i.imgflip.com/46e43q.png',
    category: 'space',
  },
];

export const mockMemes: Meme[] = [
  {
    id: 'meme-1',
    imageUrl: 'https://i.imgflip.com/7w1t8p.jpg',
    topText: 'WHEN THE CODE',
    bottomText: 'WORKS ON THE FIRST TRY',
    tags: ['coding', 'programming', 'tech'],
    createdAt: '2025-04-15T12:00:00Z',
    createdBy: {
      id: 'user-1',
      username: 'meme_lord',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    stats: {
      views: 1354,
      upvotes: 438,
      downvotes: 12,
      comments: 43,
    },
    comments: [
      {
        id: 'comment-1',
        text: 'This is way too accurate! 😂',
        createdAt: '2025-04-15T13:15:00Z',
        user: {
          id: 'user-2',
          username: 'meme_queen',
          avatar: 'https://i.pravatar.cc/150?img=5',
        },
      },
      {
        id: 'comment-2',
        text: 'Literally never happens to me',
        createdAt: '2025-04-15T14:30:00Z',
        user: {
          id: 'user-3',
          username: 'dank_memer',
          avatar: 'https://i.pravatar.cc/150?img=8',
        },
      },
    ],
  },
  {
    id: 'meme-2',
    imageUrl: 'https://i.imgflip.com/7qwb85.jpg',
    topText: 'EXPLAINING TO MY MOM',
    bottomText: 'WHAT I DO FOR A LIVING',
    tags: ['work', 'tech', 'family'],
    createdAt: '2025-04-14T10:30:00Z',
    createdBy: {
      id: 'user-2',
      username: 'meme_queen',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    stats: {
      views: 2103,
      upvotes: 756,
      downvotes: 28,
      comments: 62,
    },
    comments: [
      {
        id: 'comment-3',
        text: 'My mom still thinks I "fix computers" 🤦‍♂️',
        createdAt: '2025-04-14T11:45:00Z',
        user: {
          id: 'user-1',
          username: 'meme_lord',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
      },
    ],
  },
  {
    id: 'meme-3',
    imageUrl: 'https://i.imgflip.com/74vkhz.jpg',
    topText: '',
    bottomText: 'MY BROWSER AFTER I GOOGLE AN ERROR MESSAGE',
    tags: ['developer', 'debugging', 'stackoverflow'],
    createdAt: '2025-04-13T18:15:00Z',
    createdBy: {
      id: 'user-3',
      username: 'dank_memer',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    stats: {
      views: 1789,
      upvotes: 512,
      downvotes: 15,
      comments: 38,
    },
    comments: [],
  },
  {
    id: 'meme-4',
    imageUrl: 'https://i.imgflip.com/881z10.jpg',
    topText: 'ME WAITING FOR MY CODE',
    bottomText: 'TO COMPILE',
    tags: ['waiting', 'coding', 'relatable'],
    createdAt: '2025-04-12T09:45:00Z',
    createdBy: {
      id: 'user-1',
      username: 'meme_lord',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    stats: {
      views: 950,
      upvotes: 302,
      downvotes: 8,
      comments: 22,
    },
    comments: [],
  },
  {
    id: 'meme-5',
    imageUrl: 'https://i.imgflip.com/7q5l1v.jpg',
    topText: 'WHEN SOMEONE TRIES TO EXPLAIN',
    bottomText: 'WHY THEIR FAVORITE FRAMEWORK IS BETTER',
    tags: ['framework', 'debate', 'tech'],
    createdAt: '2025-04-11T14:20:00Z',
    createdBy: {
      id: 'user-2',
      username: 'meme_queen',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    stats: {
      views: 1432,
      upvotes: 405,
      downvotes: 75,
      comments: 58,
    },
    comments: [],
  },
  {
    id: 'meme-6',
    imageUrl: 'https://i.imgflip.com/7wr7e9.jpg',
    topText: '',
    bottomText: 'WHEN THE DEADLINE IS TOMORROW',
    tags: ['deadline', 'work', 'stress'],
    createdAt: '2025-04-10T22:10:00Z',
    createdBy: {
      id: 'user-3',
      username: 'dank_memer',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    stats: {
      views: 2453,
      upvotes: 872,
      downvotes: 24,
      comments: 76,
    },
    comments: [],
  },
];