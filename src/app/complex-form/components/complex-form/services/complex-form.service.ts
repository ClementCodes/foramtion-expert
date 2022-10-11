import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, delay, catchError, of, map } from "rxjs";
import { merge } from "rxjs/internal/operators/merge";
import { environment } from "src/environments/environment";
import { ComplexFormValue } from "../models/complex-form-value.model";

@Injectable()
export class ComplexFormService {
    constructor(private http: HttpClient) { }

    saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
        return this.http.post(`${environment.apiUrl}/users`, formValue).pipe(
            map(value => true),
            delay(1000),
            catchError(() => of(false).pipe(
                delay(1000)
            ))
        );
    }
}