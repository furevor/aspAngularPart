import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { Project } from '../Project';
import { Location } from '@angular/common';



@Component({
  selector: 'app-imported-notes',
  templateUrl: './imported-notes.component.html',
  styleUrls: ['./imported-notes.component.css']
})
export class ImportedNotesComponent implements OnInit {

	// здесь будем хранить и выводить
	// список проектов с сайта todoist
	projects: Project[];

	constructor(
	private noteService: NoteService,
	private location: Location
	) { }

	ngOnInit() {	  
		let params = new URLSearchParams(window.location.search);
		let secretCode = params.get('code');
		if(secretCode != null) {
			
			// console.log(this.secretCode);
			// здесь будет вызов API метода для получения токена..!
			
			
			// перед вызовом фунции необходимо так же проверить совпадение secretstring
			this.getAccessToken(secretCode);
			
			// очистим параметры из строки браузера
			//window.location.search = "";
		}

	}
  
	getTodoistAccountAccess(): void {

		// здесь просто осуществим переход на страницу авторизации с указанными заранее параметрами нашего todoist app
		window.location.href='https://todoist.com/oauth/authorize?client_id=5b2714d62ded4a8dbc11cd22cdb5cb87&scope=data:read&state=lunartemple2112&redirect_uri=https://asptodo-2049.herokuapp.com/';
		
		// после редиректа обработаем строку с параметрами в ngOnInit()
	}
	
	// получаем access_token для доступа к данным пользователя
	getAccessToken(code: string): void {
		
		// к сожалению пока не хватает адекватной обработки ошибок...
		this.noteService.getAccessToken(code)
			.subscribe(status => {
				if(status != 'OK')
				{
					console.log("уууопс =( ---> status");
				}
				else
				{
					// если access_token получен, то получим список проектов, вызовом здесь функции...
					// получаем список проектов, пока почему-то не работает получение access_token |
					// пока что он вшит на сервере... =\
					
					this.getProjectsList();
					console.log("eeeee =)");
				}
				
			});
	}
	

	
	/*
	// удалить скорее всего 
	getNotesFromTodoist(): void {
		this.noteService.getNotesFromTodoist()
			.subscribe(status => {
				
				if(status != 'OK')
				{
					console.log(status);
				}
				else
				{
					console.log("eeeee =)");
				}
				
			});
	}		
	*/
	
	getProjectsList(): void {
		this.noteService.getProjectsList()
		  .subscribe(projects => this.projects = projects);
	}
	
	// загружаем все задачи из выбранного проекта
	onSelect(project: Project): void {
		this.noteService.getNotesFromTodoist(project.id)
		  .subscribe(notes => console.log(notes));
	}

}
