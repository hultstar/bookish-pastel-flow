
import { useState } from "react";
import { mockBooks, Book, categories } from "@/lib/mockData";
import BookCard from "@/components/books/BookCard";
import NavigationBar from "@/components/layout/NavigationBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [availableOnly, setAvailableOnly] = useState(false);

  const handleBorrow = (bookId: string) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === bookId ? { ...book, available: false } : book
      )
    );
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(prevCategory => 
      prevCategory === category ? null : category
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setAvailableOnly(false);
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
    
    const matchesAvailability = availableOnly ? book.available : true;
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavigationBar />
      
      <div className="pt-24 pb-16 px-4 md:px-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by title or author..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="flex items-center">
              <Button
                variant="outline"
                className={availableOnly ? "bg-library-lavender text-library-purple border-library-purple" : ""}
                onClick={() => setAvailableOnly(!availableOnly)}
              >
                Available Only
              </Button>
              
              {(searchTerm || selectedCategory || availableOnly) && (
                <Button
                  variant="ghost"
                  className="ml-2"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex space-x-2">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedCategory === category 
                    ? "bg-library-purple hover:bg-library-purple/90" 
                    : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onBorrow={handleBorrow}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800">No books found</h2>
              <p className="mt-2 text-gray-600">Try changing your search filters</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
