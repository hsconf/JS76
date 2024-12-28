import NavBar from "./components/NavBar/NavBar.tsx";
import {Container} from "@mui/material";
import Chat from "./containers/Chat/Chat.tsx";

const App = () => {
    return (
        <>
            <header style={{ margin: "0" }}>
                <NavBar />
            </header>
            <Container component="main">
                <Chat />
            </Container>
        </>
    );
};

export default App;
