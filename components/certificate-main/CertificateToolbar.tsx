"use client";

import Link from "next/link";
import { Plus, RefreshCw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CertificateToolbarProps {
  search: string;
  status: string;
  loading?: boolean;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onRefresh: () => void;
}

export default function CertificateToolbar({
  search,
  status,
  loading = false,
  onSearchChange,
  onStatusChange,
  onRefresh,
}: CertificateToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 md:flex-row md:items-center md:justify-between">
      {/* Left */}
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            placeholder="Search certificate, owner, registration, IMEI..."
            className="pl-9"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Status */}
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full md:w-45">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>

            <SelectItem value="ACTIVE">Active</SelectItem>

            <SelectItem value="EXPIRED">Expired</SelectItem>

            <SelectItem value="SUSPENDED">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onRefresh} disabled={loading}>
          <RefreshCw
            className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>

        <Button asChild>
          <Link href="/certificate/new">
            <Plus className="mr-2 h-4 w-4" />
            New Certificate
          </Link>
        </Button>
      </div>
    </div>
  );
}
