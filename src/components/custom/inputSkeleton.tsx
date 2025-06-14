import { Pencil } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const InputSkeleton = ({
  label,
  value,
  loading,
  onEdit,
}: {
  label: string;
  value: string | number | null | undefined;
  loading?: boolean;
  onEdit?: () => void;
}) => {
  const showSkeleton = loading || value === undefined || value === null;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-muted-foreground text-sm">{label}</span>
      {showSkeleton ? (
        <Skeleton className="h-5 w-3/4 rounded" />
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-base">{value === "" ? "-" : value}</span>
          {onEdit && (
            <button
              onClick={onEdit}
              className="ml-2 text-muted-foreground hover:text-primary"
            >
              <Pencil size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InputSkeleton;
