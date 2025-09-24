import { useState } from "react";
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

export function AddCityDialog({ open, onOpenChange, onAddCity }) {
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName.trim()) return;

    try {
      setLoading(true);
      await onAddCity(cityName.trim());
      setCityName("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New City</DialogTitle>
          <DialogDescription>
            Enter the name of the city you want to add to the system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cityName">City Name</Label>
            <Input
              id="cityName"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="Enter city name"
              required
            />
          </div>
          <div className="flex gap-2 justify-end">
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
              disabled={loading || !cityName.trim()}
              className="bg-gradient-primary hover:bg-primary/90"
            >
              {loading ? "Adding..." : "Add City"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}