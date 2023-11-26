import { useParams } from "react-router-dom";
import ProfileCard from "./ProfileCard.js";
import { useEffect } from "react";

const Customer = ({ customer, fetchCustomer }) => {
    const { id } = useParams();
    
    useEffect(() => {
        fetchCustomer(id)
    }, []);

    return (
        <>
        <h1 className={`text-center text-green`}>Customer Info</h1>
        { customer.length === 0 ?
            <div id="loader"></div> : 
            <ProfileCard customer={customer}/>
        }
        </>
    );
};
  
export default Customer;