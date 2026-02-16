
export interface VideoMetadata {
  titles: string[];
  hashtags: string[];
  description: string;
  bestTime: string;
  targetAudience: string;
  keywords: string[];
  engagementTips: string[];
}

export interface AnalysisState {
  isAnalyzing: boolean;
  result: VideoMetadata | null;
  error: string | null;
}

export enum ContentNiche {
  TECH_REVIEW = 'Android Tech Review',
  GAMING = 'Android Gaming',
  TUTORIAL = 'Android How-To/Tutorial',
  APP_SHOWCASE = 'App Showcase',
  NEWS = 'Android News/Updates'
}
