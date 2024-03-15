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

  const handleSortOptionChange = (sortOption: SortOption) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      sortOption,
    }));
  };

  const handleSortPropertyChange = (sortProperty: keyof T | null) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      sortProperty,
    }));
  };

  const sortedProducts = useMemo(() => {
    let filtered = [...products];

    if (filterOptions.searchTerm) {
      const lowerCaseSearchTerm = filterOptions.searchTerm.toLowerCase();
      filtered = filtered.filter((product) => {
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

    let sorted = [...filtered];

    if (
      filterOptions.sortOption !== SORT_TYPES.NONE &&
      filterOptions.sortProperty
    ) {
      sorted.sort((a, b) => {
        if (filterOptions.sortProperty && filterOptions.sortProperty) {
          const aValue = a[filterOptions.sortProperty];
          const bValue = b[filterOptions.sortProperty];

          if (typeof aValue === "number" && typeof bValue === "number") {
            return filterOptions.sortOption === SORT_TYPES.ASC
              ? aValue - bValue
              : bValue - aValue;
          } else if (typeof aValue === "string" && typeof bValue === "string") {
            return filterOptions.sortOption === SORT_TYPES.ASC
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          }
        }
        return 0;
      });
    }

    return sorted;
  }, [
    products,
    filterOptions.sortOption,
    filterOptions.searchTerm,
    filterOptions.sortProperty,
  ]);

  return {
    filterOptions,
    handleSearchChange,
    handleSortOptionChange,
    handleSortPropertyChange,
    sortedProducts,
  };
};

export default useProductFilterAndSort;
