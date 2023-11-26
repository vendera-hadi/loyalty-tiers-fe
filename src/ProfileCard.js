import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar.js";
import TierDescription from "./TierDescription.js";

const ProfileCard = ({ customer }) => {
    console.log("customer", customer);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const targets = { silver: 100, gold: 500 }

    const redirectError = ()=> {
        console.log("navigate");
        navigate("/error-page");
    }

    useEffect(() => {
        if(customer.hasOwnProperty('error')){
            redirectError()
        }else{
            setShow(true)
        }
    }, []);

    const date = new Date(customer.joinDate);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });
    const progressPercentage = () => {
        if(customer.currentTier.amountSpent >= 500) {
            return 100
        }
        let nextTier = customer.nextTier.name
        let percentage = customer.currentTier.amountSpent / targets[nextTier] * 100;
        return Math.round(percentage)
    }

    return (
        <>
        { show && (
                <>
                <div className="card">
                    <img src="/logo192.png" alt={customer.name}/>
                    <h1>{customer.name}</h1>
                    <p className="subtitle">Joined Since: <strong>{formattedDate}</strong></p>
                    <img src={`/${customer.currentTier.name}.png`} alt={customer.name} width={40}/>
                    <p className={`badge-title text-${customer.currentTier.name}`}>{customer.currentTier.name}</p>
                    <ProgressBar value={progressPercentage()}/>
                    <TierDescription customer={customer}/>
                </div>
                </> 
            )
        }       
        </>
    )
}
export default ProfileCard;