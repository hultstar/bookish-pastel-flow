
import { Book } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface BookCardProps {
  book: Book;
  onBorrow?: (bookId: string) => void;
}

const BookCard = ({ book, onBorrow }: BookCardProps) => {
  // Fallback image in case the book cover fails to load
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://via.placeholder.com/300x450/6C8EAD/FFFFFF?text=No+Cover";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={book.coverImage} 
          alt={`${book.title} cover`} 
          className="w-full h-56 object-cover"
          onError={handleImageError}
        />
        <div className="absolute top-2 right-2">
          <Badge variant={book.available ? "default" : "outline"} className={book.available ? "bg-green-500" : "bg-gray-200 text-gray-700"}>
            {book.available ? "Available" : "Borrowed"}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
        <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
        
        <div className="flex items-center mb-3">
          <Badge variant="secondary" className="bg-library-lavender text-library-purple">
            {book.category}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 h-10">
          {book.description}
        </p>
        
        <div className="flex justify-between items-center">
          <Link to={`/books/${book.id}`}>
            <Button variant="outline" size="sm">
              Details
            </Button>
          </Link>
          
          {book.available && onBorrow && (
            <Button 
              size="sm" 
              className="bg-library-purple hover:bg-library-purple/90"
              onClick={() => onBorrow(book.id)}
            >
              Borrow
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
