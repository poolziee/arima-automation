import './style/style.css'
import {useRoutes} from "react-router-dom"
import routes from './routes';


function App() {
    const content = useRoutes(routes);

    const backup = console.error;

    console.error = function filterErrors(msg) {
        const supressedWarnings = ['validateDOMNesting'];

        if (!supressedWarnings.some(entry => msg.includes(entry))) {
            backup.apply(console, arguments);
        }
    };

    return (
        <>
            {content}
        </>
        );
}
export default App;