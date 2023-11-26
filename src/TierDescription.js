const TierDescription = ({ customer }) => {
    const isLastTier = () => {
        return Object.keys(customer.nextTier).length === 0
    }

    const isFirstTier = () => {
        return Object.keys(customer.prevTier).length === 0
    }

    const nextTier = () => {
        return customer.nextTier.name
    }
    const prevTier = () => {
        return customer.prevTier.name
    }
    const deadline = isFirstTier() ? customer.nextTier.deadline : customer.prevTier.deadline
    const date = new Date(deadline);
    const formattedDeadlineDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });

    return (
            <>
            { isLastTier() ? 
                <p className="tier-description">Congratulations! You already on final tier</p> :
                <p className="tier-description">You have to spend ${customer.nextTier.amountToSpend} to reach <span className={`text-${nextTier()}`}>{nextTier()}</span> until <b className="text-black">{formattedDeadlineDate}</b></p>
            }
            { !isFirstTier() && 
                <p className="tier-description">You have to spend ${customer.prevTier.amountToPreventDowngrade} to prevent you downgraded to <span className={`text-${prevTier()}`}>{prevTier()}</span> until <b className="text-black">{formattedDeadlineDate}</b></p>
            }
            </>
    )
}
export default TierDescription;