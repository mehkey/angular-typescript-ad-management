
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from './campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private campaignsUrl = 'http://example.com/campaigns';

  constructor(private http: HttpClient) { }

  // Retrieve all campaigns
  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.campaignsUrl);
  }

  // Retrieve a specific campaign by ID
  getCampaign(id: number): Observable<Campaign> {
    const url = `${this.campaignsUrl}/${id}`;
    return this.http.get<Campaign>(url);
  }

  // Create a new campaign
  createCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(this.campaignsUrl, campaign);
  }

  // Update an existing campaign
  updateCampaign(campaign: Campaign): Observable<Campaign> {
    const url = `${this.campaignsUrl}/${campaign.campaignId}`;
    return this.http.put<Campaign>(url, campaign);
  }

  // Delete a campaign by ID
  deleteCampaign(id: number): Observable<{}> {
    const url = `${this.campaignsUrl}/${id}`;
    return this.http.delete(url);
  }
}

/*

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from './campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl =  'localhost:8000/campaigns' //'https://example.com/api/campaigns';

  constructor(private http: HttpClient) { }

  createCampaign(campaignData: Campaign): Observable<any> {
    return this.http.post<any>(this.apiUrl, campaignData);
  }
}

*/