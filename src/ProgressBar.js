const ProgressBar = ({ value }) => {
    return (
            <>
            <div className="progress-bar">
				<span className="progress-bar-fill" style={{width: `${value}%`}}></span>
                <span className="overlay-text">{value}%</span>
			</div>
            </>
    )
}
export default ProgressBar;