"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  ExternalLink,
  BookmarkCheck,
  LayoutGrid,
  List,
  X,
  Code2,
  Palette,
  Brain,
  Building2,
  GraduationCap,
  Rocket,
  Music,
  Copy,
  Globe,
  ShoppingBag,
  Plane,
  Briefcase,
  Lightbulb,
  Share2,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Tool, tools } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useAppStore } from "@/lib/store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SplashScreen from "@/components/SplashScreen";
import { translations } from "@/lib/translations";

// Define categories from tools
const categories = Array.from(new Set(tools.map((tool) => tool.category)));

// Get category icon based on category name
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Development":
      return <Code2 className="h-4 w-4" />;
    case "Design":
      return <Palette className="h-4 w-4" />;
    case "Productivity":
      return <Lightbulb className="h-4 w-4" />;
    case "Social Media":
      return <Share2 className="h-4 w-4" />;
    case "AI & ML":
      return <Brain className="h-4 w-4" />;
    case "Government":
      return <Building2 className="h-4 w-4" />;
    case "Education":
      return <GraduationCap className="h-4 w-4" />;
    case "Entertainment":
      return <Music className="h-4 w-4" />;
    case "Shopping":
      return <ShoppingBag className="h-4 w-4" />;
    case "Travel":
      return <Plane className="h-4 w-4" />;
    case "Finance":
      return <Briefcase className="h-4 w-4" />;
    case "Business":
      return <Globe className="h-4 w-4" />;
    case "Learning":
      return <Sparkles className="h-4 w-4" />;
    default:
      return <Rocket className="h-4 w-4" />;
  }
};

