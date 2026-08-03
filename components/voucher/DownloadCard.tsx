"use client";

import { Download, FileText } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

interface DownloadCardProps {
  children: React.ReactNode;
}

export default function DownloadCard({ children }: DownloadCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-col items-center gap-4 py-8">
        <FileText className="h-12 w-12 text-green-600" />

        <div className="text-center">
          <h3 className="text-lg font-semibold">Invoice Ready</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Download the generated invoice PDF.
          </p>
        </div>

        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
          <div className="cursor-pointer flex items-center">
            <Download className="mr-2 h-4 w-4" />
            {children}
          </div>
        </Button>
      </CardContent>
    </Card>
  );
}
