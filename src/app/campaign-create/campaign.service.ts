import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from './campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl =  'localhost:8000/campaigns'//'https://example.com/api/campaigns';

  constructor(private http: HttpClient) { }

  createCampaign(campaignData: Campaign): Observable<any> {
    return this.http.post<any>(this.apiUrl, campaignData);
  }
}
