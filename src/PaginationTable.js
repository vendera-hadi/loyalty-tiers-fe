import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PaginationFooter from "./PaginationFooter.js";

const PaginationTable = ({ orders, rowsPerPage }) => {
    const [searchParams] = useSearchParams();
    const [tableRange, setTableRange] = useState([]);
    const [slice, setSlice] = useState([]);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const navigate = useNavigate();

    const redirectError = ()=> {
        console.log("navigate");
        navigate("/error-page");
    }

    const calculateRange = () => {
        console.log("data", orders);
        const range = [];
        const num = Math.ceil(orders.length / rowsPerPage);
        let i = 1;
        for (let i = 1; i <= num; i++) {
          range.push(i);
        }
        return range;
    }
      
    const sliceData = () => {
        return orders.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    }

    const formatTime = (orderTime) => {
        const date = new Date(orderTime);
        const formattedDate = date.toLocaleTimeString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
        return formattedDate
    } 

    useEffect(() => {
        if(orders.hasOwnProperty('error')){
            redirectError()
        }else{
            const range = calculateRange();
            setTableRange([...range]);
            console.log("range", tableRange);

            const slice = sliceData();
            setSlice([...slice]);
            console.log("slice", slice);
        }
    }, [orders, setTableRange, page, setSlice]);

    return (
        <>
        <table className="table">
            <thead className="tableRowHeader">
                <tr>
                    <th className="tableHeader">Order Id</th>
                    <th className="tableHeader">Total Spent in Cents</th>
                    <th className="tableHeader">Order Time</th>
                </tr>
            </thead>
            <tbody>
                { slice.map((el, index) => (
                    <tr className="tableRowItems" key={index}>
                        <td className="tableCell">{el.orderId}</td>
                        <td className="tableCell">${el.totalInCents}</td>
                        <td className="tableCell">{formatTime(el.date)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <PaginationFooter range={tableRange} slice={slice} setPage={setPage} page={page} />
        </>
    )
}
export default PaginationTable;