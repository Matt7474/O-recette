import { Link } from 'react-router-dom';
import type { IRecipe } from '../@types/components/recipe';

interface NavbarProps {
  recipes: IRecipe[];
}

export default function Homepage({ recipes = [] }: NavbarProps) {
  console.log(recipes);
  console.log('Recettes dans Homepage :', Array.isArray(recipes), recipes);
  console.log('Recettes dans Homepage :', recipes.length, recipes);

  return (
    <div className="flex flex-col pl-8">
      <div className="">
        <h1 className="text-3xl text-sky-600 font-medium ">
          Les recettes oRecipes
        </h1>
        <p className="mt-6 text-xl font-medium mb-6">Voici nos 6 recettes</p>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="card bg-base-100 shadow-sm">
            <figure>
              <img src={recipe.thumbnail} alt={recipe.title} />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-2xl">{recipe.title}</h2>
              <p className="text-base font-bold text-gray-400">
                Difficulté : {recipe.difficulty}
              </p>
              <div className="card-actions flex justify-center ">
                <Link to={`/recipes/${recipe.slug}`}>
                  <button
                    type="button"
                    className="btn text-stone-50 bg-sky-600 w-110 text-xl"
                  >
                    Voir la recette
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
