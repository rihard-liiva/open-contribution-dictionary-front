import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {LanguageI} from '../models/language.model';
import {LanguageService} from '../services/language.service';
import {AddEntryService} from '../services/add-entry.service';
import {DictionaryEntryI} from '../models/dictionary-entry.model';
import {NgForm} from '@angular/forms';

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
  private selectedOriginatingLanguage: string;
  private selectedEquivalentLanguage: string;

  constructor(private modalService: NgbModal, private languageService: LanguageService, private addEntryService: AddEntryService) {}

  ngOnInit(): void {
    this.languageService.getAllLanguages().then(data => {
      this.languages = data;
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  setSelectedLanguage(value: string) {
    this.selectedOriginatingLanguage = value;
    this.languageSelected = true;
    this.equivalentLanguages = this.languages.filter(function(filteredLanguage) {
      // @ts-ignore
      return filteredLanguage.languageName != value;
    })
    this.selectedEquivalentLanguage = this.equivalentLanguages[0].languageName;
  }

  setEquivalentLanguage(value: string) {
    this.selectedEquivalentLanguage = value;
  }

  addWordToDictionary(ngForm: NgForm) {
    let dictionaryEntry = {
      id: 0,
      word: ngForm.value["originatingWordInputField"].toLowerCase(),
      equivalent: ngForm.value["equivalentWordInputField"].toLowerCase(),
      originatingLanguage: this.languageService.getLanguageObjectByLanguageName(this.selectedOriginatingLanguage),
      equivalentLanguage: this.languageService.getLanguageObjectByLanguageName(this.selectedEquivalentLanguage)
    }
    this.addEntryService.makePostRequestNewDictionaryEntry(dictionaryEntry).then(r => {
      this.modalService.dismissAll()
    });
  }
}
