import { Ingredient } from './ingredient/ingredient.model';

export class Recipe {
	private _id: string;
	private _name: string;
	private _ingredients = new Array<Ingredient>();
	private _directions = new Array<string>();


	static fromJSON(json): Recipe {
        const rec = new Recipe(json.name, json.ingredients, json.directions);
        rec._id = json._id;
        return rec;
    }
    
	constructor(name: string, ingredients?: Ingredient[], directions?: string[], id?: string) {
		this._name = name;
		this._ingredients = ingredients || new Array();
		this._directions = directions || new Array();
		this._id = id;
	}
	get id() : string{
		return this._id;
	}

	get name() : string{
		return this._name;
	}
	set name(name: string){
		this._name = name;
	}
	get ingredients() : Ingredient[]{
		return this._ingredients;
	}

	addIngredient(ing: Ingredient) {
		this._ingredients.push(ing);
	}

	toJSON() {
		return {
			name: this._name,
			ingredients: this._ingredients,
			directions: this._directions	
		}
	}

}