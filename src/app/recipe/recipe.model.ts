import { Ingredient } from './ingredient/ingredient.model';

export class Recipe {
	private _id: string;
	private _name: string;
	private _ingredients = new Array<Ingredient>();
	private _directions :string;
	private _duration : string;
	private _likes : number;
	private _allergies : string;
	private _creator : string;

	static fromJSON(json): Recipe {
        const rec = new Recipe( json.name, json.duration,json.allergies,  json.directions,json.creator,json.likes,json.ingredients,json._id);
        return rec;
    }
    
	constructor(name: string, duration: string, allergies: string, directions?: string, creator?: string,likes?: number, ingredients?: Ingredient[], id?: string ) {
		this._name = name;
		this._duration = duration;
		this._allergies = allergies;
		this._ingredients = ingredients || new Array();
		this._directions = directions;
		this._id = id;
		this._likes = likes;
		this._creator = creator;
	}
	get id() : string{
		return this._id;
	}
	set id(id: string){
		this._id = id;
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

	get directions() : string{
		return this._directions;
	}
	set directions(directions: string){
		this._directions = directions;
	}
	get duration() : string{
		return this._duration;
	}
	set duration(duration: string){
		this._duration = duration;
	}
	get likes() : number{
		return this._likes;
	}
	set likes(likes: number){
		this._likes= likes;
	}
	get allergies() : string{
		return this._allergies;
	}
	set allergies(allergies: string){
		this._allergies = allergies;
	}
	get creator() : string{
		return this._creator;
	}
	set creator(creator: string){
		this._creator = creator;
	}

	toJSON() {
		return {
			name: this._name,
			duration: this._duration,
			allergies: this._allergies,
			ingredients: this._ingredients,
			directions: this._directions,
			creator: this._creator,
			likes: this._likes,	
		}
	}

}