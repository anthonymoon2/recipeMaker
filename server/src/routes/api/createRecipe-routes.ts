import express from 'express';
import { type Request, type Response } from 'express';
import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import dotenv from 'dotenv';
//import { Recipe } from '../../models/recipe.js';

dotenv.config();

const router = express.Router();

// Get the OpenAI API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;
let model: OpenAI;

if (apiKey) {
    // initialize the OpenAI model 
    model = new OpenAI({temperature: 0, openAIApiKey: apiKey, modelName: 'gpt-3.5-turbo'});
} else {
    console.error('OPENAI_API_KEY is not configured.');
}

// Create a new prompt template for formatting prompts
const promptTemplate = new PromptTemplate({
    // Define the prompt template
    template: "Generate a recipe using only the ingredients provided by the user. The response should be structured as follows: Title: [Recipe Title] Instructions: [Step-by-step instructions using only the provided ingredients] The recipe title should be clear and concise. Instructions should be straightforward and easy to follow. Use only the ingredients provided—no additional items or substitutions. Do not include any introductory or closing statements; only the title and instructions should be provided. Ingredients provided by the user: {ingredients}",
    inputVariables: ["ingredients"],
});

// Format the prompt using the prompt template with the user's ingredients
const formatPrompt = async (ingredients: string): Promise<string> => {
    // Use the prompt template to format the prompt
    return await promptTemplate.format({ ingredients });
};

// Call the OpenAI API to get a response to the formatted prompt
const promptFunc = async (ingredients: string): Promise<{title: string, instructions: string}> => {
    try {
      if (model) {
        // Call the OpenAI API to get a response to the formatted prompt
        const response = await model.invoke(ingredients);

        // Parse the response for title and instructions
        const titleMatch = response.match(/Title:\s*(.*)/);
        const instructionsMatch = response.match(/Instructions:\s*(.*)/s);
    
        const title = titleMatch ? titleMatch[1].trim() : 'Untitled Recipe';
        const instructions = instructionsMatch ? instructionsMatch[1].trim() : 'Instructions not provided';

        console.log("Full response from OpenAI:", title);
        return { title, instructions }
      }
      throw new Error('No OpenAI API key provided. Unable to provide a response.');
    } catch (err) {
      console.error(err);
      throw err;
    }
};


// /api/recipes/
router.post('/', async (req: Request, res: Response) => {
    //const { ingredients, desc, recipeUser} = req.body;
    const { ingredients } = req.body;

    try {
        // create prompt to send to openAI API
        const formattedPrompt: string = await formatPrompt(ingredients);

        const generatedRecipe: any = await promptFunc(formattedPrompt);

        console.log(`RESULT FROM OPEN API title: ${generatedRecipe.title}`);
        console.log(`RESULT FROM OPEN API instructions: ${generatedRecipe.instructions}`);

        // send back generated Recipe to the frontend
        res.json({ title: generatedRecipe.title, instructions: generatedRecipe.instructions });
    } catch (error: unknown) {
        if (error instanceof Error) {
        console.error('Error:', error.message);
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { router as createRecipeRouter };