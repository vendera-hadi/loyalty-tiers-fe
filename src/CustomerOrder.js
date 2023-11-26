import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PaginationTable from "./PaginationTable.js";

const CustomerOrder = ({ orders, fetchOrders }) => {
    const { id } = useParams();
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchOrders(id)
    }, []);

    return (
        <>
        <h1 className={`text-center text-green`}>Customer Order</h1>
        { orders.length === 0 ?
            <div id="loader"></div> : 
            (
                <>
                <main className="table-container">
                    <div className="table-wrapper">
                        <PaginationTable orders={orders} rowsPerPage={5}/>
                    </div>
                </main>
                </>
            )
        }
        </>
    )
};
  
export default CustomerOrder;
  