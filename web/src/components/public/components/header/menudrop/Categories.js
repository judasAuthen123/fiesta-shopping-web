import React from 'react';
import './Categories.css'
const CategoryList = ({ categories }) => {
    return (
        <ul>
            {categories.map(category => (
                <li key={category.id}><a href='#'>{category.name}</a></li>
            ))}
        </ul>
    );
};

export default CategoryList;