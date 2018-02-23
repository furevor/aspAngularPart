import { Injectable } from '@angular/core';
import { NoteData } from './NoteData';
import { Project } from './Project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class NoteService {
	
  private notesUrl = '/api/tasks';  // URL to web api
  private accessUrl = '/api/access';  // URL to web api
  private importUrl = '/api/import';

  constructor(private messageService: MessageService, private http: HttpClient) { }

	getNotes(): Observable<NoteData[]> {
	  //return this.http.get<NoteData[]>('localhost:4200/api/tasks/5a851af3d071fe03aca92e36');
	  
	  this.messageService.add('Got it!');
	  
	  return this.http.get<NoteData[]>(this.notesUrl);
	  
	  
	  //return of(NOTES);
	}
	
	getProjectsList(): Observable<Project[]> {
		return this.http.get<Project[]>(this.importUrl);	
	}
	
	getNotesFromTodoist(id: string): Observable<NoteData[]> {
		const url = `${this.importUrl}/${id}`;
		return this.http.get<NoteData[]>(url);
	}
	

	
	save() {
		
    this.messageService.add('saved to server!');
	}
	
	show(mess: string): void {
		this.messageService.add(mess);
	}
	
	addOnServer(note: NoteData) {
		// отправляем данные на сервер...
		
		/*console.log(note._id);
		console.log(note.heading);
		console.log(note.priority);
		console.log(note.state);*/
		
		/*return this.http.post(this.notesUrl, {
		  _id: '',
		  heading: 'barbar',
		  priority: 1,
		  state: false
		});*/
		
		return this.http.post<NoteData>(this.notesUrl, note);
	}
	
	saveOnServer(note: NoteData) {
		const url = `${this.notesUrl}/${note._id}`;
		return this.http.put(url, note, {responseType: 'text'});
	}
	
	deleteNote(id: string) {
		const url = `${this.notesUrl}/${id}`;
		return this.http.delete(url, {responseType: 'text'});
	}
	
	testAuth() {
		return this.http.get('https://todoist.com/oauth/authorize'); /*, 
		{
			client_id: '5b2714d62ded4a8dbc11cd22cdb5cb87',
			scope: data:read,
			redirect_uri: 'https://asptodo-2049.herokuapp.com/'
			
		});
		*/
	}
	
	getAccessToken(code: string) {
		//const url = `${this.accessUrl}/${code}`;
		var body = {
			secretCode: code
		}
		return this.http.post(this.accessUrl, body, {responseType: 'text'});
	}
	
	
	
  
}
