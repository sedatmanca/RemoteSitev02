import { 
    categories, 
    subCategories
} from "@/types/home/categories"

const getCategoryWithSubCategory = (categoryId: number | undefined, subCategoryId: number | undefined) => {
    const selectedCategory = categories.find((c) => c.id === categoryId)?.text;
    const selectedSubCategory = subCategories.find((sc) => sc.id === subCategoryId && sc.parentId === categoryId)?.text;

    return {
        category: selectedCategory,
        subCategory: selectedSubCategory,
    }
}

const getCategoryName = (categoryId: number | undefined) => {
    return categories.find((c) => c.id === categoryId)?.text;
}

const getSubCategoryName = (categoryId: number | undefined, subCategoryId: number | undefined) => {
    return subCategories.find((sc) => sc.id === subCategoryId && sc.parentId === categoryId)?.text;

}

const getSubCategoriesFromCategoryId = (categoryId: number) => {
    return subCategories.filter((sc) => sc.parentId === categoryId);
}

export{
    getCategoryWithSubCategory,
    getCategoryName,
    getSubCategoryName,
    getSubCategoriesFromCategoryId
}