import { Label } from './label';

export interface PullRequest {
  id: number;
  title: string;
  labels: Label[];
  remoteRef: string;
}
