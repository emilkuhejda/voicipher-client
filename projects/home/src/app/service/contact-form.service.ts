import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@home/environment';
import { Observable } from 'rxjs';
import { ContactFormModel } from '../domain/contact-form.model';

@Injectable()
export class ContactFormService {

    public constructor(private httpClient: HttpClient) { }

    public create(contactFormModel: ContactFormModel): Observable<any> {
        return this.httpClient.post(`${environment.webApiUrl}api/v1/contact-form/create/`, contactFormModel);
    }
}
