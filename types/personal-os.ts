export interface BusinessData {
  mrr: number;
  currentFocus: string;
  microWin: string;
}

export interface MissionData {
  title: string;
  description: string;
  progress: number;
  target: number;
  deadline: string;
}

export interface LocationData {
  city: string;
  timezone: string;
  weather: string;
  mapImageUrl?: string;
}

export interface HealthData {
  sleepScore?: number;
  vo2Max?: number;
  habitTesting: string;
  sleepScoreTarget?: number;
}

export interface BookData {
  title: string;
  author?: string;
  percentComplete: number;
}

export interface CourseData {
  title: string;
  platform: string;
  status: string;
}

export interface PodcastData {
  title: string;
  status: string;
}

export interface NewsletterData {
  title: string;
  platform: string;
  status: string;
}

export interface LearningData {
  currentBook?: BookData;
  courses?: CourseData[];
  podcasts?: PodcastData[];
  newsletters?: NewsletterData[];
  keyTakeaway?: string;
  latestIdea?: string;
}

export interface ContentItem {
  title: string;
  subtitle?: string;
  status: 'Drafting' | 'Editing' | 'Published' | 'Outlining' | 'Idea';
  deadline?: string;
  distributionChecklist?: Array<{ item: string; done: boolean }>;
}

export interface ExperimentData {
  name: string;
  status: 'Running' | 'Paused' | 'Complete' | 'Planning';
  learning: string;
}

export interface EveningAdventureData {
  activity: string;
  rating: number;
  notes?: string;
}

export interface NowPlayingData {
  title: string;
  type: 'song' | 'album' | 'podcast' | 'audiobook' | 'show' | 'movie' | 'YouTube Stream';
  mood?: string;
}

export interface PhotoData {
  url: string;
  caption: string;
}

export interface DailyEntry {
  date: string;
  business: BusinessData;
  mission: MissionData;
  location: LocationData;
  health: HealthData;
  learning: LearningData;
  content: ContentItem[];
  experiments: ExperimentData;
  eveningAdventure: EveningAdventureData;
  nowPlaying: NowPlayingData;
  changelog: string[];
  photo?: PhotoData;
}

export interface PersonalOSData {
  entries: DailyEntry[];
  lastUpdated: string;
} 