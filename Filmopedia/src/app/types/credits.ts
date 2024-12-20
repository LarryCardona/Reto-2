export interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string; 
  profile_path: string | null;
}

export interface CreditsDto {
  cast: Actor[];  
  crew: Crew[];   
}
