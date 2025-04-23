
import { Book } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ImageOff } from "lucide-react";

interface BookCardProps {
  book: Book;
  onBorrow?: (bookId: string) => void;
}

const BookCard = ({ book, onBorrow }: BookCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Enhanced fallback image handler
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    console.log(`Image failed to load for book: ${book.title}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-56">
        {!imageError ? (
          <img 
            src={book.coverImage} 
            alt={`${book.title} cover`} 
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-library-blue/20 flex flex-col items-center justify-center p-4 text-center">
            <ImageOff className="h-10 w-10 text-library-blue mb-2" />
            <p className="font-medium text-library-blue">{book.title}</p>
            <p className="text-sm text-gray-500">Cover unavailable</p>
          </div>
        )}
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
