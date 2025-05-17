import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../component/Loading'
import CategoryService from "../services/CategoryService"

function Catagory() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const Retrieve = async () => {
            setLoading(true);
            const response = await CategoryService.CategoryGetAll();
            setData(response);
            setLoading(false);
        }
        Retrieve();
    }, []);
    if (loading) {
        return <Loading />;
    }
    return (
        <div id='catagory-nav'>
            {
                data && data.length > 0 ? (
                    data.map((category) => (
                        <Link key={category.slug} to={`/kategori/${category.slug}`} className='category-tag'>
                            {category.name}
                        </Link>
                    ))
                ) : (
                    !loading && <p className='not-found'>Kategori bulunamadı.</p>
                )
            }
        </div>
    )
}

export default Catagory