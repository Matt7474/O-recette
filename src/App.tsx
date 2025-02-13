import { useEffect, useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import type { IRecipe } from './@types/components/recipe';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './pages/Details';

function App() {
  const [recipes, setRecipes] = useState<IRecipe>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecettes = async () => {
      try {
        const response = await fetch(
          'https://orecipesapi.onrender.com/api/recipes',
        );

        const data = await response.json();
        setRecipes(data);
        console.log(data);
      } catch (error) {
        setLoading(false);
        setError('Failed to load recipes from API');
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecettes();
  }, []);

  return (
    <div className="flex m-auto max-w-screen-xl min-h-screen">
      <BrowserRouter>
        <div className="w-1/4">
          <Navbar recipes={recipes} />
        </div>
        <div className="w-3/4">
          <Header />
          {/* <Homepage /> */}
          <Routes>
            <Route path="/" element={<Homepage recipes={recipes} />} />
            <Route path="/recipes/:slug" element={<Details />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
