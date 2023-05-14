import { Commit } from '../typings/git';
import GitTextUtils from '../utils/gitTextUtils';

export interface MagitCommit extends Commit { }

// Some minimal information about a commit, that can be gathered without needing
// to call getCommit, which implies a `git show` invocation.
export class MagitCommitSummary {
  // refs: string[] | undefined; // Empty when no refs exist . Undefined when potential refs haven't been retrieved.
  // "subject" is Git terminology for the first line of the commit message.
  constructor(public hash: string, public subject: string) { }

  // Sometimes we have a view that only needs the info from the lite
  // MagitCommitSummary but we already have the full Commit object. for
  // that case we can use this factory.
  static fromCommit(commit: Commit): MagitCommitSummary {
    return new this(commit.hash, GitTextUtils.shortCommitMessage(commit.message));
  }
}