import { formatDistanceToNow } from "date-fns";

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  category: string;
  description: string;
  available: boolean;
  isbn: string;
  publishedYear: number;
  publisher: string;
  language: string;
}

export interface BorrowedBook extends Book {
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  isOverdue: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  borrowedBooks: string[];
  bookHistory: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  type: "due_soon" | "overdue" | "available" | "system";
}

// Book categories
export const categories = [
  "Fiction",
  "Non-fiction",
  "Science Fiction",
  "Fantasy",
  "Biography",
  "History",
  "Mystery",
  "Romance",
  "Self-help",
  "Technology",
  "Business",
  "Poetry"
];

// Generate random book covers using Unsplash images
const getBookCoverUrl = (index: number): string => {
  const images = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb', // landscape
    'https://images.unsplash.com/photo-1517022812141-23620dba5c23', // sheep
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', // laptop
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6', // code
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', // woman laptop
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1', // laptop
  ];
  return images[index % images.length];
};

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    role: "user",
    borrowedBooks: ["book1", "book3"],
    bookHistory: ["book5", "book7"]
  },
  {
    id: "user2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    role: "user",
    borrowedBooks: ["book2"],
    bookHistory: ["book4", "book6", "book8"]
  },
  {
    id: "admin1",
    firstName: "Admin",
    lastName: "User",
    email: "admin@library.com",
    role: "admin",
    borrowedBooks: [],
    bookHistory: []
  }
];

// Mock Books
export const mockBooks: Book[] = [
  {
    id: "book1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: getBookCoverUrl(0),
    category: "Fiction",
    description: "A novel of the Jazz Age, following the mysterious millionaire Jay Gatsby and his obsession for the beautiful Daisy Buchanan.",
    available: false,
    isbn: "9780743273565",
    publishedYear: 1925,
    publisher: "Scribner",
    language: "English"
  },
  {
    id: "book2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: getBookCoverUrl(1),
    category: "Fiction",
    description: "The story of racial injustice and loss of innocence seen through the eyes of a young girl in the American South.",
    available: false,
    isbn: "9780061120084",
    publishedYear: 1960,
    publisher: "HarperCollins",
    language: "English"
  },
  {
    id: "book3",
    title: "1984",
    author: "George Orwell",
    coverImage: getBookCoverUrl(2),
    category: "Science Fiction",
    description: "A dystopian novel set in a totalitarian society where the government monitors and controls every aspect of human life.",
    available: false,
    isbn: "9780451524935",
    publishedYear: 1949,
    publisher: "Signet Classics",
    language: "English"
  },
  {
    id: "book4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: getBookCoverUrl(3),
    category: "Romance",
    description: "A romantic novel of manners that follows the character development of Elizabeth Bennet and her relationship with Mr. Darcy.",
    available: true,
    isbn: "9780141439518",
    publishedYear: 1813,
    publisher: "Penguin Classics",
    language: "English"
  },
  {
    id: "book5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImage: getBookCoverUrl(4),
    category: "Fantasy",
    description: "A fantasy novel about the adventures of hobbit Bilbo Baggins who sets out on a quest to win a share of a treasure guarded by a dragon.",
    available: true,
    isbn: "9780261103283",
    publishedYear: 1937,
    publisher: "HarperCollins",
    language: "English"
  },
  {
    id: "book6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverImage: getBookCoverUrl(5),
    category: "Fiction",
    description: "A novel about the experiences of a teenager named Holden Caulfield after he is expelled from prep school.",
    available: true,
    isbn: "9780316769488",
    publishedYear: 1951,
    publisher: "Little, Brown and Company",
    language: "English"
  },
  {
    id: "book7",
    title: "Lord of the Flies",
    author: "William Golding",
    coverImage: getBookCoverUrl(0),
    category: "Fiction",
    description: "A novel about a group of British boys stranded on an uninhabited island and their disastrous attempt to govern themselves.",
    available: true,
    isbn: "9780571191475",
    publishedYear: 1954,
    publisher: "Faber and Faber",
    language: "English"
  },
  {
    id: "book8",
    title: "Moby Dick",
    author: "Herman Melville",
    coverImage: getBookCoverUrl(1),
    category: "Fiction",
    description: "A novel about the obsessive quest of Captain Ahab to seek revenge on a giant white sperm whale that bit off his leg.",
    available: true,
    isbn: "9780142437247",
    publishedYear: 1851,
    publisher: "Penguin Classics",
    language: "English"
  },
  {
    id: "book9",
    title: "Brave New World",
    author: "Aldous Huxley",
    coverImage: getBookCoverUrl(2),
    category: "Science Fiction",
    description: "A dystopian novel set in a futuristic world state where people are genetically engineered and conditioned to serve society.",
    available: true,
    isbn: "9780060850524",
    publishedYear: 1932,
    publisher: "Harper Perennial",
    language: "English"
  },
  {
    id: "book10",
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverImage: getBookCoverUrl(3),
    category: "Fiction",
    description: "A novel about a young Andalusian shepherd who dreams of finding treasure at the Egyptian pyramids and embarks on a journey of self-discovery.",
    available: true,
    isbn: "9780062315007",
    publishedYear: 1988,
    publisher: "HarperOne",
    language: "Portuguese"
  }
];

