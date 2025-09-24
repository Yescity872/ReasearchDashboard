import { useState } from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { categoryApi } from "@/services/api";
// import { useToast } from "@/hooks/use-toast";

export function DataTable({ data, category, onEdit, onDataChange }) {
//   const { toast } = useToast();
  const [deletingIds, setDeletingIds] = useState(new Set());

  const handleDelete = async (item) => {
    if (!item._id) return;
    
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    try {
      setDeletingIds(prev => new Set(prev).add(item._id));
      await categoryApi.delete(category, item._id);
    //   toast({
    //     title: "Success",
    //     description: "Item deleted successfully",
    //   });
      onDataChange();
    } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to delete item",
    //     variant: "destructive",
    //   });
    } finally {
      setDeletingIds(prev => {
        const next = new Set(prev);
        next.delete(item._id);
        return next;
      });
    }
  };

  const renderCellValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    return String(value || "");
  };

  const getDisplayColumns = () => {
    if (data.length === 0) return [];
    
    const categoryColumns = {
      'Accommodation': ['cityName', 'hotels'],
      'Activities': ['cityName', 'activityName'],
      'Connectivity': ['cityName', 'type'],
      'Food': ['cityName', 'restaurantName'],
      'GeneralCityInfo': ['cityName', 'stateOrUT'],
      'HiddenGems': ['cityName', 'gemName'],
      'LocalTransport': ['cityName', 'transportType'],
      'Miscellaneous': ['cityName', 'title'],
      'NearbyTouristSpots': ['cityName', 'spotName'],
      'PlacesToVisit': ['cityName', 'placeName'],
      'Shopping': ['cityName', 'shopName']
    };

    const essentialColumns = categoryColumns[category] || ['cityName'];
    const firstItem = data[0];
    
    return essentialColumns.filter(col => col in firstItem);
  };

  if (data.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">{category} Data</CardTitle>
          <CardDescription>No data found for this category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No {category.toLowerCase()} data available</p>
            <p className="text-sm">Use ADD+ to create new entries</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayColumns = getDisplayColumns();

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {category} Data
          <Badge variant="secondary" className="text-xs">
            {data.length} items
          </Badge>
        </CardTitle>
        <CardDescription>
          Manage {category.toLowerCase()} entries for the selected city
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {displayColumns.map((column) => (
                  <TableHead key={column} className="font-medium">
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </TableHead>
                ))}
                <TableHead className="text-right w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item._id || index} className="hover:bg-muted/30">
                  {displayColumns.map((column) => (
                    <TableCell key={column} className="max-w-xs">
                      <div className="truncate" title={renderCellValue(item[column])}>
                        {renderCellValue(item[column])}
                      </div>
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEdit(item)}
                        className="h-8 w-8 p-0 hover:bg-primary/10"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(item)}
                        disabled={deletingIds.has(item._id || "")}
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}