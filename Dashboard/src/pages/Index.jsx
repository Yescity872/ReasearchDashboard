// import { useState, useEffect } from "react";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/ui/app-sidebar";
// import { DataTable } from "@/components/DataTable";
// import { CategoryFormDialog } from "@/components/CategoryFormDialog";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { categoryApi } from "@/services/api";
// import { 
//   Building2, 
//   MapPin, 
//   Layers, 
//   Plus, 
//   RefreshCw, 
//   Sparkles,
//   ChevronRight,
//   TrendingUp
// } from "lucide-react";

// const Index = () => {
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [categoryData, setCategoryData] = useState([]);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // Keys for persistence
//   const STORAGE_KEYS = {
//     city: "yc:selectedCity",
//     category: "yc:selectedCategory",
//   };

//   // Rehydrate selections on first load
//   useEffect(() => {
//     try {
//       const persistedCity = localStorage.getItem(STORAGE_KEYS.city);
//       const persistedCategory = localStorage.getItem(STORAGE_KEYS.category);
//       if (persistedCity) {
//         setSelectedCity(JSON.parse(persistedCity));
//       }
//       if (persistedCategory) {
//         setSelectedCategory(JSON.parse(persistedCategory));
//       }
//     } catch (error) {
//       console.error("Failed to load persisted selections", error);
//     }
//   }, []);

//   // Persist selections when they change
//   useEffect(() => {
//     try {
//       if (selectedCity && selectedCategory) {
//         localStorage.setItem(STORAGE_KEYS.city, JSON.stringify(selectedCity));
//         localStorage.setItem(STORAGE_KEYS.category, JSON.stringify(selectedCategory));
//       } else {
//         localStorage.removeItem(STORAGE_KEYS.city);
//         localStorage.removeItem(STORAGE_KEYS.category);
//       }
//     } catch (error) {
//       console.error("Failed to persist selections", error);
//     }
//   }, [selectedCity, selectedCategory]);

//   const fetchCategoryData = async () => {
//     if (!selectedCity || !selectedCategory) return;

//     try {
//       setLoading(true);
//       const response = await categoryApi.getByCity(selectedCategory, selectedCity.cityId);
//       setCategoryData(response.data);
//     } catch (error) {
//       console.error("Failed to fetch category data:", error);
//       setCategoryData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddData = () => {
//     if (!selectedCity || !selectedCategory) return;
//     setEditData(null);
//     setShowAddForm(true);
//   };

//   const handleGetData = () => {
//     fetchCategoryData();
//   };

//   const handleEdit = (item) => {
//     setEditData(item);
//     setShowEditForm(true);
//   };

//   const handleFormSuccess = () => {
//     fetchCategoryData();
//   };

//   // Auto-fetch data when city or category changes
//   useEffect(() => {
//     if (selectedCity && selectedCategory) {
//       fetchCategoryData();
//     } else {
//       setCategoryData([]);
//     }
//   }, [selectedCity, selectedCategory]);

//   return (
//     <SidebarProvider>
//       <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
//         {/* Sidebar - Fixed width that pushes content */}
//         <div 
//           className={`
//             flex-shrink-0 border-r border-border/30 bg-white/80 backdrop-blur-sm
//             transition-all duration-300 ease-in-out
//             ${sidebarCollapsed ? 'w-20' : 'w-80'}
//             hidden md:block
//           `}
//           style={{
//             minWidth: sidebarCollapsed ? '80px' : '320px'
//           }}
//         >
//           <AppSidebar
//             selectedCity={selectedCity}
//             onCitySelect={setSelectedCity}
//             selectedCategory={selectedCategory}
//             onCategorySelect={setSelectedCategory}
//             onAddData={handleAddData}
//             onGetData={handleGetData}
//             collapsed={sidebarCollapsed}
//             onCollapse={setSidebarCollapsed}
//           />
//         </div>

//         {/* Mobile Sidebar Overlay */}
//         <div className="md:hidden">
//           <AppSidebar
//             selectedCity={selectedCity}
//             onCitySelect={setSelectedCity}
//             selectedCategory={selectedCategory}
//             onCategorySelect={setSelectedCategory}
//             onAddData={handleAddData}
//             onGetData={handleGetData}
//             collapsed={false}
//             onCollapse={setSidebarCollapsed}
//             mobile={true}
//           />
//         </div>
        
