export class NoteData {
	_id: string;
	heading: string;
	priority: number = 0;
	editing: boolean = false;
	completed: boolean = false;
	noteDate: string;
  
	constructor(heading: String) {
		this._id = '';
		this.heading = heading.trim();
		this.priority = 0;		
		this.completed = false;
		this.noteDate = new Date().toISOString().slice(0,10);
	}
	

}