"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddVehicleButtonProps {
  onClick: () => void;
}

export default function AddVehicleButton({ onClick }: AddVehicleButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700"
    >
      <Plus className="mr-2 h-4 w-4" />
      Add Vehicle
    </Button>
  );
}
