export interface Ad {
    title: string;
    image_url: string;
    destination_url: string;
  }
  
  export interface AdGroup {
    name: string;
    targeting_criteria: string;
    ads: Ad[];
  }
  
  export interface Campaign {
    campaignId: number;
    name: string;
    start_date: Date| null;
    end_date: Date| null;
    budget: number| null;
    advertiser_id: number| null;
    status?: string;
    ad_groups: AdGroup[];
  }
  