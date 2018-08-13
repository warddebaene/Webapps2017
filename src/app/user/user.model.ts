

export class User {
	private _id: string;
	private _name: string;
	private _firstname : string;
	private _lastname : string;
	private _birthdate : Date;
	private _recipes = new Array<string>();
	private _friends = new Array<string>();
	static fromJSON(json): User {
        const use = new User(  json.username,json.firstname,json.lastname,json.birthdate,json._id,json.recipes,  json.friends);
        return use;
    }
	constructor(name: string,firstname: string,lastname: string,birthdate: Date, id?: string, recipes?: string[], friends?: string[]) {
		this._name = name;
		this._firstname = firstname;
		this._lastname = lastname;
		this._birthdate = birthdate;
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
	get firstname() : string{
		return this._firstname;
	}
	set firstname(firstname: string){
		this._firstname = firstname;
	}
	get lastname() : string{
		return this._lastname;
	}
	set lastname(lastname: string){
		this._lastname = lastname;
	}
	get birthdate() : Date{
		return this._birthdate;
	}
	set birthdate(birthdate: Date){
		this._birthdate = birthdate;
	}
	get recipes() : string[]{
		return this._recipes;
	}
	set recipes(recipes: string[]){
		this._recipes = recipes;
	}
	get friends() : string[]{
		return this._friends;
	}
	set friends(friends: string[]){
		this._friends = friends;
	}
	toJSON() {
		return {
			id: this._id,
			username: this._name,
			firstname: this._firstname,
			lastname: this._lastname,
			birthdate: this._birthdate,
			recipes: this._birthdate,
			friends: this._birthdate,
		}
	}

	
}