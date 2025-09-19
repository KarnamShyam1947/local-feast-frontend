import { useState, useEffect, useRef } from "react";
import { Search, Clock, TrendingUp, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface SearchSuggestion {
  id: string;
  text: string;
  type: "food" | "restaurant" | "cuisine" | "recent";
  subtitle?: string;
  icon?: string;
}

interface SearchAutocompleteProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchAutocomplete = ({ onSearch, className = "", placeholder = "Search for food, restaurants..." }: SearchAutocompleteProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const mockSuggestions: SearchSuggestion[] = [
    { id: "1", text: "Pizza", type: "food", subtitle: "Italian cuisine" },
    { id: "2", text: "Burger", type: "food", subtitle: "Fast food" },
    { id: "3", text: "Sushi", type: "food", subtitle: "Japanese cuisine" },
    { id: "4", text: "Artisan Pizza Kitchen", type: "restaurant", subtitle: "4.8★ • 25-35 min" },
    { id: "5", text: "Fresh Market Express", type: "restaurant", subtitle: "4.6★ • 15-25 min" },
    { id: "6", text: "Italian", type: "cuisine", subtitle: "12 restaurants available" },
    { id: "7", text: "Chinese", type: "cuisine", subtitle: "8 restaurants available" },
    { id: "8", text: "Biryani", type: "recent", subtitle: "Searched recently" },
    { id: "9", text: "Chicken Tikka", type: "recent", subtitle: "Searched recently" },
  ];

  const popularSearches = [
    "Pizza", "Burger", "Biryani", "Chinese", "Desserts"
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsOpen(false);
    onSearch(searchQuery);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "food":
        return "🍽️";
      case "restaurant":
        return "🏪";
      case "cuisine":
        return "🌍";
      case "recent":
        return <Clock className="w-4 h-4 text-muted-foreground" />;
      default:
        return "🔍";
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="pl-12 pr-4 py-3 bg-white/95 backdrop-blur-sm border-0 focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground rounded-2xl"
          />
        </div>
      </form>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-border/20 shadow-elegant z-50 max-h-96 overflow-y-auto">
          {query.length === 0 ? (
            <div className="p-4">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                  Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="px-3 py-1 bg-muted/50 hover:bg-muted rounded-full text-sm text-foreground transition-colors hover-scale"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  Near You
                </h4>
                <div className="space-y-2">
                  {mockSuggestions.filter(s => s.type === "restaurant").slice(0, 3).map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSearch(suggestion.text)}
                      className="w-full text-left p-2 hover:bg-muted/50 rounded-lg transition-colors flex items-center space-x-3"
                    >
                      <span className="text-lg">{getIcon(suggestion.type)}</span>
                      <div>
                        <div className="text-sm font-medium text-foreground">{suggestion.text}</div>
                        <div className="text-xs text-muted-foreground">{suggestion.subtitle}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-2">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSearch(suggestion.text)}
                    className="w-full text-left p-3 hover:bg-muted/50 rounded-lg transition-colors flex items-center space-x-3"
                  >
                    <span className="text-lg">{getIcon(suggestion.type)}</span>
                    <div>
                      <div className="text-sm font-medium text-foreground">{suggestion.text}</div>
                      {suggestion.subtitle && (
                        <div className="text-xs text-muted-foreground">{suggestion.subtitle}</div>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No results found for "{query}"</p>
                </div>
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default SearchAutocomplete;