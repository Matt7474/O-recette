import { Link } from 'react-router-dom';
import type { IRecipe } from '../../@types/components/recipe';

interface NavbarProps {
  recipes: IRecipe[];
}

export default function Navbar({ recipes = [] }: NavbarProps) {
  console.log(recipes);

  return (
    <>
      <div className="bg-sky-600 min-h-full p-4 pt-4 ">
        <Link
          to={'/'}
          className="text-stone-50 hover:text-sky-800 font-medium text-xl mb-4"
        >
          Accueil
        </Link>
        <ul className="text-stone-50 font-medium text-xl mt-4">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="mb-4">
              <Link
                to={`/recipes/${recipe.slug}`}
                key={recipe.id}
                className="mb-4 hover:text-sky-800"
              >
                {recipe.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
