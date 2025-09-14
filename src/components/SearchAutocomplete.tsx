import { useState, useEffect, useRef } from "react";
import { Search, Clock, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SearchAutocompleteProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchAutocomplete = ({ onSearch, placeholder = "Search for food, groceries..." }: SearchAutocompleteProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const trendingSearches = [
    "Pizza", "Burgers", "Fresh Vegetables", "Dairy Products", "Healthy Bowls", "Beverages"
  ];

  const recentSearches = [
    "Margherita Pizza", "Fresh Fruits", "Organic Vegetables"
  ];

  useEffect(() => {
    if (query.length > 0) {
      // Simulate API call for suggestions
      const filtered = [
        ...trendingSearches.filter(item => 
          item.toLowerCase().includes(query.toLowerCase())
        ),
        `Search for "${query}"`
      ];
      setSuggestions(filtered.slice(0, 6));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length === 0 && setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            className="w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground shadow-elegant"
          />
        </div>
      </form>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-4 glass-card bg-white/95 backdrop-blur-sm shadow-elegant z-50 animate-fade-in">
          {query.length === 0 ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending Searches
                </h4>
                <div className="space-y-1">
                  {trendingSearches.slice(0, 4).map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(item)}
                      className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {recentSearches.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Recent Searches
                  </h4>
                  <div className="space-y-1">
                    {recentSearches.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(item)}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded-lg transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="block w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted/50 rounded-lg transition-colors flex items-center"
                >
                  <Search className="w-4 h-4 mr-3 text-muted-foreground" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default SearchAutocomplete;