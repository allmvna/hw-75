import Navbar from "./components/Navbar/Navbar.tsx";
import Form from "./components/Form/Form.tsx";

const App = () =>{
    return (
        <>
            <header>
                <Navbar/>
            </header>
            <main>
                <Form/>
            </main>
        </>
    );
};

export default App;
