import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { filterOptions } from '@/config';
import { Fragment } from 'react';

export default function ProductFilter({ filters, handleFilters }) {
  const filterKeys = Object.keys(filterOptions);
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {filterKeys.map((sectionName, i) => (
          <Fragment key={sectionName}>
            <div>
              <h3 className="text-base font-semibold">{sectionName}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[sectionName].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 font-normal cursor-pointer"
                  >
                    <Checkbox
                      checked={filters[sectionName]?.includes(option.id)}
                      onCheckedChange={() =>
                        handleFilters(sectionName, option.id)
                      }
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            {filterKeys.length - 1 > i && <Separator />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
