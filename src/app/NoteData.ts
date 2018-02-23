export class NoteData {
	_id: string;
	heading: string;
	priority: number = 0;
	state: boolean = false;
	// вспомогательное свойство, в базу не отправляется
	editing: boolean = false;
	completed: boolean = false;
  
	constructor(heading: String) {
		this._id = '';
		this.heading = heading.trim();
		this.priority = 0;		
		this.state = false;
		this.completed = false;
	}
}