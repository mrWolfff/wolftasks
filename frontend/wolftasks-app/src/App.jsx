import './App.css'
import Home from "./pages/Home.jsx";
import { ProjectReloadProvider } from './contexts/ProjectReloadContext.jsx';

function App() {
    return (
        <ProjectReloadProvider>
            <Home/>
        </ProjectReloadProvider>
        
    );
}

export default App;