function HomePage() {
  const { favorites, toggleFavorite, addToRecentlyViewed, language, setLanguage } = useAppStore();
  const t = translations[language];

  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [toolsList, setToolsList] = useState<Tool[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver>();
  const scrollPositionRef = useRef(0);
  const [showSplash, setShowSplash] = useState(true);

  // Debounced search query
  const searchQuery = useDebounce(searchInput, 300);

  // Intersection Observer for infinite scroll
  const lastToolElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          scrollPositionRef.current = window.scrollY;
          setPage((prevPage) => prevPage + 1);
        }
      });
      observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Fetch tools from API
  const fetchTools = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        ...(searchQuery && { query: searchQuery }),
        ...(selectedCategory && { category: selectedCategory }),
      });

      const response = await fetch(`/api/tools?${params}`);
      if (!response.ok) throw new Error("Failed to fetch tools");
      const data = await response.json();

      setToolsList((prevTools) => (page === 1 ? data.tools : [...prevTools, ...data.tools]));
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching tools:", error);
      toast.error("Failed to load tools. Please try again.");
    } finally {
      setLoading(false);
      if (page > 1) {
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPositionRef.current);
        });
      }
    }
  }, [page, searchQuery, selectedCategory]);

  // Reset tools list when search or category changes
  useEffect(() => {
    scrollPositionRef.current = 0;
    setPage(1);
    setToolsList([]);
  }, [searchQuery, selectedCategory]);

  // Fetch tools on page change
  useEffect(() => {
    fetchTools();
  }, [fetchTools, page]);

  // Simulate loading delay for tools
  useEffect(() => {
    const initializeTools = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
      } catch (error) {
        console.error("Error loading tools:", error);
      } finally {
        setLoading(false);
      }
    };
    initializeTools();
  }, []);

  // Show splash screen for first-time visitors
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    if (hasVisited) {
      setShowSplash(false);
    } else {
      const timer = setTimeout(() => {
        localStorage.setItem("hasVisitedBefore", "true");
        setShowSplash(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Toggle bookmark for a tool
  const handleToggleBookmark = (tool: Tool) => {
    toggleFavorite(tool.id);
    const isBookmarked = favorites.includes(tool.id);
    toast(
      isBookmarked
        ? `${tool.title} ${t.removedFromBookmarks}`
        : `${tool.title} ${t.addedToBookmarks}`,
      {
        icon: isBookmarked ? "🗑️" : "🔖",
        duration: 2000,
        className: cn(
          "group border",
          isBookmarked
            ? "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
            : "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
        ),
      }
    );
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <SplashScreen onFinish={() => {}} />
          </motion.div>
        )}
      </AnimatePresence>
      <main className={cn("flex-1", showSplash && "hidden")}>
        <div className="container py-4 md:py-6 px-4 md:px-6 space-y-6 md:space-y-8">
          {/* Header */}
          <div className="space-y-6">
            <div className="flex flex-col gap-4 md:gap-6">
              {/* Title and View Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-heading">
                    {t.title}
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">
                    {t.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                    className="hover:bg-accent dark:hover:bg-accent/50"
                  >
                    <span className="font-medium text-sm">{language === "en" ? "हि" : "EN"}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsGridView(true)}
                    className={cn(
                      "hover:bg-accent dark:hover:bg-accent/50",
                      isGridView && "bg-accent dark:bg-accent/50 text-accent-foreground"
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsGridView(false)}
                    className={cn(
                      "hover:bg-accent dark:hover:bg-accent/50",
                      !isGridView && "bg-accent dark:bg-accent/50 text-accent-foreground"
                    )}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative w-full max-w-2xl mx-auto">
                <div className="relative flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      className="pl-11 pr-11 h-12 text-base bg-background dark:bg-zinc-900/50 border-border/50 focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:rounded-r-none"
                      onChange={(e) => setSearchInput(e.target.value)}
                      value={searchInput}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setPage(1);
                          fetchTools();
                        }
                      }}
                    />
                    {searchInput && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-accent dark:hover:bg-accent/50"
                        onClick={() => setSearchInput("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Button
                    className="h-12 px-6 sm:rounded-l-none bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 transition-colors"
                    onClick={() => {
                      setPage(1);
                      fetchTools();
                    }}
                  >
                    <Search className="h-4 w-4" />
                    {t.searchButton}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">{t.searchHint}</p>
              </div>

              {/* Categories */}
              <div className="scrollbar-hide overflow-x-auto -mx-4 px-4 pb-2">
                <div className="flex flex-nowrap gap-2 min-w-max">
                  <Button
                    key="category-all"
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                    className={cn(
                      "rounded-full transition-colors whitespace-nowrap",
                      selectedCategory === null && "dark:bg-zinc-800 dark:hover:bg-zinc-700"
                    )}
                  >
                    {t.allCategory}
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={`category-filter-${category}`}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      className={cn(
                        "rounded-full transition-colors whitespace-nowrap",
                        selectedCategory === category && "dark:bg-zinc-800 dark:hover:bg-zinc-700"
                      )}
                    >
                      {getCategoryIcon(category)}
                      <span className="ml-2">{category}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Tools grid */}
              <div className="relative min-h-[200px]">
                <AnimatePresence mode="wait">
                  {loading && (
                    <div className="grid gap-4 animate-fade-in">
                      {Array.from({ length: isGridView ? 6 : 3 }).map((_, i) => (
                        <Card key={`skeleton-${i}`} className="h-[300px] flex flex-col">
                          <CardHeader className="flex-none">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-4 w-full">
                                <div className="space-y-2 w-full">
                                  <Skeleton className="h-6 w-3/4" />
                                  <Skeleton className="h-4 w-full" />
                                </div>
                              </div>
                              <Skeleton className="h-8 w-8 rounded-lg" />
                            </div>
                          </CardHeader>
                          <CardContent className="flex-1 space-y-4">
                            <div className="flex flex-wrap gap-2">
                              <Skeleton className="h-6 w-24 rounded-full" />
                              <Skeleton className="h-6 w-20 rounded-full" />
                              <Skeleton className="h-6 w-28 rounded-full" />
                            </div>
                          </CardContent>
                          <CardFooter className="flex-none pt-2">
                            <Skeleton className="h-10 w-full rounded-md" />
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                  <motion.div
                    key="tools-grid"
                    className={cn(
                      "grid gap-4",
                      isGridView && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
                      !isGridView && "grid-cols-1"
                    )}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {toolsList.map((tool, index) => (
                      <motion.div
                        key={`tool-item-${tool.id}-${index}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        ref={index === toolsList.length - 1 ? lastToolElementRef : undefined}
                      >
                        <Card className="group relative backdrop-blur-sm bg-card/50 hover:bg-accent/50 border-border/50 dark:border-zinc-800 transition-all duration-200 h-[300px] flex flex-col card-hover-effect">
                          <CardHeader className="flex-none">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-4">
                                <div className="space-y-1">
                                  <CardTitle className="text-xl font-bold text-foreground">
                                    {tool.title}
                                  </CardTitle>
                                  <CardDescription className="line-clamp-2">
                                    {tool.description}
                                  </CardDescription>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                  "hover:bg-accent -mr-2 -mt-2 text-muted-foreground hover:text-primary",
                                  tool.category === "Government" && "hover:text-government",
                                  tool.category === "Social Media" && "hover:text-social"
                                )}
                                onClick={() => handleToggleBookmark(tool)}
                              >
                                <BookmarkCheck
                                  className={cn(
                                    "h-5 w-5",
                                    favorites.includes(tool.id) && "fill-primary text-primary"
                                  )}
                                />
                              </Button>
                            </div>
                          </CardHeader>

                          <CardContent className="flex-1 space-y-4">
                            <div className="flex flex-wrap gap-2">
                              <span
                                className={cn(
                                  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset transition-colors",
                                  tool.category === "Government" &&
                                    "bg-government/10 text-government ring-government/30",
                                  tool.category === "Social Media" &&
                                    "bg-social/10 text-social ring-social/30",
                                  tool.category === "Entertainment" &&
                                    "bg-entertainment/10 text-entertainment ring-entertainment/30",
                                  tool.category === "Productivity" &&
                                    "bg-productivity/10 text-productivity ring-productivity/30",
                                  tool.category === "Business" &&
                                    "bg-business/10 text-business ring-business/30",
                                  tool.category === "Finance" &&
                                    "bg-finance/10 text-finance ring-finance/30",
                                  tool.category === "Education" &&
                                    "bg-education/10 text-education ring-education/30",
                                  tool.category === "Shopping" &&
                                    "bg-shopping/10 text-shopping ring-shopping/30",
                                  tool.category === "Travel" &&
                                    "bg-travel/10 text-travel ring-travel/30"
                                )}
                              >
                                {getCategoryIcon(tool.category)}
                                <span className="ml-1">{tool.category}</span>
                              </span>
                              {tool.tags?.map((tag) => (
                                <span
                                  key={`tool-${tool.id}-tag-${tag}`}
                                  className="inline-flex items-center rounded-full bg-primary/5 dark:bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </CardContent>

                          <CardFooter className="flex-none pt-2">
                            <Dialog
                              open={selectedTool === tool.id}
                              onOpenChange={(isOpen) => setSelectedTool(isOpen ? tool.id : null)}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full bg-background/50 hover:bg-background dark:bg-zinc-900/50 dark:hover:bg-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 border-border/50 dark:border-zinc-800 dark:text-zinc-100 group-hover:border-primary/50"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4 text-foreground/70 dark:text-zinc-100 transition-transform group-hover:scale-110" />
                                  Visit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-sm border-border/50">
                                <DialogHeader className="border-none">
                                  <DialogTitle>
                                    <div className="flex items-center gap-3">
                                      <div className="relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-25"></div>
                                        <h3 className="relative font-heading font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                                          {tool.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                                          <Globe className="h-3.5 w-3.5" />
                                          {new URL(tool.url).hostname}
                                        </p>
                                      </div>
                                    </div>
                                  </DialogTitle>
                                  <div className="pt-4">
                                    <DialogDescription asChild>
                                      <div className="relative p-4 bg-primary/5 rounded-lg border border-primary/10">
                                        <div className="absolute top-0 left-4 -translate-y-1/2 px-2 bg-background/95 backdrop-blur-sm">
                                          <span className="text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                                            {t.about}
                                          </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                          {tool.description}
                                        </p>
                                      </div>
                                    </DialogDescription>
                                  </div>
                                </DialogHeader>

                                <div className="flex flex-col space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                  <div className="flex flex-wrap gap-2 py-4">
                                    <div className="w-full flex flex-wrap gap-2">
                                      <span
                                        className={cn(
                                          "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset transition-colors shadow-sm hover:shadow-md",
                                          tool.category === "Government" &&
                                            "bg-government/10 text-government ring-government/30",
                                          tool.category === "Social Media" &&
                                            "bg-social/10 text-social ring-social/30",
                                          tool.category === "Entertainment" &&
                                            "bg-entertainment/10 text-entertainment ring-entertainment/30",
                                          tool.category === "Productivity" &&
                                            "bg-productivity/10 text-productivity ring-productivity/30",
                                          tool.category === "Business" &&
                                            "bg-business/10 text-business ring-business/30",
                                          tool.category === "Finance" &&
                                            "bg-finance/10 text-finance ring-finance/30",
                                          tool.category === "Education" &&
                                            "bg-education/10 text-education ring-education/30",
                                          tool.category === "Shopping" &&
                                            "bg-shopping/10 text-shopping ring-shopping/30",
                                          tool.category === "Travel" &&
                                            "bg-travel/10 text-travel ring-travel/30"
                                        )}
                                      >
                                        {getCategoryIcon(tool.category)}
                                        <span className="ml-1">{tool.category}</span>
                                      </span>
                                      {tool.tags?.map((tag) => (
                                        <span
                                          key={`dialog-${tool.id}-tag-${tag}`}
                                          className="inline-flex items-center rounded-full bg-primary/5 dark:bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 shadow-sm hover:shadow-md transition-all duration-200"
                                        >
                                          <Sparkles className="h-3.5 w-3.5 mr-1" />
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  {tool.features && tool.features.length > 0 && (
                                    <div className="relative p-4 bg-primary/5 rounded-lg border border-primary/10">
                                      <div className="absolute top-0 left-4 -translate-y-1/2 px-2 bg-background/95 backdrop-blur-sm">
                                        <span className="text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                                          {t.keyFeatures}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-1 gap-2 pt-2">
                                        {tool.features?.map((feature, index) => (
                                          <div
                                            key={`tool-${tool.id}-feature-${index}`}
                                            className="group flex items-center gap-3 text-sm p-3 rounded-lg bg-background hover:bg-primary/5 transition-all duration-200 hover:shadow-md"
                                          >
                                            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-primary/50 group-hover:scale-110 transition-transform" />
                                            <span className="group-hover:text-primary transition-colors">
                                              {feature}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2 mt-4 border-t pt-4">
                                  <Button
                                    className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary hover:shadow-md transition-all duration-200"
                                    variant="ghost"
                                    onClick={() => {
                                      navigator.clipboard.writeText(tool.url);
                                      toast.success(t.linkCopied);
                                    }}
                                  >
                                    <Copy className="mr-2 h-4 w-4" />
                                    {t.copyLink}
                                  </Button>
                                  <Button
                                    className="flex-1 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                                    onClick={() => {
                                      addToRecentlyViewed(tool);
                                      window.open(tool.url, "_blank", "noopener,noreferrer");
                                    }}
                                  >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    {t.openWebsite}
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* No results */}
                {!loading && toolsList.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="text-muted-foreground mb-2">
                      <Search className="h-12 w-12" />
                    </div>
                    <h3 className="text-lg font-medium">{t.noResults}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t.noResultsHint}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;