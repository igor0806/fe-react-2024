import React from 'react';

import CustomSelect from '@/components/Filters/CustomSelect.component';
import CategoryFilterButtons from '@/components/Filters/FilterButton.component.tsx';
import SearchInput from '@/components/Filters/SearchInput.component.tsx';
import type { SortOption } from '@/constants/filtersSortOption.ts';
import type { Category } from '@/Models/Category';

import styles from './Filters.module.css';

interface FiltersComponentProps {
    categories: Category[];
    selectedCategories: Category[];
    sortOption: SortOption;
    searchQuery: string;
    handleCategorySelect: (category: Category) => void;
    handleSortSelect: (sortOption: SortOption) => void;
    setSearchQuery: (searchQuery: string) => void;
    handleSearch: () => void;
}
export const FiltersComponent: React.FC<FiltersComponentProps> = ({
    categories,
    selectedCategories,
    sortOption,
    searchQuery,
    setSearchQuery,
    handleCategorySelect,
    handleSortSelect,
    handleSearch,
}) => (
    <>
        <div className={styles.container}>
            <section className={styles.filterFlex}>
                <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
                <div className={styles.rightFlex}>
                    <CategoryFilterButtons
                        categories={categories}
                        selectedCategories={selectedCategories}
                        handleCategorySelect={handleCategorySelect}
                    />
                    <div className={styles.sortFlex}>
                        <p className={styles.sortBy}>Sort by:</p>
                        <CustomSelect value={sortOption} onChange={handleSortSelect} />
                    </div>
                </div>
            </section>
        </div>
    </>
);

export default FiltersComponent;
