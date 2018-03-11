import {Injectable} from '@angular/core';
import {NoteData} from './NoteData';
import {Project} from './Project';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class NoteService {

  private notesUrl = '/api/tasks';
  private accessUrl = '/api/import/access';
  private importUrl = '/api/import';
  private clearUrl = '/api/import/clear';

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  // получить все задачи с сервера с базой данных
  getNotes(): Observable<NoteData[]> {
    return this.http.get<NoteData[]>(this.notesUrl);
  }

  // получить список проектов с сервера todoist
  getProjectsList(): Observable<Project[]> {
    return this.http.get<Project[]>(this.importUrl);
  }

  // получить задачи с сервера todoist, по переданному id проекта
  getNotesFromTodoist(id: string): Observable<NoteData[]> {
    const url = `${this.importUrl}/${id}`;
    return this.http.get<NoteData[]>(url);
  }


  show(mess: string): void {
    this.messageService.add(mess);
  }

  // сохранить в базе данных, созданную задачу
  addOnServer(note: NoteData) {
    return this.http.post<NoteData>(this.notesUrl, note);
  }

  // сохранить изменения в задаче
  saveOnServer(note: NoteData) {
    const url = `${this.notesUrl}/${note._id}`;
    return this.http.put(url, note, {responseType: 'text'});
  }


  // метод возвращает с сервера задачу по ID, обновлённую на клиентской стороне
  updateNote(id: string): Observable<NoteData> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<NoteData>(url);
  }

  // удалить заметку на сервере
  deleteNote(id: string) {
    const url = `${this.notesUrl}/${id}`;
    return this.http.delete(url, {responseType: 'text'});
  }


  // сохранить в базу данных массив задач (для импорта из todoist)
  saveNotesOnServer(notes: NoteData[]) {
    return this.http.post<NoteData[]>(this.notesUrl, notes);
  }

  // получить доступ к аккаунту пользователя на todoist
  getAccessToken(code: string) {
    var body = {
      secretCode: code
    }
    return this.http.post(this.accessUrl, body, {responseType: 'text'});
  }
  
  clearServerAccess() {
	  return this.http.get(this.clearUrl);
  }


}