//         {/* Main Content - Expands to fill remaining space */}
//         <div 
//           className={`
//             flex-1 flex flex-col min-w-0 transition-all duration-300
//             ${sidebarCollapsed ? 'md:ml-0' : 'md:ml-0'}
//           `}
//           style={{
//             marginLeft: sidebarCollapsed ? '0' : '0',
//             width: sidebarCollapsed ? 'calc(100vw - 80px)' : 'calc(100vw - 320px)'
//           }}
//         >
//           {/* Header - Full width of main container */}
//           <header className="h-20 border-b border-border/30 bg-white/80 backdrop-blur-sm flex items-center px-4 md:px-6 lg:px-8 sticky top-0 z-20 shadow-sm w-full">
//             <div className="flex items-center w-full">
//               <SidebarTrigger className="md:hidden" />
              
//               <div className="flex items-center gap-4 min-w-0 flex-1 ml-2 md:ml-0">
//                 <div className="relative">
//                   <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
//                     <Building2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
//                   </div>
//                   <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
//                     <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-white" />
//                   </div>
//                 </div>
                
//                 <div className="min-w-0 flex-1">
//                   <h1 className="font-bold text-xl md:text-2xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
//                     City Management Dashboard
//                   </h1>
//                   {selectedCity && (
//                     <div className="flex items-center gap-2 mt-1 flex-wrap">
//                       <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1 text-xs">
//                         <MapPin className="w-3 h-3" />
//                         <span className="font-medium">{selectedCity.cityName}</span>
//                       </Badge>
//                       {selectedCategory && (
//                         <>
//                           <ChevronRight className="w-3 h-3 text-muted-foreground" />
//                           <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 text-xs">
//                             <Layers className="w-3 h-3" />
//                             <span>{selectedCategory}</span>
//                           </Badge>
//                         </>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {selectedCity && selectedCategory && (
//                 <div className="flex items-center gap-2 ml-4">
//                   <Button 
//                     onClick={handleAddData}
//                     className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25"
//                     size="sm"
//                   >
//                     <Plus className="w-4 h-4 mr-1 md:mr-2" />
//                     <span className="hidden md:inline">Add Data</span>
//                     <span className="md:hidden">Add</span>
//                   </Button>
//                   <Button 
//                     onClick={handleGetData}
//                     variant="outline"
//                     size="sm"
//                     disabled={loading}
//                     className="hidden md:flex"
//                   >
//                     <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
//                     Refresh
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </header>

