import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ExplorePage from './pages/ExplorePage';
import MyDiaryPage from './pages/MyDiaryPage';
import AddRecipePage from './pages/AddRecipePage'; // Cuidado com o A no nome

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/diary" element={<MyDiaryPage />} />
        <Route path="/add" element={<AddRecipePage />} />
      </Routes>
    </Layout>
  );
}

export default App;