import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import BackLink from '@/components/BackLink';
import ChevronRight from '@/components/icons/ChevronRight';
import { getAllRecipes, Recipe } from '@/services/RecipeService';

type Props = {
  recipes: Recipe[];
};

export default function RecipesPage({ recipes }: Props) {
  return (
    <>
      <Head>
        <title>Our Family | Recipes</title>
      </Head>
      <div className="container">
        <BackLink href="/" text="Home" />
        <h1 className="text-5xl font-bold font-lora pb-3">Recipes</h1>
        <ul>
          {recipes.map((recipe) => {
            const { recipeId, title, description, profileImg } = recipe;
            return (
              <li
                key={recipeId}
                className="border-b border-gray-200 py-2 last:border-0"
              >
                <Link href="/recipes/[recipeId]" as={`/recipes/${recipeId}`}>
                  <a className="block">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={profileImg}
                        height={96}
                        width={96}
                        className="rounded-md"
                      />
                      <div className="min-w-0 flex-1 self-start">
                        <p className="text-2xl font-bold font-lora leading-none mb-1">
                          {title}
                        </p>
                        <p className="text-sm">{description}</p>
                      </div>
                      <div>
                        <ChevronRight />
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const recipes = getAllRecipes();
  return {
    props: {
      recipes,
    },
  };
}
