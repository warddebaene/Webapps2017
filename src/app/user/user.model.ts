

export class User {
	private _id: string;
	private _name: string;
	private _recipes = new Array<string>();
	private _friends = new Array<User>();
	static fromJSON(json): User {
        const use = new User(  json.name,json._id,json.recipes,  json.friends);
        return use;
    }
    
	constructor(name: string, id?: string, recipes?: string[], friends?: User[]) {
		this._name = name;
		this._id = id;
		this._recipes = recipes;
		this._friends = friends;
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
	get recipes() : string[]{
		return this._recipes;
	}
	set recipes(recipes: string[]){
		this._recipes = recipes;
	}
	get friends() : User[]{
		return this._friends;
	}
	set friends(friends: User[]){
		this._friends = friends;
	}


	
}