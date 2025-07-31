import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import DogBreedsApp from "./components/page/DogBreedsApp";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <main>
                    <Routes>
                        <Route path='/' element={<DogBreedsApp />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
