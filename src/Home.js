const CustomerOption = ({label, value}) => {
    return <option value={value}>{label}</option>;
}

const InformationContainer = ({ children }) => {
    return (
        <>
        <div className="container-center">
            <p>{children}</p>
        </div>
        </>
    );
}

const LoginArea = ({ setLogin }) => {
    const options = [];
    for (let i = 1; i <= 5; i++) {
        options.push({ label: "Customer"+i, value: i });
    }

    return (
        <>
        <div className="custom-select">
            <select onChange={ event => setLogin(previousState => {
                return { ...previousState, customerId: event.target.value }
            }) } name="customer">
                {
                    options.map((object, i) => {
                        return <CustomerOption key={i} label={object.label} value={object.value}/>
                    })
                }
            </select>
        </div>
        <button className="button-custom ml-1" onClick={() => setLogin(previousState => {
                return { ...previousState, isLogin: true }
            })}>Login</button>
        </>
    );
}

const LogoutArea = ({ loginData, setLogin }) => {
    return (
        <> 
        <p>You are logged in as Customer {loginData.customerId}</p>
        <button className="button-custom ml-1" onClick={() => setLogin({ isLogin: false, customerId: '1' })}>Logout</button>
        </>
    )
}

const Home = ({ loginData, setLogin }) => {
    console.log("logindata", loginData);
    return (
        <>
        <h1 className={`text-center text-green`}>Home</h1>
        <InformationContainer>{ loginData.isLogin ? "Congratulations you are logged in. You already have access to Customer & Customer Order" : "Please select your User:" }</InformationContainer>
        <div className="container-center">
            { loginData.isLogin ? <LogoutArea loginData={loginData} setLogin={setLogin}/> : <LoginArea setLogin={setLogin} /> }
        </div>
        </>
    );
};
  
export default Home;
  