import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export interface Recipe {
  recipeId: string;
  title: string;
  prepTime: string;
  cookTime: string;
  source: string;
  calories?: number;
  servings: string;
  cuisine?: string;
  description: string;
  profileImg: string;
  coverImg: string;
  content?: string;
}

const recipesDirectory = join(process.cwd(), 'data/recipes');

export function getAllRecipes() {
  const recipePaths = fs.readdirSync(recipesDirectory);
  const recipes = recipePaths.map((recipePath) => {
    const recipeId = recipePath.replace(/\.md$/, '');
    const fullPath = join(recipesDirectory, recipePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    data.recipeId = recipeId;
    return data as Recipe;
  });
  return recipes;
}

export function getRecipeById(recipeId: string) {
  const fullPath = join(recipesDirectory, `${recipeId}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  data.recipeId = recipeId;
  data.content = content;
  return data as Recipe;
}
