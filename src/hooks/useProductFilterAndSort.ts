import { useState, useMemo } from "react";
import { SORT_TYPES } from "../constants";
import { SortOption, FilterAndSortOptions } from "../types/products.types";

const useProductFilterAndSort = <T extends Record<string, unknown>>(
  products: T[],
  initialSortProperty: keyof T | null = null,
  initialSortOrder: SortOption = "ascending"
) => {
  const excludedProperties: string[] = ["count", "description"];
  const [filterOptions, setFilterOptions] = useState<FilterAndSortOptions<T>>({
    searchTerm: "",
    sortProperty: initialSortProperty,
    sortOption: initialSortOrder,
  });

  const handleSearchChange = (searchTerm: string) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      searchTerm,
    }));
  };

  const handleSortChange = (
    sortProperty: keyof T | null,
    sortOption: SortOption
  ) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      sortProperty,
      sortOption,
    }));
  };

  const sortedProducts = useMemo(() => {
    let sorted = [...products];

    if (filterOptions.searchTerm) {
      const lowerCaseSearchTerm = filterOptions.searchTerm.toLowerCase();
      sorted = sorted.filter((product) => {
        return Object.entries(product).some(([key, value]) => {
          if (typeof value === "string" || typeof value === "number") {
            return (
              !excludedProperties.includes(key) &&
              value.toString().toLowerCase().includes(lowerCaseSearchTerm)
            );
          }
          return false;
        });
      });
    }

    if (filterOptions.sortOption !== "none" && filterOptions.sortProperty) {
      sorted.sort((a, b) => {
        const aValue = a[filterOptions.sortProperty!];
        const bValue = b[filterOptions.sortProperty!];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return filterOptions.sortOption === SORT_TYPES.ASC
            ? aValue - bValue
            : bValue - aValue;
        } else if (typeof aValue === "string" && typeof bValue === "string") {
          return filterOptions.sortOption === SORT_TYPES.ASC
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return 0;
      });
    }

    return sorted;
  }, [products, filterOptions]);

  return {
    filterOptions,
    handleSearchChange,
    handleSortChange,
    sortedProducts,
  };
};

export default useProductFilterAndSort;
