import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientModule }    from '@angular/common/http';


import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { NoteService } from './note.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { ImportedNotesComponent } from './imported-notes/imported-notes.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    MessagesComponent,
    ImportedNotesComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	HttpClientModule,
	AppRoutingModule
  ],
  providers: [NoteService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
