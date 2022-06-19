import Navbar from './Navbar';
import {Helmet} from "react-helmet";
const Layout = (content, title) => {

    return(
        <>
            <Helmet>
                <title> {title} </title>
            </Helmet>
            <Navbar/>
                {content}
        </>
    );
};

export default Layout;