//           {/* Main Content Area */}
//           <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto w-full">
//             {!selectedCity ? (
//               <div className="flex items-center justify-center h-full min-h-[70vh] w-full">
//                 <Card className="w-full max-w-2xl mx-auto text-center shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50/50">
//                   <CardContent className="p-8 md:p-12">
//                     <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg">
//                       <div className="relative">
//                         <Building2 className="w-12 h-12 md:w-16 md:h-16 text-blue-600" />
//                         <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-500 absolute -top-1 -right-1 md:-top-2 md:-right-2" />
//                       </div>
//                     </div>
//                     <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
//                       Welcome to City Manager
//                     </h2>
//                     <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto leading-relaxed">
//                       Select a city from the sidebar to start managing its data across different categories with beautiful visualizations.
//                     </p>
//                     <div className="flex items-center justify-center gap-2 md:gap-3 text-sm text-muted-foreground animate-pulse">
//                       <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
//                       <span>Choose a city from the sidebar to get started</span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             ) : !selectedCategory ? (
//               <div className="flex items-center justify-center h-full min-h-[70vh] w-full">
//                 <Card className="w-full max-w-2xl mx-auto text-center shadow-2xl border-0 bg-gradient-to-br from-white to-green-50/50">
//                   <CardContent className="p-8 md:p-12">
//                     <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg">
//                       <MapPin className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
//                     </div>
//                     <div className="mb-4 md:mb-6">
//                       <Badge className="bg-green-100 text-green-700 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm mb-3 md:mb-4">
//                         City Selected
//                       </Badge>
//                       <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{selectedCity.cityName}</h2>
//                       <p className="text-muted-foreground text-sm md:text-base">Ready for data management</p>
//                     </div>
//                     <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto leading-relaxed">
//                       Now choose a category from the sidebar to manage specific data for {selectedCity.cityName}.
//                     </p>
//                     <div className="flex items-center justify-center gap-2 md:gap-3 text-sm text-muted-foreground animate-pulse">
//                       <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
//                       <span>Select a category to continue</span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             ) : (
//               <div className="space-y-6 w-full max-w-full mx-auto">
//                 {/* Enhanced Header Section */}
//                 <div className="bg-gradient-to-r from-white to-blue-50/30 rounded-2xl p-4 md:p-6 border border-border/20 shadow-sm">
//                   <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-3">
//                         <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
//                           <Layers className="w-4 h-4 md:w-5 md:h-5 text-white" />
//                         </div>
//                         <div>
//                           <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
//                             {selectedCategory}
//                           </h2>
//                           <p className="text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
//                             Managing <Badge variant="secondary">{categoryData.length} records</Badge> 
//                             for <span className="font-semibold text-slate-700">{selectedCity.cityName}</span>
//                           </p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center gap-2 md:gap-3">
//                       <Button 
//                         onClick={handleAddData}
//                         className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25"
//                         size="sm"
//                       >
//                         <Plus className="w-4 h-4 mr-1 md:mr-2" />
//                         <span className="hidden md:inline">Add New</span>
//                         <span className="md:hidden">Add</span>
//                       </Button>
//                       <Button 
//                         onClick={handleGetData}
//                         variant="outline"
//                         disabled={loading}
//                         size="sm"
//                       >
//                         <RefreshCw className={`w-4 h-4 mr-1 md:mr-2 ${loading ? 'animate-spin' : ''}`} />
//                         <span className="hidden md:inline">Refresh</span>
//                         <span className="md:hidden">Reload</span>
//                       </Button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Data Table Section */}
//                 <div className="bg-white rounded-2xl border border-border/20 shadow-sm overflow-hidden">
//                   {loading ? (
//                     <div className="p-6 md:p-8 space-y-4">
//                       <Skeleton className="h-8 w-full" />
//                       <Skeleton className="h-8 w-full" />
//                       <Skeleton className="h-8 w-full" />
//                       <Skeleton className="h-8 w-full" />
//                     </div>
//                   ) : (
//                     <DataTable
//                       data={categoryData}
//                       category={selectedCategory}
//                       onEdit={handleEdit}
//                       onDataChange={fetchCategoryData}
//                     />
//                   )}
//                 </div>

//                 {/* Stats Card */}
//                 {categoryData.length > 0 && (
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
//                     <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50">
//                       <CardContent className="p-3 md:p-4">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="text-xs md:text-sm font-medium text-blue-700">Total Records</p>
//                             <p className="text-xl md:text-2xl font-bold text-blue-900">{categoryData.length}</p>
//                           </div>
//                           <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
//                         </div>
//                       </CardContent>
//                     </Card>
//                     <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50">
//                       <CardContent className="p-3 md:p-4">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="text-xs md:text-sm font-medium text-green-700">Active</p>
//                             <p className="text-xl md:text-2xl font-bold text-green-900">{categoryData.length}</p>
//                           </div>
//                           <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
//                         </div>
//                       </CardContent>
//                     </Card>
//                     <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200/50">
//                       <CardContent className="p-3 md:p-4">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="text-xs md:text-sm font-medium text-purple-700">Last Updated</p>
//                             <p className="text-lg md:text-xl font-bold text-purple-900">Just now</p>
//                           </div>
//                           <RefreshCw className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )}
//               </div>
//             )}
//           </main>
//         </div>

//         {/* Forms */}
//         {selectedCity && selectedCategory && (
//           <>
//             <CategoryFormDialog
//               open={showAddForm}
//               onOpenChange={setShowAddForm}
//               category={selectedCategory}
//               city={selectedCity}
//               onSuccess={handleFormSuccess}
//             />
            
//             <CategoryFormDialog
//               open={showEditForm}
//               onOpenChange={setShowEditForm}
//               category={selectedCategory}
//               city={selectedCity}
//               editData={editData}
//               onSuccess={handleFormSuccess}
//             />
//           </>
//         )}
//       </div>
//     </SidebarProvider>
//   );
// };

