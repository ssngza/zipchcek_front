import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const HistoryCardSkeleton: React.FC = () => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-40" />
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm mb-2">
          <Skeleton className="h-4 w-4 mr-1 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center text-sm">
          <Skeleton className="h-4 w-4 mr-1 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex items-center">
          <Skeleton className="h-3 w-3 mr-1 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-4 w-4 rounded-full" />
      </CardFooter>
    </Card>
  );
};

export default HistoryCardSkeleton;
