import Head from 'next/head';
import Link from 'next/link';
import { getAllRecipes, Recipe } from '../lib/recipes';

type Props = {
  recipes: Recipe[]
}

export default function Home({ recipes }: Props) {
  // build recipe list items
  const recipeItems = recipes.map(recipe => {
    const { recipeId, title, description, profileImg } = recipe;
    return (
      <li className="flex mb-4 space-x-4" key={recipeId}>
        <img src={profileImg} className="h-32 rounded-md" />
        <div>
          <Link href="/recipe/[recipeId]" as={`/recipe/${recipeId}`}>
            <a className="text-xl md:text-2xl font-bold font-lora uppercase">{title}</a>
          </Link>
          <p>{description}</p>
        </div>
      </li>
    )
  });

  return (
    <div className="container font-muli">
      <Head>
        <title>Our Recipes</title>
      </Head>
      <h1 className="text-5xl font-bold font-lora uppercase">Our Recipes</h1>
      <ul>{recipeItems}</ul>
    </div>
  )
}

export async function getStaticProps() {
  const recipes = getAllRecipes();
  return {
    props: {
      recipes
    }
  }
}