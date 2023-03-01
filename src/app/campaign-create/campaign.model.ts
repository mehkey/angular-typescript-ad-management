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
    name: string;
    start_date: Date;
    end_date: Date;
    budget: number;
    advertiser_id: number;
    status?: string;
    ad_groups: AdGroup[];
  }
  