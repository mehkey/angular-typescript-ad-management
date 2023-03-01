
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CampaignService } from './campaign.service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.css']
})

export class CampaignCreateComponent {
  campaignForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private campaignService: CampaignService) {
    this.campaignForm = this.formBuilder.group({
      name: '',
      start_date: '',
      end_date: '',
      budget: '',
      advertiser_id: '',
      status: '',
      ad_groups: this.formBuilder.array([
        this.formBuilder.group({
          name: '',
          targeting_criteria: '',
          ads: this.formBuilder.array([
            this.formBuilder.group({
              title: '',
              image_url: '',
              destination_url: ''
            })
          ])
        })
      ])
    });
  }

  onSubmit() {
    const campaignData = this.campaignForm.value;
    this.campaignService.createCampaign(campaignData).subscribe(response => {
      console.log(response);
    });
  }
}


/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CampaignService } from './campaign.service';
import { Campaign } from './campaign.model';

@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.css']
})
export class CampaignCreateComponent implements OnInit {
  campaignForm: FormGroup;
  adGroupForm: FormGroup;
  adForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private campaignService: CampaignService) { }

  ngOnInit() {
    this.campaignForm = this.formBuilder.group({
      name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      budget: ['', Validators.required],
      advertiser_id: ['', Validators.required],
      status: [''],
      ad_groups: this.formBuilder.array([this.createAdGroup()])
    });
  }

  createAdGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      targeting_criteria: ['', Validators.required],
      ads: this.formBuilder.array([this.createAd()])
    });
  }

  createAd(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      image_url: ['', Validators.required],
      destination_url: ['', Validators.required]
    });
  }

  addAdGroup(): void {
    const adGroups = this.campaignForm.get('ad_groups') as FormArray;
    adGroups.push(this.createAdGroup());
  }

  addAd(): void {
    const adGroups = this.campaignForm.get('ad_groups') as FormArray;
    const lastAdGroup = adGroups.controls[adGroups.length - 1] as FormGroup;
    const ads = lastAdGroup.get('ads') as FormArray;
    ads.push(this.createAd());
  }

  onSubmit() {

    const campaignData = this.campaignForm.value;
    this.campaignService.createCampaign(campaignData).subscribe(response => {
      console.log(response);
    });
  }
}

/*
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.css']
})
export class CampaignCreateComponent {
  campaign = {
    name: '',
    start_date: '',
    end_date: '',
    budget: 0,
    advertiser_id: 0,
    status: '',
    ad_groups: [
      {
        name: '',
        targeting_criteria: '',
        ads: [
          {
            title: '',
            image_url: '',
            destination_url: ''
          }
        ]
      }
    ]
  };
  
  constructor(private http: HttpClient) {}

  async createCampaign(): Promise<void> {
  try {
    const campaign = {
      name: this.campaignForm.get('name').value,
      start_date: this.campaignForm.get('start_date').value,
      end_date: this.campaignForm.get('end_date').value,
      budget: this.campaignForm.get('budget').value,
      advertiser_id: this.campaignForm.get('advertiser_id').value,
      status: this.campaignForm.get('status').value,
      ad_groups: [{
        name: this.adGroupForm.get('name').value,
        targeting_criteria: this.adGroupForm.get('targeting_criteria').value,
        ads: [{
          title: this.adForm.get('title').value,
          image_url: this.adForm.get('image_url').value,
          destination_url: this.adForm.get('destination_url').value
        }]
      }]
    };

    const response = await this.http.post('/campaigns', campaign).toPromise();
    console.log('Campaign created successfully:', response);
  } catch (error) {
    console.error('Failed to create campaign:', error);
  }
}
}
*/