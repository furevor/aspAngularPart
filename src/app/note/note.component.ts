import {Component, OnInit, Renderer2, ViewChild, Inject} from '@angular/core';
import {NoteData} from '../NoteData';
import {NoteService} from '../note.service';
import {Location} from '@angular/common';
import {URLSearchParams} from "@angular/http";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogOverview} from '../dialogoverview/dialogoverview.component';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  needToAdd: boolean = true;
  tempNote: string;

  // основной массив для хранения задач
  notes: NoteData[];

  constructor(private noteService: NoteService, private renderer: Renderer2, public dialog: MatDialog) {
  }

  openDialog(note: NoteData): void {
    let dialogRef = this.dialog.open(DialogOverview, {
      width: '250px',
      data: {name: this.tempNote, animal: this.tempNote}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.deleteNote(note);

    });
  }

  getNotes(): void {
    this.noteService.getNotes()
      .subscribe(notes => this.notes = notes);
  }

  onAdded(): void {
    this.getNotes();
  }

  onChange(updatedNote: NoteData, editedHeading: string) {
    this.saveChanges(updatedNote, editedHeading);
  }

  dateChanged(updatedNote: NoteData, editedHeading: string) {

    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
    var other = new Date(updatedNote.noteDate).valueOf();

    var A = new Date().toISOString().slice(0, 10);
    console.log(A.valueOf());

    if (other < today - 86400000) { // 24*60*60*1000
      // раньше чем вчера

      updatedNote.noteDate = new Date().toISOString().slice(0, 10);
      // мне очень стыдно за этот костыль, но лучшего решения я не нашёл
      // нужно чуть больше опыта в angular...
      this.getNotes();

    } else if (other < today) {
      // вчера

      updatedNote.noteDate = new Date().toISOString().slice(0, 10);

      // мне очень стыдно за этот костыль, но лучшего решения я не нашёл
      // нужно чуть больше опыта в angular...
      this.getNotes();


    } else {
      // сегодня или потом
    }

    this.saveChanges(updatedNote, updatedNote.heading);
  }

  // сохраняем задачу на сервере и в массиве notes
  addNewNote(): void {
    if (this.tempNote.trim().length) {

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

  // Я честно не понимаю почему этот метод не работает, точнее не обновляет представление... Догадываюсь конечно, но..
  updateNote(note: NoteData): void {

    this.noteService.updateNote(note._id)
      .subscribe(note => {
        // мы же по ID ищем! Точно должна найтись только одна запись!
        this.notes.filter(x => x._id === note._id)[0] = note;
        console.log(note);
      });
  }

  // сохранить измененную задачу на сервере
  saveChanges(note: NoteData, editedHeading: string): void {
    note.heading = editedHeading;
    note.editing = false;

    this.noteService.saveOnServer(note)
      .subscribe(status => {

        if (status != 'OK') {
          console.log("уууопс =(");
        }
        else {
          console.log("eeeee =)");
        }

      });
  }

  showAddDiv(): void {
    this.needToAdd = !this.needToAdd;
  }

  // функция для установки флага редактирования задачи
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

  }

  // метод для завершения заметки
  toggleCompletion(note: NoteData): void {
    note.completed = !note.completed;
    this.saveChanges(note, note.heading);
  }

  ngOnInit() {

    // загрузим заметки из удалённой базы данных
    this.getNotes();


  }

}


