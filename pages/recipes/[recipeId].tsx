import Head from 'next/head';
import ReactMarkdown from 'react-markdown/with-html';

import { getAllRecipes, getRecipeById, Recipe } from '@/services/RecipeService';
import BackLink from '@/components/BackLink';

type Props = {
  recipe: Recipe;
};

export default function ViewRecipePage({ recipe }: Props) {
  const {
    title,
    content,
    description,
    coverImg,
    prepTime,
    cookTime,
    calories,
    servings,
  } = recipe;
  return (
    <div className="container mb-16">
      <Head>
        <title>Recipes | {title}</title>
      </Head>
      <BackLink href="/recipes" text="Recipes" />
      <article>
        <h1 className="text-6xl font-bold font-lora leading-none">{title}</h1>
        <hr className="my-2 border-gray-300"></hr>
        <h2 className="text-3xl italic font-lora leading-none">
          {description}
        </h2>
        <img className="my-5" src={coverImg} />
        <div className="grid grid-cols-3 sm:grid-cols-4 max-w-lg text-center sm:text-left gap-y-3 mb-6">
          <div>
            <label className="uppercase font-bold">Prep Time</label>
            <p>{prepTime}</p>
          </div>
          <div>
            <label className="uppercase font-bold">Cook Time</label>
            <p>{cookTime}</p>
          </div>
          <div>
            <label className="uppercase font-bold">Servings</label>
            <p>{servings}</p>
          </div>
          {calories && (
            <div>
              <label className="uppercase font-bold">Calories</label>
              <p>{calories}</p>
            </div>
          )}
        </div>
        <ReactMarkdown source={content} className="markdown" />
      </article>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const recipeId = params.recipeId;
  const recipe = getRecipeById(recipeId);
  return {
    props: {
      recipe,
    },
  };
}

export async function getStaticPaths() {
  const recipes = getAllRecipes();

  return {
    paths: recipes.map((recipe) => {
      return {
        params: {
          recipeId: recipe.recipeId,
        },
      };
    }),
    fallback: false,
  };
}
