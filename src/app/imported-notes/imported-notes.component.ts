import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {NoteService} from '../note.service';
import {Project} from '../Project';
import {Location} from '@angular/common';
import {NoteData} from '../NoteData';


@Component({
  selector: 'app-imported-notes',
  templateUrl: './imported-notes.component.html',
  styleUrls: ['./imported-notes.component.css']
})
export class ImportedNotesComponent implements OnInit {


  @Output() onAdded = new EventEmitter();

  // здесь будем хранить и выводить
  // список проектов с сайта todoist
  projects: Project[];

  constructor(private noteService: NoteService,
              private location: Location) {
  }

  ngOnInit() {

    // получаем строку параметров из адресной строки, ищем значение параметра code
    let params = new URLSearchParams(window.location.search);
    let secretCode = params.get('code');
    if (secretCode != null) {

      this.getAccessToken(secretCode);
      // очистим параметры из строки браузера
      //window.location.search = "";
    }

  }

  getTodoistAccountAccess(): void {

    // здесь просто осуществим переход на страницу авторизации с указанными заранее параметрами нашего todoist app
    window.location.href = 'https://todoist.com/oauth/authorize?client_id=5b2714d62ded4a8dbc11cd22cdb5cb87&scope=data:read&state=lunartemple2112&redirect_uri=https://asptodo-2049.herokuapp.com/';
    // после редиректа обработаем строку с параметрами в ngOnInit()
  }
  
  clearServerAccess(): void {
	  this.projects = undefined;
	  this.noteService.clearServerAccess()
	    .subscribe(status => {
        if (status != 'OK') {
          console.log('уууопс =( ---> ' + status);
        }
        else {
          console.log("eeeee =)");
        }

      });
  }

  // получаем access_token для доступа к данным пользователя
  getAccessToken(code: string): void {

    this.noteService.getAccessToken(code)
      .subscribe(status => {
        if (status != 'OK') {
          console.log('уууопс =( ---> ' + status);
        }
        else {
          // если access_token получен, то получим список проектов
          this.getProjectsList();
          console.log("eeeee =)");
        }

      });
  }

  // получить список проектов с сервера
  getProjectsList(): void {
    this.noteService.getProjectsList()
      .subscribe(projects => this.projects = projects);
  }

  // загружаем все задачи из выбранного проекта
  onSelect(project: Project): void {
    this.noteService.getNotesFromTodoist(project.id)
      .subscribe(notes => {

        if (notes.length > 0) {
          notes.forEach(function (item, i, notes) {
            item.noteDate = new Date().toISOString().slice(0, 10);
          });

          this.noteService.saveNotesOnServer(notes)
            .subscribe(notes => {
              // вызовем событие, чтобы note.component поймал его и обновил данные с сервера
              this.onAdded.emit();
            });
        }
      });
  }

}