// Mock Borrowed Books
const getDueDate = (borrowDate: Date, days: number) => {
  const dueDate = new Date(borrowDate);
  dueDate.setDate(dueDate.getDate() + days);
  return dueDate;
};

export const mockBorrowedBooks: BorrowedBook[] = [
  {
    ...mockBooks.find(b => b.id === "book1")!,
    borrowDate: new Date(2023, 3, 10),
    dueDate: getDueDate(new Date(2023, 3, 10), 14),
    isOverdue: false
  },
  {
    ...mockBooks.find(b => b.id === "book2")!,
    borrowDate: new Date(2023, 3, 5),
    dueDate: getDueDate(new Date(2023, 3, 5), 14),
    isOverdue: false
  },
  {
    ...mockBooks.find(b => b.id === "book3")!,
    borrowDate: new Date(2023, 2, 20),
    dueDate: getDueDate(new Date(2023, 2, 20), 14),
    isOverdue: true
  }
];

// Mock Book History (past borrowed books)
export const mockBookHistory: BorrowedBook[] = [
  {
    ...mockBooks.find(b => b.id === "book5")!,
    borrowDate: new Date(2023, 1, 10),
    dueDate: getDueDate(new Date(2023, 1, 10), 14),
    returnDate: new Date(2023, 1, 20),
    isOverdue: false
  },
  {
    ...mockBooks.find(b => b.id === "book7")!,
    borrowDate: new Date(2023, 0, 5),
    dueDate: getDueDate(new Date(2023, 0, 5), 14),
    returnDate: new Date(2023, 0, 18),
    isOverdue: false
  },
  {
    ...mockBooks.find(b => b.id === "book4")!,
    borrowDate: new Date(2022, 11, 10),
    dueDate: getDueDate(new Date(2022, 11, 10), 14),
    returnDate: new Date(2023, 0, 2),
    isOverdue: true
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: "notif1",
    userId: "user1",
    title: "Book Due Soon",
    message: "Your book 'The Great Gatsby' is due in 2 days.",
    date: new Date(2023, 3, 22),
    read: false,
    type: "due_soon"
  },
  {
    id: "notif2",
    userId: "user1",
    title: "Book Overdue",
    message: "Your book '1984' is overdue. Please return it as soon as possible.",
    date: new Date(2023, 3, 15),
    read: true,
    type: "overdue"
  },
  {
    id: "notif3",
    userId: "user1",
    title: "Book Available",
    message: "A book on your wishlist 'Dune' is now available.",
    date: new Date(2023, 3, 10),
    read: false,
    type: "available"
  },
  {
    id: "notif4",
    userId: "user2",
    title: "Book Due Soon",
    message: "Your book 'To Kill a Mockingbird' is due in 3 days.",
    date: new Date(2023, 3, 16),
    read: false,
    type: "due_soon"
  }
];

// Helper functions for the application
export const getBookById = (id: string): Book | undefined => {
  return mockBooks.find(book => book.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getUserBorrowedBooks = (userId: string): BorrowedBook[] => {
  const user = getUserById(userId);
  if (!user) return [];
  
  return user.borrowedBooks.map(bookId => {
    const book = getBookById(bookId);
    if (!book) throw new Error(`Book not found: ${bookId}`);
    
    const borrowedBook = mockBorrowedBooks.find(b => b.id === bookId);
    if (!borrowedBook) throw new Error(`Borrowed book not found: ${bookId}`);
    
    return borrowedBook;
  });
};

export const getUserBookHistory = (userId: string): BorrowedBook[] => {
  const user = getUserById(userId);
  if (!user) return [];
  
  return user.bookHistory.map(bookId => {
    const historyBook = mockBookHistory.find(b => b.id === bookId);
    if (!historyBook) throw new Error(`History book not found: ${bookId}`);
    
    return historyBook;
  });
};

export const getUserNotifications = (userId: string): Notification[] => {
  return mockNotifications.filter(notif => notif.userId === userId);
};

export const getFormattedDueDate = (dueDate: Date): string => {
  return formatDistanceToNow(dueDate, { addSuffix: true });
};
