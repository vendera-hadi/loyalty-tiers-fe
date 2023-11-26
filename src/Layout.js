import { Outlet, NavLink } from "react-router-dom";

const Layout = ({ loginData }) => {
    return (
        <>
        <nav>
            <ul>
                <li>
                    <NavLink to="/" end>Home</NavLink>
                </li>
                { loginData.isLogin ? (
                        <>
                        <li>
                            <NavLink to={`/customer/${loginData.customerId}`} end>Customer Data</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/customer/${loginData.customerId}/orders`} end>Customer Order</NavLink>
                        </li>
                        </>
                    ) : (
                        <>
                        <li>
                            <NavLink to="/customer/1" onClick={event => event.preventDefault()} end>Customer Data</NavLink>
                        </li>
                        <li>
                            <NavLink to="/customer/1/orders" onClick={event => event.preventDefault()} end>Customer Order</NavLink>
                        </li>
                        </>
                    )
                }
            </ul>
        </nav>

        <Outlet/>
        </>
    )
};

export default Layout;