// export default Index;

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { DataTable } from "@/components/DataTable";
import { CategoryFormDialog } from "@/components/CategoryFormDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
// import { ToastAction } from "@/components/ui/sonner";
// import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categoryApi } from "@/services/api";
import { 
  Building2, 
  MapPin, 
  Layers, 
  Plus, 
  RefreshCw, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Download,
  Upload,
  Filter,
  Search,
  BarChart3,
  Grid3X3,
  List,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react";

const Index = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table"); // table, grid, chart
  const [showStats, setShowStats] = useState(true);
  const [refreshProgress, setRefreshProgress] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [dataStats, setDataStats] = useState({});

  // const { toast } = useToast();

  // Keys for persistence
  const STORAGE_KEYS = {
    city: "yc:selectedCity",
    category: "yc:selectedCategory",
    viewMode: "yc:viewMode",
    showStats: "yc:showStats",
  };

  // Rehydrate selections on first load
  useEffect(() => {
    try {
      const persistedCity = localStorage.getItem(STORAGE_KEYS.city);
      const persistedCategory = localStorage.getItem(STORAGE_KEYS.category);
      const persistedViewMode = localStorage.getItem(STORAGE_KEYS.viewMode);
      const persistedShowStats = localStorage.getItem(STORAGE_KEYS.showStats);

      if (persistedCity) setSelectedCity(JSON.parse(persistedCity));
      if (persistedCategory) setSelectedCategory(JSON.parse(persistedCategory));
      if (persistedViewMode) setViewMode(persistedViewMode);
      if (persistedShowStats) setShowStats(JSON.parse(persistedShowStats));
    } catch (error) {
      console.error("Failed to load persisted selections", error);
    }
  }, []);

  // Persist selections when they change
  useEffect(() => {
    try {
      if (selectedCity) {
        localStorage.setItem(STORAGE_KEYS.city, JSON.stringify(selectedCity));
      }
      if (selectedCategory) {
        localStorage.setItem(STORAGE_KEYS.category, JSON.stringify(selectedCategory));
      }
      localStorage.setItem(STORAGE_KEYS.viewMode, viewMode);
      localStorage.setItem(STORAGE_KEYS.showStats, JSON.stringify(showStats));
    } catch (error) {
      console.error("Failed to persist selections", error);
    }
  }, [selectedCity, selectedCategory, viewMode, showStats]);

  // Calculate data statistics
  useEffect(() => {
    if (categoryData.length > 0) {
      const stats = {
        total: categoryData.length,
        active: categoryData.filter(item => item.status === 'active' || item.isActive).length,
        recent: categoryData.filter(item => {
          const daysAgo = (Date.now() - new Date(item.updatedAt || item.createdAt).getTime()) / (1000 * 3600 * 24);
          return daysAgo <= 7;
        }).length,
        // Add more stats based on your data structure
      };
      setDataStats(stats);
    }
  }, [categoryData]);

  // Filter data based on search term and filters
  useEffect(() => {
    if (!categoryData.length) {
      setFilteredData([]);
      return;
    }

    let filtered = categoryData;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(item => item[key] === value);
      }
    });

    setFilteredData(filtered);
  }, [categoryData, searchTerm, filters]);

  const fetchCategoryData = async () => {
    if (!selectedCity || !selectedCategory) return;

    try {
      setLoading(true);
      setError(null);
      setRefreshProgress(0);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setRefreshProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 100);

      const response = await categoryApi.getByCity(selectedCategory, selectedCity.cityId);
      setCategoryData(response.data);
      setLastUpdated(new Date());
      
      clearInterval(progressInterval);
      setRefreshProgress(100);
      
      setTimeout(() => setRefreshProgress(0), 1000);

      // toast({
      //   title: "Data loaded successfully",
      //   description: `Found ${response.data.length} records for ${selectedCategory}`,
      //   action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      // });

    } catch (error) {
      console.error("Failed to fetch category data:", error);
      setError("Failed to load data. Please try again.");
      setCategoryData([]);
      
      // toast({
      //   title: "Error loading data",
      //   description: "Please check your connection and try again.",
      //   variant: "destructive",
      //   action: <ToastAction altText="Retry" onClick={fetchCategoryData}>Retry</ToastAction>,
      // });
    } finally {
      setLoading(false);
    }
  };

  const handleAddData = () => {
    if (!selectedCity || !selectedCategory) {
      // toast({
      //   title: "Selection required",
      //   description: "Please select both a city and category first.",
      //   variant: "destructive",
      // });
      return;
    }
    setEditData(null);
    setShowAddForm(true);
  };

  const handleGetData = () => {
    fetchCategoryData();
  };

  const handleEdit = (item) => {
    setEditData(item);
    setShowEditForm(true);
  };

  const handleFormSuccess = () => {
    fetchCategoryData();
    // toast({
    //   title: "Success",
    //   description: "Data has been saved successfully.",
    //   action: <ToastAction altText="Close">Close</ToastAction>,
    // });
  };

  const handleExportData = () => {
    // Simple export to JSON
    const dataStr = JSON.stringify(categoryData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `${selectedCity.cityName}_${selectedCategory}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    // toast({
    //   title: "Data exported",
    //   description: `Data has been downloaded as ${exportFileDefaultName}`,
    // });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({});
  };

  // Auto-fetch data when city or category changes
  useEffect(() => {
    if (selectedCity && selectedCategory) {
      fetchCategoryData();
    } else {
      setCategoryData([]);
      setFilteredData([]);
    }
  }, [selectedCity, selectedCategory]);

  const getTimeAgo = (date) => {
    if (!date) return "Never";
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        {/* Sidebar */}
        <div 
          className={`
            flex-shrink-0 border-r border-border/30 bg-white/80 backdrop-blur-sm
            transition-all duration-300 ease-in-out
            ${sidebarCollapsed ? 'w-20' : 'w-80'}
            hidden md:block
          `}
          style={{
            minWidth: sidebarCollapsed ? '80px' : '320px'
          }}
        >
          <AppSidebar
            selectedCity={selectedCity}
            onCitySelect={setSelectedCity}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            onAddData={handleAddData}
            onGetData={handleGetData}
            collapsed={sidebarCollapsed}
            onCollapse={setSidebarCollapsed}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        <div className="md:hidden">
          <AppSidebar
            selectedCity={selectedCity}
            onCitySelect={setSelectedCity}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            onAddData={handleAddData}
            onGetData={handleGetData}
            collapsed={false}
            onCollapse={setSidebarCollapsed}
            mobile={true}
          />
        </div>
        
        {/* Main Content */}
        <div 
          className={`
            flex-1 flex flex-col min-w-0 transition-all duration-300
            ${sidebarCollapsed ? 'md:ml-0' : 'md:ml-0'}
          `}
          style={{
            marginLeft: sidebarCollapsed ? '0' : '0',
            width: sidebarCollapsed ? 'calc(100vw - 80px)' : 'calc(100vw - 320px)'
          }}
        >
          {/* Header */}
          <header className="h-20 border-b border-border/30 bg-white/80 backdrop-blur-sm flex items-center px-4 md:px-6 lg:px-8 sticky top-0 z-30 shadow-sm w-full">
            <div className="flex items-center w-full">
              <SidebarTrigger className="md:hidden" />
              
              <div className="flex items-center gap-4 min-w-0 flex-1 ml-2 md:ml-0">
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Building2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                    <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-white" />
                  </div>
                </div>
                
                <div className="min-w-0 flex-1">
                  <h1 className="font-bold text-xl md:text-2xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    City Management Dashboard
                  </h1>
                  {selectedCity && (
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1 text-xs">
                        <MapPin className="w-3 h-3" />
                        <span className="font-medium">{selectedCity.cityName}</span>
                      </Badge>
                      {selectedCategory && (
                        <>
                          <ChevronRight className="w-3 h-3 text-muted-foreground" />
                          <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 text-xs">
                            <Layers className="w-3 h-3" />
                            <span>{selectedCategory}</span>
                          </Badge>
                          {lastUpdated && (
                            <>
                              <ChevronRight className="w-3 h-3 text-muted-foreground" />
                              <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1 text-xs">
                                <Clock className="w-3 h-3" />
                                <span>{getTimeAgo(lastUpdated)}</span>
                              </Badge>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* {selectedCity && selectedCategory && (
                <div className="flex items-center gap-2 ml-4">
                  <Button 
                    onClick={handleAddData}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-1 md:mr-2" />
                    <span className="hidden md:inline">Add Data</span>
                    <span className="md:hidden">Add</span>
                  </Button>
                  <Button 
                    onClick={handleGetData}
                    variant="outline"
                    size="sm"
                    disabled={loading}
                  >
                    <RefreshCw className={`w-4 h-4 mr-1 md:mr-2 ${loading ? 'animate-spin' : ''}`} />
                    <span className="hidden md:inline">Refresh</span>
                  </Button>
                </div>
              )} */}
            </div>
          </header>

          {/* Progress Bar for Loading */}
          {refreshProgress > 0 && refreshProgress < 100 && (
            <div className="w-full px-4 md:px-6 lg:px-8 sticky top-20 z-20">
              <Progress value={refreshProgress} className="h-1 bg-blue-100" />
            </div>
          )}

          {/* Main Content Area */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto w-full">
            {!selectedCity ? (
              <WelcomeScreen />
            ) : !selectedCategory ? (
              <CitySelectedScreen city={selectedCity} />
            ) : (
              <div className="space-y-6 w-full max-w-full mx-auto">
                {/* Enhanced Header Section */}
                <div className="bg-gradient-to-r from-white to-blue-50/30 rounded-2xl p-4 md:p-6 border border-border/20 shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Layers className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            {selectedCategory}
                          </h2>
                          <p className="text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
                            Managing <Badge variant="secondary">{filteredData.length} records</Badge> 
                            for <span className="font-semibold text-slate-700">{selectedCity.cityName}</span>
                            {searchTerm && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Search className="w-3 h-3" />
                                Filtered
                              </Badge>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 md:gap-3">
                      <Button 
                        onClick={handleAddData}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25"
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-1 md:mr-2" />
                        <span className="hidden md:inline">Add New</span>
                      </Button>
                      <Button 
                        onClick={handleGetData}
                        variant="outline"
                        disabled={loading}
                        size="sm"
                      >
                        <RefreshCw className={`w-4 h-4 mr-1 md:mr-2 ${loading ? 'animate-spin' : ''}`} />
                        <span className="hidden md:inline">Refresh</span>
                      </Button>
                      <Button 
                        onClick={handleExportData}
                        variant="outline"
                        size="sm"
                        disabled={categoryData.length === 0}
                      >
                        <Download className="w-4 h-4 mr-1 md:mr-2" />
                        <span className="hidden md:inline">Export</span>
                      </Button>
                    </div>
                  </div>

                  {/* Search and Filter Bar */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="text"
                        placeholder={`Search in ${selectedCategory}...`}
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={clearFilters}>
                        <Filter className="w-4 h-4 mr-2" />
                        Clear Filters
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowStats(!showStats)}
                      >
                        {showStats ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                        Stats
                      </Button>
                    </div>
                  </div>
                </div>

                {/* View Mode Tabs */}
                <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="table" className="flex items-center gap-2">
                        <List className="w-4 h-4" />
                        Table
                      </TabsTrigger>
                      <TabsTrigger value="grid" className="flex items-center gap-2">
                        <Grid3X3 className="w-4 h-4" />
                        Grid
                      </TabsTrigger>
                      <TabsTrigger value="chart" className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Charts
                      </TabsTrigger>
                    </TabsList>
                    
                    <div className="text-sm text-muted-foreground">
                      Showing {filteredData.length} of {categoryData.length} records
                    </div>
                  </div>

                  {/* Stats Cards */}
                  {showStats && categoryData.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                      <StatCard
                        title="Total Records"
                        value={dataStats.total}
                        icon={<TrendingUp className="w-5 h-5" />}
                        color="blue"
                      />
                      <StatCard
                        title="Active"
                        value={dataStats.active}
                        icon={<CheckCircle2 className="w-5 h-5" />}
                        color="green"
                      />
                      <StatCard
                        title="Recent (7d)"
                        value={dataStats.recent}
                        icon={<Clock className="w-5 h-5" />}
                        color="purple"
                      />
                      <StatCard
                        title="Last Updated"
                        value={getTimeAgo(lastUpdated)}
                        icon={<RefreshCw className="w-5 h-5" />}
                        color="orange"
                      />
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <Card className="border-red-200 bg-red-50 mb-6">
                      <CardContent className="p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="text-red-800 font-medium">{error}</p>
                          <Button variant="link" className="p-0 h-auto text-red-600" onClick={fetchCategoryData}>
                            Try again
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Data Content */}
                  <TabsContent value="table" className="mt-0">
                    <div className="bg-white rounded-2xl border border-border/20 shadow-sm overflow-hidden">
                      {loading ? (
                        <LoadingSkeleton />
                      ) : (
                        <DataTable
                          data={filteredData}
                          category={selectedCategory}
                          onEdit={handleEdit}
                          onDataChange={fetchCategoryData}
                        />
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="grid" className="mt-0">
                    <GridView data={filteredData} category={selectedCategory} onEdit={handleEdit} />
                  </TabsContent>

                  <TabsContent value="chart" className="mt-0">
                    <ChartView data={filteredData} category={selectedCategory} />
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </main>
        </div>

        {/* Forms */}
        {selectedCity && selectedCategory && (
          <>
            <CategoryFormDialog
              open={showAddForm}
              onOpenChange={setShowAddForm}
              category={selectedCategory}
              city={selectedCity}
              onSuccess={handleFormSuccess}
            />
            
            <CategoryFormDialog
              open={showEditForm}
              onOpenChange={setShowEditForm}
              category={selectedCategory}
              city={selectedCity}
              editData={editData}
              onSuccess={handleFormSuccess}
            />
          </>
        )}
      </div>
    </SidebarProvider>
  );
};

// Additional Components
const WelcomeScreen = () => (
  <div className="flex items-center justify-center h-full min-h-[70vh] w-full">
    <Card className="w-full max-w-2xl mx-auto text-center shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50/50">
      <CardContent className="p-8 md:p-12">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg">
          <div className="relative">
            <Building2 className="w-12 h-12 md:w-16 md:h-16 text-blue-600" />
            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-500 absolute -top-1 -right-1 md:-top-2 md:-right-2" />
          </div>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
          Welcome to City Manager
        </h2>
        <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto leading-relaxed">
          Select a city from the sidebar to start managing its data across different categories with beautiful visualizations.
        </p>
        <div className="flex items-center justify-center gap-2 md:gap-3 text-sm text-muted-foreground animate-pulse">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <span>Choose a city from the sidebar to get started</span>
        </div>
      </CardContent>
    </Card>
  </div>
);

const CitySelectedScreen = ({ city }) => (
  <div className="flex items-center justify-center h-full min-h-[70vh] w-full">
    <Card className="w-full max-w-2xl mx-auto text-center shadow-2xl border-0 bg-gradient-to-br from-white to-green-50/50">
      <CardContent className="p-8 md:p-12">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg">
          <MapPin className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
        </div>
        <div className="mb-4 md:mb-6">
          <Badge className="bg-green-100 text-green-700 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm mb-3 md:mb-4">
            City Selected
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{city.cityName}</h2>
          <p className="text-muted-foreground text-sm md:text-base">Ready for data management</p>
        </div>
        <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto leading-relaxed">
          Now choose a category from the sidebar to manage specific data for {city.cityName}.
        </p>
        <div className="flex items-center justify-center gap-2 md:gap-3 text-sm text-muted-foreground animate-pulse">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
          <span>Select a category to continue</span>
        </div>
      </CardContent>
    </Card>
  </div>
);

const StatCard = ({ title, value, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "from-blue-50 to-indigo-50 border-blue-200/50 text-blue-700",
    green: "from-green-50 to-emerald-50 border-green-200/50 text-green-700",
    purple: "from-purple-50 to-violet-50 border-purple-200/50 text-purple-700",
    orange: "from-orange-50 to-amber-50 border-orange-200/50 text-orange-700",
  };

  return (
    <Card className={`bg-gradient-to-br ${colorClasses[color]}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium mb-1">{title}</p>
            <p className="text-xl font-bold">{value}</p>
          </div>
          <div className={`p-2 rounded-lg bg-${color}-100`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <div className="p-6 md:p-8 space-y-4">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
  </div>
);

const GridView = ({ data, category, onEdit }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {data.map((item, index) => (
      <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <Badge variant="secondary">#{index + 1}</Badge>
            <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
              Edit
            </Button>
          </div>
          {Object.entries(item).slice(0, 4).map(([key, value]) => (
            <div key={key} className="mb-2">
              <p className="text-xs text-muted-foreground capitalize">{key}</p>
              <p className="text-sm font-medium truncate">{String(value)}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    ))}
  </div>
);

const ChartView = ({ data, category }) => (
  <Card>
    <CardContent className="p-6">
      <div className="text-center py-8">
        <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Chart Visualization</h3>
        <p className="text-muted-foreground">
          Charts and graphs for {category} data would be displayed here.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {data.length} records available for visualization.
        </p>
      </div>
    </CardContent>
  </Card>
);

export default Index;