import newsCategoryList from "../constants/Categories";
import { useCallback, useState } from "react";



export const useNewsCategories = () => {
    const [newsCategories, setNewsCategory] = useState(newsCategoryList);

    const toggleNewsCategory = useCallback((id: number) => {
        setNewsCategory((prevNewsCategory) => {
            return prevNewsCategory.map(item => {
                return item.id === id
                    ? { ...item, selected: !item.selected }
                    : item;
            });
        });
    }, []);

    return {
        newsCategories,
        toggleNewsCategory
    }
}
