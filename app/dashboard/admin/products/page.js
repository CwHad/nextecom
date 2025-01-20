'use client'

import ProductList from "@/components/admin/ProductList"

const AdminProductsList = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <p className="lead">
                        List of Products
                    </p>
                    <hr />
                    <ProductList />
                </div>
            </div>
        </div>
    )
}

export default AdminProductsList;