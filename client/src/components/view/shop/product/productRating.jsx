import { StarIcon } from 'lucide-react';

export default function ProductRating() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className="w-3 h-3 fill-primary" />
      ))}
    </div>
  );
}
