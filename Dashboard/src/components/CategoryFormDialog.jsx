import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { categoryApi } from "@/services/api";
// import { useToast } from "@/hooks/use-toast";

export function CategoryFormDialog({
  open,
  onOpenChange,
  category,
  city,
  editData,
  onSuccess,
}) {
  //   const { toast } = useToast();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (open) {
  //     setFormData(
  //       editData
  //         ? { ...editData }
  //         : {
  //           cityId: city.cityId,
  //           cityName: city.cityName,
  //         }
  //     );
  //   }
  // }, [open, editData, city]);

  useEffect(() => {
  if (open) {
    if (editData) {
      // For edit mode, populate all fields including individual image fields
      const editFormData = { ...editData };
      
      // Extract individual image fields from the images array
      if (editData.images && Array.isArray(editData.images)) {
        editFormData.image0 = editData.images[0] || '';
        editFormData.image1 = editData.images[1] || '';
        editFormData.image2 = editData.images[2] || '';
      } else {
        // Fallback if images array doesn't exist
        editFormData.image0 = editData.image0 || '';
        editFormData.image1 = editData.image1 || '';
        editFormData.image2 = editData.image2 || '';
      }
      
      setFormData(editFormData);
    } else {
      // For create mode
      setFormData({
        cityId: city.cityId,
        cityName: city.cityName,
        image0: '',
        image1: '',
        image2: '',
        images: []
      });
    }
  }
}, [open, editData, city]);

// useEffect(() => {
//   if (open) {
//     if (editData) {
//       // For edit mode, populate all fields
//       const editFormData = { ...editData };
      
//       // For Activities: extract image0 from images array
//       if (category === 'Activities') {
//         if (editData.images && Array.isArray(editData.images) && editData.images.length > 0) {
//           editFormData.image0 = editData.images[0] || '';
//         } else {
//           editFormData.image0 = '';
//         }
//       } else {
//         // For other categories with multiple images
//         if (editData.images && Array.isArray(editData.images)) {
//           editFormData.image0 = editData.images[0] || '';
//           editFormData.image1 = editData.images[1] || '';
//           editFormData.image2 = editData.images[2] || '';
//         } else {
//           editFormData.image0 = editData.image0 || '';
//           editFormData.image1 = editData.image1 || '';
//           editFormData.image2 = editData.image2 || '';
//         }
//       }
      
//       // Convert essentials array to string for display
//       if (editData.essentials && Array.isArray(editData.essentials)) {
//         editFormData.essentials = editData.essentials.join(', ');
//       }
      
//       // Convert premium to boolean for checkbox
//       if (editData.premium) {
//         editFormData.premium = editData.premium === "PREMIUM";
//       }
      
//       setFormData(editFormData);
//     } else {
//       // For create mode
//       const createFormData = {
//         cityId: city.cityId,
//         cityName: city.cityName,
//       };
      
//       // For Activities: only image0
//       if (category === 'Activities') {
//         createFormData.image0 = '';
//       } else {
//         // For other categories: image0, image1, image2
//         createFormData.image0 = '';
//         createFormData.image1 = '';
//         createFormData.image2 = '';
//       }
      
//       createFormData.videos = [];
//       createFormData.essentials = '';
//       createFormData.premium = false;
      
//       setFormData(createFormData);
//     }
//   }
// }, [open, editData, city, category]);

  const getFormFields = () => {
    switch (category) {
      case 'Accommodation':
        return [
          { key: 'hotels', label: 'Hotel Name', type: 'text', required: true },
          { key: 'address', label: 'Address', type: 'text' },
          { key: 'lat', label: 'Latitude', type: 'number' },
          { key: 'lon', label: 'Longitude', type: 'number' },
          { key: 'locationLink', label: 'Location Link', type: 'text' },
          { key: 'category', label: 'Category', type: 'text' },
          { key: 'minPrice', label: 'Min Price', type: 'text' },
          { key: 'maxPrice', label: 'Max Price', type: 'text' },
          { key: 'roomTypes', label: 'Room Types (comma-separated)', type: 'string' },
          { key: 'facilities', label: 'Facilities (comma-separated)', type: 'string' },
          { key: 'image0', label: 'Image 1 URL', type: 'text' },
          { key: 'image1', label: 'Image 2 URL', type: 'text' },
          { key: 'image2', label: 'Image 3 URL', type: 'text' },
          { key: 'flagShip', label: 'Flagship Property', type: 'checkbox' },
          { key: 'premium', label: 'Premium', type: 'checkbox' },
        ];
      case 'GeneralCityInfo':
        return [
          { key: 'stateOrUT', label: 'State/UT', type: 'text' },
          { key: 'alternateNames', label: 'Alternate Names (comma-separated)', type: 'array' },
          { key: 'languagesSpoken', label: 'Languages Spoken (comma-separated)', type: 'array' },
          { key: 'climateInfo', label: 'Climate Information', type: 'textarea' },
          { key: 'bestTimeToVisit', label: 'Best Time to Visit', type: 'text' },
          { key: 'cityHistory', label: 'City History', type: 'textarea' },
          { key: 'coverImage', label: 'Cover Image URL', type: 'text' },
          { key: 'premium', label: 'Premium Status', type: 'text' },
        ];
      case 'Activities':
        return [
          { key: 'topActivities', label: 'Top Activities', type: 'text', required: true },
          { key: 'bestPlaces', label: 'Best Places to Visit', type: 'text' },
          { key: 'description', label: 'Activity Description', type: 'textarea' },
          { key: 'essentials', label: 'Travel Essentials', type: 'text' },
          { key: 'fee', label: 'Entry Fee/Cost', type: 'text' },
          { key: 'image0', label: 'Image URL', type: 'text' },
          { key: 'videos', label: 'Video URLs', type: 'array' },
          { key: 'premium', label: 'Premium Activity', type: 'checkbox' },
        ];
      case 'Connectivity':
        return [
          { key: 'nearestAirportStationBusStand', label: 'Nearest Airport/Station/Bus Stand', type: 'text', required: true },
          { key: 'distance', label: 'Distance from City', type: 'text' },
          { key: 'lat', label: 'Latitude', type: 'number' },
          { key: 'lon', label: 'Longitude', type: 'number' },
          { key: 'locationLink', label: 'Location Link', type: 'text' },
          { key: 'majorFlightsTrainsBuses', label: 'Major Flights/Trains/Buses', type: 'textarea' },
          { key: 'premium', label: 'Premium', type: 'checkbox' },
        ];
      case 'Food':
        return [
          { key: 'foodPlace', label: 'Food Place Name', type: 'text', required: true },
          { key: 'flagship', label: 'Flagship Place', type: 'checkbox' },
          { key: 'lat', label: 'Latitude', type: 'number' },
          { key: 'lon', label: 'Longitude', type: 'number' },
          { key: 'address', label: 'Address', type: 'text' },
          { key: 'locationLink', label: 'Location Link', type: 'text' },
          { key: 'category', label: 'Category', type: 'text' },
          { key: 'vegOrNonVeg', label: 'Veg/Non-Veg', type: 'select', options: ['Veg', 'NonVeg', 'Both'] },
          { key: 'valueForMoney', label: 'Value for Money (0-5)', type: 'number', min: 0, max: 5 },
          { key: 'service', label: 'Service Rating (0-5)', type: 'number', min: 0, max: 5 },
          { key: 'taste', label: 'Taste Rating (0-5)', type: 'number', min: 0, max: 5 },
          { key: 'hygiene', label: 'Hygiene Rating (0-5)', type: 'number', min: 0, max: 5 },
          { key: 'menuSpecial', label: 'Menu Specialties', type: 'textarea' },
          { key: 'menuLink', label: 'Menu Link', type: 'text' },
          { key: 'openDay', label: 'Open Days', type: 'text' },
          { key: 'openTime', label: 'Open Time', type: 'text' },
          { key: 'phone', label: 'Phone Number', type: 'text' },
          { key: 'website', label: 'Website', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'image0', label: 'Image 1 URL', type: 'text' },
          { key: 'image1', label: 'Image 2 URL', type: 'text' },
          { key: 'image2', label: 'Image 3 URL', type: 'text' },
          { key: 'videos', label: 'Video URLs', type: 'array' },
          { key: 'premium', label: 'Premium', type: 'checkbox' },
        ];

      case 'HiddenGems':
        return [
          { key: 'hiddenGem', label: 'Hidden Gem Name', type: 'text', required: true },
          { key: 'category', label: 'Category', type: 'text' },
          { key: 'lat', label: 'Latitude', type: 'number' },
          { key: 'lon', label: 'Longitude', type: 'number' },
          { key: 'address', label: 'Address', type: 'text' },
          { key: 'locationLink', label: 'Location Link', type: 'text' },
          { key: 'openDay', label: 'Open Days', type: 'text' },
          { key: 'openTime', label: 'Open Time', type: 'text' },
          { key: 'establishYear', label: 'Establish Year', type: 'text' },
          { key: 'fee', label: 'Entry Fee', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'essential', label: 'Essentials', type: 'text' },
          { key: 'story', label: 'Story', type: 'textarea' },
          { key: 'image0', label: 'Image 1 URL', type: 'text' },
          { key: 'image1', label: 'Image 2 URL', type: 'text' },
          { key: 'image2', label: 'Image 3 URL', type: 'text' },
          { key: 'videos', label: 'Video URLs', type: 'array' },
          { key: 'premium', label: 'Premium', type: 'checkbox' },
        ];

      case 'LocalTransport':
        return [
          { key: 'from', label: 'From', type: 'text', required: true },
          { key: 'to', label: 'To', type: 'text', required: true },
          { key: 'autoPrice', label: 'Auto Price', type: 'text' },
          { key: 'cabPrice', label: 'Cab Price', type: 'text' },
          { key: 'bikePrice', label: 'Bike Price', type: 'text' },
          { key: 'premium', label: 'Premium', type: 'checkbox' },
        ];

      case 'NearbyTouristSpots':
        return [
          { key: 'places', label: 'Place Name', type: 'text', required: true },
          { key: 'distance', label: 'Distance', type: 'text' },
          { key: 'category', label: 'Category', type: 'text' },
          { key: 'lat', label: 'Latitude', type: 'number' },
          { key: 'lon', label: 'Longitude', type: 'number' },
          { key: 'address', label: 'Address', type: 'text' },
          { key: 'locationLink', label: 'Location Link', type: 'text' },
          { key: 'openDay', label: 'Open Days', type: 'text' },
          { key: 'openTime', label: 'Open Time', type: 'text' },
          { key: 'establishYear', label: 'Establish Year', type: 'text' },
          { key: 'fee', label: 'Entry Fee', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'essential', label: 'Essentials', type: 'text' },
          { key: 'story', label: 'Story', type: 'textarea' },
          { key: 'image0', label: 'Image 1 URL', type: 'text' },
          { key: 'image1', label: 'Image 2 URL', type: 'text' },
          { key: 'image2', label: 'Image 3 URL', type: 'text' },
          { key: 'videos', label: 'Video URLs', type: 'array' },
          { key: 'premium', label: 'Premium', type: 'checkbox' },
        ];

      case 'PlacesToVisit':
        return [
          { key: 'places', label: 'Place Name', type: 'text', required: true },
          { key: 'category', label: 'Category', type: 'text' },
          { key: 'lat', label: 'Latitude', type: 'number' },
          { key: 'lon', label: 'Longitude', type: 'number' },
          { key: 'address', label: 'Address', type: 'text' },
          { key: 'locationLink', label: 'Location Link', type: 'text' },
          { key: 'openDay', label: 'Open Days', type: 'text' },
          { key: 'openTime', label: 'Open Time', type: 'text' },
          { key: 'establishYear', label: 'Establish Year', type: 'text' },
          { key: 'fee', label: 'Entry Fee', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'essential', label: 'Essentials', type: 'text' },
          { key: 'story', label: 'Story', type: 'textarea' },
          { key: 'image0', label: 'Image 1 URL', type: 'text' },
          { key: 'image1', label: 'Image 2 URL', type: 'text' },
          { key: 'image2', label: 'Image 3 URL', type: 'text' },
          { key: 'videos', label: 'Video URLs', type: 'array' },
          { key: 'premium', label: 'Premium', type: 'checkbox' },
        ];

      case 'Shopping':
        return [
          { key: 'shops', label: 'Shop Name', type: 'text', required: true },
          { key: 'flagship', label: 'Flagship Shop', type: 'checkbox' },
          { key: 'lat', label: 'Latitude', type: 'number' },
          { key: 'lon', label: 'Longitude', type: 'number' },
          { key: 'address', label: 'Address', type: 'text' },
          { key: 'locationLink', label: 'Location Link', type: 'text' },
          { key: 'famousFor', label: 'Famous For', type: 'text' },
          { key: 'priceRange', label: 'Price Range', type: 'text' },
          { key: 'openDay', label: 'Open Days', type: 'text' },
          { key: 'openTime', label: 'Open Time', type: 'text' },
          { key: 'phone', label: 'Phone', type: 'text' },
          { key: 'website', label: 'Website', type: 'text' },
          { key: 'image0', label: 'Image 1 URL', type: 'text' },
          { key: 'image1', label: 'Image 2 URL', type: 'text' },
          { key: 'image2', label: 'Image 3 URL', type: 'text' },
          // images array is built on backend from image0-2
          { key: 'premium', label: 'Premium', type: 'checkbox' },
        ];

      case 'Miscellaneous':
        return [
          // { key: 'engagement', label: 'Engagement (JSON)', type: 'text' },
          // { key: 'reviews', label: 'Reviews (JSON array)', type: 'text' },
          { key: 'localMap', label: 'Local Map Link', type: 'text' },
          { key: 'emergencyContacts', label: 'Emergency Contacts', type: 'text' },
          { key: 'hospital', label: 'Hospital Name', type: 'text' },
          { key: 'hospitalLocationLink', label: 'Hospital Location Link', type: 'text' },
          { key: 'hospitalLat', label: 'Hospital Latitude', type: 'number' },
          { key: 'hospitalLon', label: 'Hospital Longitude', type: 'number' },
          { key: 'PoliceLocationLink', label: 'Police Station Location Link', type: 'text' },
          { key: 'PoliceLat', label: 'Police Station Latitude', type: 'number' },
          { key: 'PoliceLon', label: 'Police Station Longitude', type: 'number' },
          { key: 'parking', label: 'Parking', type: 'text' },
          { key: 'parkingLocationLink', label: 'Parking Location Link', type: 'text' },
          { key: 'parkingLat', label: 'Parking Latitude', type: 'number' },
          { key: 'parkingLon', label: 'Parking Longitude', type: 'number' },
          { key: 'publicWashrooms', label: 'Public Washrooms', type: 'text' },
          { key: 'publicWashroomsLocationLink', label: 'Washrooms Location Link', type: 'text' },
          { key: 'publicWashroomsLat', label: 'Washrooms Latitude', type: 'number' },
          { key: 'publicWashroomsLon', label: 'Washrooms Longitude', type: 'number' },
          { key: 'premium', label: 'Premium', type: 'text' },
        ];

      default:
        // Generic form for other categories
        return [
          { key: 'name', label: 'Name', type: 'text', required: true },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'location', label: 'Location', type: 'text' },
          { key: 'price', label: 'Price', type: 'text' },
          { key: 'rating', label: 'Rating', type: 'number' },
          { key: 'image', label: 'Image URL', type: 'text' },
        ];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Process array fields and JSON-like fields
      const processedData = { ...formData };
      getFormFields().forEach(field => {
        if (field.type === 'array' && typeof processedData[field.key] === 'string') {
          processedData[field.key] = processedData[field.key]
            .split(',')
            .map((item) => item.trim())
            .filter((item) => item);
        }
        if (category === 'Miscellaneous') {
          if (field.key === 'engagement' && typeof processedData.engagement === 'string') {
            try { processedData.engagement = JSON.parse(processedData.engagement); } catch { }
          }
          if (field.key === 'reviews' && typeof processedData.reviews === 'string') {
            try { processedData.reviews = JSON.parse(processedData.reviews); } catch { }
          }
        }
      });

      if (editData && editData._id) {
        await categoryApi.update(category, editData._id, processedData);
        // toast({
        //   title: "Success",
        //   description: "Item updated successfully",
        // });
      } else {
        await categoryApi.create(category, processedData);
        // toast({
        //   title: "Success", 
        //   description: "Item created successfully",
        // });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      //   toast({
      //     title: "Error",
      //     description: `Failed to ${editData ? 'update' : 'create'} item`,
      //     variant: "destructive",
      //   });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const fields = getFormFields();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editData ? 'Edit' : 'Add'} {category} Entry
          </DialogTitle>
          <DialogDescription>
            {editData ? 'Update' : 'Create'} {category.toLowerCase()} data for {city.cityName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            {fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>
                  {field.label} {field.required && <span className="text-destructive">*</span>}
                </Label>

                {field.type === 'textarea' ? (
                  <Textarea
                    id={field.key}
                    value={formData[field.key] || ''}
                    onChange={(e) => updateFormData(field.key, e.target.value)}
                    required={field.required}
                  />
                ) : field.type === 'checkbox' ? (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={field.key}
                      checked={!!formData[field.key]}
                      onCheckedChange={(checked) => updateFormData(field.key, checked)}
                    />
                    <Label htmlFor={field.key} className="text-sm font-normal">
                      {field.label}
                    </Label>
                  </div>
                ) : field.type === 'array' ? (
                  <Input
                    id={field.key}
                    value={
                      Array.isArray(formData[field.key])
                        ? formData[field.key].join(', ')
                        : formData[field.key] || ''
                    }
                    onChange={(e) => updateFormData(field.key, e.target.value)}
                    placeholder="Separate multiple items with commas"
                  />
                ) : (
                  <Input
                    id={field.key}
                    type={field.type}
                    value={formData[field.key] || ''}
                    onChange={(e) => updateFormData(field.key, e.target.value)}
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-primary hover:bg-primary/90"
            >
              {loading ? "Saving..." : editData ? "Save Changes" : "Create Entry"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}