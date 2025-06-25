import { Box, Text } from "@/components/ui/base";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import React from "react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}) => {
  return (
    <Box className={`p-8 text-center ${className}`}>
      {Icon && (
        <div className="flex justify-center mb-4">
          <Icon className="h-12 w-12 text-gray-400" />
        </div>
      )}
      <Text className="text-lg font-medium text-gray-700 mb-2">{title}</Text>
      {description && <Text className="text-gray-500 mb-6">{description}</Text>}
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" className="mt-2">
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
