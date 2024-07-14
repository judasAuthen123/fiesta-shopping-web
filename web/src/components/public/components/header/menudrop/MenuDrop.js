import React from 'react'
import './MenuDrop.css'
import { HiOutlineChevronDown } from "react-icons/hi2";
import CategoryList from './Categories';
import { Link } from 'react-router-dom';
function MenuDrop() {
    const getCategoriesForSubCategory = (subCategoryId) => {
        return category.filter(category => category.idSubCategory.includes(subCategoryId));
    };
    // const dropdownMenu = document.querySelector('.dropdown-menu')
    // const dropdownTrigger = document.querySelector('.dropdown-toggle');
    // dropdownTrigger.addEventListener('mouseover', showDropdown);
    // function showDropdown() {
    //     dropdownMenu.style.display = 'flex'; 
    //     console.log('changed display to flex');
    // }
    // dropdownTrigger.addEventListener('mouseout', hideDropdown);
    // function hideDropdown() {
    //     dropdownMenu.style.display = 'none'; // Ẩn menu dropdown
    //     console.log('changed display to none');
    // }
    return (
        <div className="dropdown">
            <Link to='/shop' className="dropdown-toggle">Shop <HiOutlineChevronDown className='icon' /></Link>
            <div className="dropdown-menu">
                {
                    subCategory && category ?
                        subCategory.map(subCatItem =>
                            <div key={subCatItem.id} style={{ margin: 20, width: 150 }}>
                                <div style={{ fontWeight: '550', fontSize: 16 }}>
                                    {subCatItem.name}
                                </div>
                                <CategoryList categories={getCategoriesForSubCategory(subCatItem.id)} />
                            </div>
                        ) : <></>
                }
            </div>
        </div>
    )
}
export default React.memo(MenuDrop)
export const subCategory = [
    {
        id: "abc",
        name: "Festive Wear"
    },
    {
        id: "def",
        name: "Western Wear"
    },
    {
        id: "xyz",
        name: "Footwear"
    },
    {
        id:"dawd",
        name: "Ethnic Wear"
    },
    {
        id:"dadsawd",
        name: "Indian Wear"
    },
    {
        id:"dadssdd",
        name: "Indian Wear"
    },
    {
        id:"dadasdawd",
        name: "Indian Wear"
    }
]
export const category = [
    {
        id: "dasc",
        idSubCategory: ["abc", "def"],
        name: "Casual"
    },
    {
        id: "ddasad",
        idSubCategory: ["abc", "xyz", "dawd"],
        name: "T-Shirt"
    },
    {
        id: "dvsfvs",
        idSubCategory: ["xyz", "def"],
        name: "Polo T-Shirt"
    },
    {
        id: "casc",
        idSubCategory: ["dawd"],
        name: "Skirts"
    }
]
