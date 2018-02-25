import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule  }    from '@angular/common/http';


import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';

import { NoteService } from './note.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { ImportedNotesComponent } from './imported-notes/imported-notes.component';
import { AppRoutingModule } from './app-routing.module';


import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { DialogOverview } from './dialogoverview/dialogoverview.component';




@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    MessagesComponent,
    ImportedNotesComponent,
	DialogOverview
  ],
  entryComponents: [
	DialogOverview
	],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
	FormsModule,
	HttpClientModule,
	AppRoutingModule,
	MatDialogModule

	
  ],
  providers: [NoteService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
