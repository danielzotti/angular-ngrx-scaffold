import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable()
export class FormService {
  markAsDirtyAllControls = (form: NgForm) => {
    for (const property in form.controls) {
      if (form.controls.hasOwnProperty(property)) {
        form.controls[property].markAsDirty();
      }
    }
  }

  markAsTouchedAllControls = (form: NgForm) => {
    for (const property in form.controls) {
      if (form.controls.hasOwnProperty(property)) {
        form.controls[property].markAsTouched();
      }
    }
  }

  markAsTouchedAndDirtyAllControls = (form: NgForm) => {
    for (const property in form.controls) {
      if (form.controls.hasOwnProperty(property)) {
        form.controls[property].markAsTouched();
        form.controls[property].markAsDirty();
      }
    }
  }

  //   public static createMultipleFileForm = (data: any, existentFiles: Array<IFileManagerFile>, newFiles: Array<IFileManagerFile>): FormData => {
  //     const formData: FormData = new FormData();

  //     try {
  //       //Payload
  //       const payload = JSON.stringify(data);
  //       formData.append(EntityType.FormDataPayload, payload);

  //       //File già esistenti
  //       let existentFileIds: Array<number> = [];
  //       if (existentFiles && existentFiles.length) {
  //         existentFileIds = existentFiles.map(f => f.id);
  //       }
  //       formData.append(EntityType.FormDataExistentFileIds, existentFileIds.join());

  //       //File nuovi
  //       if (newFiles && newFiles.length > 0) {
  //         for (let i: number = 0; i < newFiles.length; i++) {
  //           formData.append("file" + i, newFiles[i].browserFile);
  //         }
  //       }

  //       return formData;
  //     }
  //     catch (ex) {
  //       console.log("[FormHelper] Errore parsing data", ex);
  //       return null;
  //     }
  //   };
}
