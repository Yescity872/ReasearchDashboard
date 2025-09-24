import { useState, useEffect } from "react";
import { Building2, Plus, ChevronDown, Database } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
import { citiesApi } from "@/services/api";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AddCityDialog } from "@/components/AddCityDialog";

const categories = [
  'Accommodation',
  'Activities', 
  'Connectivity',
  'Food',
  'GeneralCityInfo',
  'HiddenGems',
  'LocalTransport',
  'Miscellaneous',
  'NearbyTouristSpots',
  'PlacesToVisit',
  'Shopping'
];

export function AppSidebar({ 
  selectedCity, 
  onCitySelect, 
  selectedCategory, 
  onCategorySelect,
  onAddData,
  onGetData 
}) {
  const { open } = useSidebar();
//   const { toast } = useToast();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddCity, setShowAddCity] = useState(false);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const response = await citiesApi.getAll();
      setCities(response.data);
    } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to fetch cities",
    //     variant: "destructive",
    //   });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleAddCity = async (cityName) => {
    try {
      await citiesApi.create({ cityName });
      await fetchCities();
      setShowAddCity(false);
    //   toast({
    //     title: "Success",
    //     description: "City added successfully",
    //   });
    } catch (error) {
    //   toast({
    //     title: "Error", 
    //     description: "Failed to add city",
    //     variant: "destructive",
    //   });
    }
  };

  return (
    <>
      <Sidebar className={!open ? "w-16" : "w-80"} collapsible="icon">
        <SidebarContent className="bg-gradient-card border-r border-border/50">
          {/* Header */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              {open && (
                <div>
                  <h1 className="font-semibold text-foreground">City Manager</h1>
                  <p className="text-xs text-muted-foreground">Admin Dashboard</p>
                </div>
              )}
            </div>
          </div>

          {open && (
            <>
              {/* City Selection */}
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-3">
                  Select City
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <div className="space-y-2 px-2">
                        <Select
                          value={selectedCity?.cityId || ""}
                          onValueChange={(value) => {
                            const city = cities.find(c => c.cityId === value);
                            if (city) onCitySelect(city);
                          }}
                          disabled={loading}
                        >
                          <SelectTrigger className="w-full bg-background/50">
                            <SelectValue placeholder={loading ? "Loading..." : "Choose a city"} />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city.cityId} value={city.cityId}>
                                {city.cityName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAddCity(true)}
                          className="w-full text-xs"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add City
                        </Button>
                      </div>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              {/* Category Selection */}
              {selectedCity && (
                <SidebarGroup>
                  <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-3">
                    Category
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <div className="px-2">
                          <Select
                            value={selectedCategory || ""}
                            onValueChange={(value) => onCategorySelect(value)}
                          >
                            <SelectTrigger className="w-full bg-background/50">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )}

              {/* Action Buttons */}
              {selectedCity && selectedCategory && (
                <SidebarGroup>
                  <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-3">
                    Actions
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <div className="space-y-2 px-2">
                          <Button
                            onClick={onAddData}
                            className="w-full bg-gradient-primary hover:bg-primary/90 text-white"
                            size="sm"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            ADD+
                          </Button>
                          <Button
                            onClick={onGetData}
                            variant="outline"
                            className="w-full"
                            size="sm"
                          >
                            <Database className="w-3 h-3 mr-1" />
                            GET DATA
                          </Button>
                        </div>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )}
            </>
          )}
        </SidebarContent>
      </Sidebar>

      <AddCityDialog
        open={showAddCity}
        onOpenChange={setShowAddCity}
        onAddCity={handleAddCity}
      />
    </>
  );
}