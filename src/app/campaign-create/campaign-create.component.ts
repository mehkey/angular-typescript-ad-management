

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from './campaign.service';
import { Campaign } from './campaign.model';
import { AdGroup } from './campaign.model';
import { Ad } from './campaign.model';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.css']
})
export class CampaignCreateComponent implements OnInit {

  campaign: Campaign = {
    campaignId: 0,
    name: '',
    start_date: null,
    end_date: null,
    budget: null,
    advertiser_id: null,
    status: '',
    ad_groups: []
  };
  campaignId: number = 0;
  
  adGroup: AdGroup = {
    name: '',
    targeting_criteria: '',
    ads: []
  };
  ad: Ad = {
    title: '',
    image_url: '',
    destination_url: ''
  };

  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.campaignId = params['id'];
      if (this.campaignId) {
        this.getCampaign(this.campaignId);
      }
    });
  }

  getCampaign(id: number): void {
    this.campaignService.getCampaign(id).subscribe(
      response => {
        this.campaign = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  addAdGroup(): void {
    this.campaign.ad_groups.push(this.adGroup);
    this.adGroup = {
      name: '',
      targeting_criteria: '',
      ads: []
    };
  }

  removeAdGroup(adGroup: AdGroup): void {
    this.campaign.ad_groups = this.campaign.ad_groups.filter(ag => ag !== adGroup);
  }

  addAd(adGroup: AdGroup): void {
    adGroup.ads.push(this.ad);
    this.ad = {
      title: '',
      image_url: '',
      destination_url: ''
    };
  }

  removeAd(adGroup: AdGroup, ad: Ad): void {
    adGroup.ads = adGroup.ads.filter(a => a !== ad);
  }

  onSubmit(): void {
    if (this.campaignId) {
      this.campaignService.createCampaign(this.campaign).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.campaignService.createCampaign(this.campaign).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}


/*import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from './campaign.service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.css']
})




export class CampaignCreateComponent {
  campaignForm: FormGroup;
  adForm: FormGroup;
  adGroupForm: FormGroup;

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

  constructor(private fb: FormBuilder, private campaignService: CampaignService) {
    
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

    this.adForm = this.fb.group({
      title: ['', Validators.required],
      image_url: ['', Validators.required],
      destination_url: ['', Validators.required]
    });

    this.adGroupForm = this.fb.group({
      name: ['', Validators.required],
      targeting_criteria: ['', Validators.required],
      ads: this.fb.array([this.adForm])
    });

    this.campaignForm = this.fb.group({
      name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      budget: ['', Validators.required],
      advertiser_id: ['', Validators.required],
      status: ['draft', Validators.required],
      ad_groups: this.fb.array([this.adGroupForm])
    });

  }

  addAdGroup() {
    const newAdGroup = {
      name: '',
      targeting_criteria: '',
      ads: []
    };
    this.adGroups.push(newAdGroup);
  }

  createAdGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      targeting_criteria: ['', Validators.required],
      ads: this.fb.array([this.createAd()])
    });
  }

  createAd(): FormGroup {
    return this.fb.group({
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