import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { IRecipe } from '../@types/components/recipe';
import { Minus } from 'lucide-react';

export default function Details() {
  const { slug } = useParams();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<IRecipe | null>(null);

  useEffect(() => {
    const fetchRecettes = async () => {
      try {
        const response = await fetch(
          `https://orecipesapi.onrender.com/api/recipes/${slug}`,
        );

        const data = await response.json();
        setRecipe(data);
        console.log(data);
      } catch (error) {
        setLoading(false);
        setError('Failed to load recipes from API');
        if (error instanceof Error) {
          console.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRecettes();
  }, [slug]);

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Aucune recette trouvée.</p>;

  return (
    <div className="pl-4">
      <div className="relative">
        <img
          className="w-full h-auto rounded-b-3xl"
          src={recipe.thumbnail}
          alt={recipe.title}
        />
        <div className="absolute bottom-10 w-full bg-black/50 text-white text-center p-4">
          <h1 className="text-4xl font-semibold">{recipe.title}</h1>
          <span className="text-sm">
            {recipe.author} - {recipe.difficulty}
          </span>
        </div>
      </div>
      <div className="pt-4">
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id} className="mb-4">
              <div>
                <span className="bg-sky-600 p-2 rounded-md text-stone-50 text-xl">
                  {ingredient.quantity} {ingredient.unit}
                </span>{' '}
                <span className="pl-4 text-2xl">{ingredient.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-18 bg-gray-300 rounded-t-3xl pt-4 pb-4">
        {recipe.instructions.map((instruction) => (
          <div key={instruction} className="flex items-center pl-4">
            <Minus color="#537bca" size={30} />
            <span className="pl-4 p-1  text-xl" key={recipe.id}>
              {' '}
              {instruction}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
