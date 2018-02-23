import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NoteData } from '../NoteData';
import { NoteService } from '../note.service';
import { Location } from '@angular/common';
import {URLSearchParams} from "@angular/http";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  needToAdd: boolean = true;
  tempNote: string;
  editingMode: boolean = false;
  tempDate: Date;
  
  notes: NoteData[];

  constructor(private noteService: NoteService, private renderer: Renderer2) { }
  
  getNotes(): void {
	this.noteService.getNotes()
      .subscribe(notes => this.notes = notes);
  }
  
  
  addNewNote(): void {
	if (this.tempNote.trim().length) {
	
	
	//this.notes.push(new NoteData(this.tempNote));	
		
	// отправляем запись на сервер
	this.noteService.addOnServer(new NoteData(this.tempNote))
	// добавляем запись в текущий массив 'notes'
	.subscribe(saved_note => {
	//console.log(saved_note._id);
	//console.log(saved_note.state);
	this.notes.push(saved_note);
	});	
	
	this.tempNote = '';
	}
	
	this.needToAdd = !this.needToAdd;
	
  }
  
	saveChanges(note: NoteData, editedHeading: string): void {
		note.heading = editedHeading;
		note.editing = false;
		
		this.noteService.saveOnServer(note)
		.subscribe(status => {
			
			if(status != 'OK')
			{
				console.log("уууопс =(");
			}
			else
			{
				console.log("eeeee =)");
			}
			
		});	
	}
  
	showAddDiv(): void {
		this.needToAdd = !this.needToAdd;  
	}
  
	editNote(note: NoteData) {
		note.editing = true;
	}
	
	cancelEditingNote(note: NoteData): void {
		note.editing = false;
	}
	
	stopEditing(note: NoteData, editedHeading: string): void {
		note.heading = editedHeading;
		note.editing = false;
	}
	
	deleteNote(note: NoteData): void {
		this.noteService.deleteNote(note._id)
		.subscribe(status => {
			this.notes.splice(this.notes.indexOf(note), 1);
		});			
		
		
		/*
		status =>{
			// условие видимо какое-то должно быть, подтверджающее удаление на сервере
			this.notes.splice(this.notes.indexOf(note), 1);
		}
		*/
	}
	
	toggleCompletion(note: NoteData): void {
		note.completed = !note.completed;
	}
	
	tryTodoist(): void {
		/*this.noteService.testAuth()
		  .subscribe(status => {
				console.log(status);
			});	
		*/
		window.location.href='https://todoist.com/oauth/authorize?client_id=5b2714d62ded4a8dbc11cd22cdb5cb87&scope=data:read&state=lunartemple2112&redirect_uri=https://asptodo-2049.herokuapp.com/';
	}

	ngOnInit() {
		/*let global = this.renderer.listen('document', 'click', (evt) => {
		  console.log('Clicking the document', evt);
		})
		*/
	
		this.getNotes();

		
	}

}
