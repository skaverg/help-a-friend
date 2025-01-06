import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: any;

  constructor(private http: HttpClient) { }

  async loadConfig(): Promise<any> {
    try {
      this.config = await this.http.get('/assets/configuration.json').toPromise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  get(key: string): any {
    return this.config ? this.config[key] : null;
  }
}
