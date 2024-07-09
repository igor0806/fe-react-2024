import * as React from 'react';
import { useEffect, useState } from 'react';

import appStyles from '@/App.module.css';
import FiltersComponent from '@/components/Filters/Filters.component.tsx';
import Loading from '@/components/Loading/Louding.component';
import Pagination from '@/components/Pagination/Pagination.component.tsx';
import styles from '@/components/Product/Product.module.css';
import ProductCard from '@/components/Product/ProductCard.tsx';
import { SortOption } from '@/constants/filtersSortOption.ts';
import type { Category } from '@/Models/Category';
import type { Product } from '@/Models/product.ts';

const ProductList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setLoading] = useState<boolean>(false);

    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const [sortOption, setSortOption] = useState<SortOption>(SortOption.PRICE_HIGH_TO_LOW);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>('');

    const firstLetter = (input: string): string => input.replaceAll(/\b\w/g, (char) => char.toUpperCase());

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const offset = (currentPage - 1) * productsPerPage;
            const categoryIds = selectedCategories.map((category) => category.id).join(',');
            const sortField = sortOption === SortOption.NEWEST || sortOption === SortOption.OLDEST ? 'date' : 'price';
            const sortOrder = sortOption === SortOption.PRICE_HIGH_TO_LOW || sortOption === SortOption.OLDEST ? 'desc' : 'asc';
            try {
                const response = await fetch(
                    `https://ma-backend-api.mocintra.com/api/v1/products?limit=${productsPerPage}&offset=${offset}&title=${firstLetter(searchQuery.toLowerCase())}&categoryId=${categoryIds}&&sortField=${sortField}&sortOrder=${sortOrder}`,
                );
                const data = await response.json();

                // console.log('API Response for Products:', data);

                setProducts(data.products);
                setTotalPages(Math.ceil(data.total / productsPerPage));
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [currentPage, selectedCategories, sortOption, searchQuery]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://ma-backend-api.mocintra.com/api/v1/categories');
                const data = await response.json();
                // console.log('API Response for Categories:', data);

                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleCategorySelect = (category: Category) => {
        setSelectedCategories((previousCategories) => (previousCategories.includes(category) ? [] : [category]));
        setCurrentPage(1);
    };

    const handleSortSelect = (selectedSortOption: SortOption) => {
        setSortOption(selectedSortOption);
        setCurrentPage(1);
    };

    const handleSearchInput = (query: string) => {
        setSearchInput(query);
    };

    const handleSearch = () => {
        setSearchQuery(searchInput);
        setCurrentPage(1);
    };

    return (
        <section className={appStyles.container}>
            <FiltersComponent
                categories={categories}
                selectedCategories={selectedCategories}
                sortOption={sortOption}
                searchQuery={searchInput}
                handleCategorySelect={handleCategorySelect}
                handleSortSelect={handleSortSelect}
                setSearchQuery={handleSearchInput}
                handleSearch={handleSearch}
            />
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className={styles.productList}>
                        {products.length > 0 ? (
                            products.map((product) => <ProductCard key={product.id} product={product} />)
                        ) : (
                            <p>No products found</p>
                        )}
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </>
            )}
        </section>
    );
};

export default ProductList;
