import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { AppConstants } from 'src/app/modules/AppConstants';
import { ImageType } from 'src/app/modules/ImageType.enum';
import { ImageDTO } from 'src/app/modules/ImageDTO';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FilecontrollerService {

  backendurl : string;

  constructor(private http : HttpClient) {
    this.backendurl = `${AppConstants.BACKEND_URL}${"file"}`;
   }

   uploadProfileImage(imageDTO : ImageDTO) {
    const url = `${this.backendurl}/${"imageUpload"}`;
    return this.http.post(url,imageDTO,httpOptions);
   }

}
