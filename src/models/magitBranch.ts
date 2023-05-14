import { Branch, Commit, UpstreamRef, Ref } from '../typings/git';
import { MagitCommitSummary } from '../models/magitCommit';

export interface MagitBranch extends Branch {
  commitDetails: Commit;
  upstreamRemote?: MagitUpstreamRef;
  pushRemote?: MagitUpstreamRef;
  tag?: Ref;
}

export interface MagitUpstreamRef extends UpstreamRef {
  commit?: Commit;
  commitsAhead?: MagitCommitSummary[];
  commitsBehind?: MagitCommitSummary[];
  rebase?: boolean;
}