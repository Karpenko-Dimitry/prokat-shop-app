import React, {createContext, useState, useMemo} from "react";

export const resourceContext = createContext();

const { Provider } = resourceContext;

export const ResourceProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const data = useMemo(() => ({
        setProducts: (data) => setProducts(data),
        setCategories: (data) => setCategories(data),
        reduceProducts: (data) => setProducts([...products, ...data]),
        reduceCategories: (data) => setCategories([...categories, ...data]),
        resetProducts: () => setProducts([]),
        resetCategories: () => setCategories([]),
        products: products,
        categories: categories,
    }));

    return (
        <Provider value={data}>{children}</Provider>
    )
}

export default { resourceContext, ResourceProvider };