import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {LanguageI} from '../models/language.model';
import {LanguageService} from '../services/language.service';
import {AddEntryService} from '../services/add-entry.service';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {

  public languages: LanguageI[];
  public equivalentLanguages: LanguageI[];
  public languageSelected: boolean = false;

  public originatingWordInputField: string;
  public equivalentWordInputField: string;
  public languageNameInputField: string;

  private selectedOriginatingLanguage: string;
  private selectedEquivalentLanguage: string;

  constructor(private modalService: NgbModal, private languageService: LanguageService, private addEntryService: AddEntryService) {}

  ngOnInit(): void {
    this.languageService.getAllLanguages().then(data => {
      this.languages = data;
    });
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  setSelectedLanguage(value: string): void {
    this.selectedOriginatingLanguage = value;
    this.languageSelected = true;
    this.equivalentLanguages = this.languages.filter(function(filteredLanguage) {
      // @ts-ignore
      return filteredLanguage.languageName != value;
    })
    this.selectedEquivalentLanguage = this.equivalentLanguages[0].languageName;
  }

  setEquivalentLanguage(value: string): void {
    this.selectedEquivalentLanguage = value;
  }

  addWordToDictionary(ngForm: NgForm): void {
    if (ngForm.valid && this.selectedOriginatingLanguage != null && this.selectedEquivalentLanguage != null) {
      let dictionaryEntry = {
        id: 0,
        word: ngForm.value["originatingWordInputField"].toLowerCase(),
        equivalent: ngForm.value["equivalentWordInputField"].toLowerCase(),
        originatingLanguage: this.languageService.getLanguageObjectByLanguageName(this.selectedOriginatingLanguage),
        equivalentLanguage: this.languageService.getLanguageObjectByLanguageName(this.selectedEquivalentLanguage)
      }
      this.addEntryService.makePostRequestNewDictionaryEntry(dictionaryEntry).catch(catchError).then(r => {
        this.modalService.dismissAll()
        this.selectedEquivalentLanguage = null;
        window.location.reload();
      });
    } else {
      alert("Please fill all the fields")
    }
  }

  addLanguageToDatabase(ngForm: NgForm): void {
    if (ngForm.valid && ngForm.value["languageNameInputField"] != "") {
      if (!this.languageService.languageAlreadyExists(ngForm.value["languageNameInputField"])) {
        this.addEntryService.makePostRequestNewLanguage({id: 0, languageName: this.languageService.capitalizeLanguage(ngForm.value["languageNameInputField"].toLowerCase())}).then(res => {
          this.modalService.dismissAll();
          window.location.reload();
        })
      } else {
        alert("Language already exists")
      }
    } else {
      alert("Please fill the field")
    }
  }

}
