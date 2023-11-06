import './App.css';
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/navbar";
import BooksListPage from "./books_list/page";
import AddBookPage from './add_book/page';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route exact path="/" element={<BooksListPage />}/>
        <Route exact path="/books" element={<BooksListPage />}/>
        <Route exact path="/book" element={<AddBookPage />}/>
      </Routes>
    </div>
  );
}

export default App;
