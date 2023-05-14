import { View } from '../general/view';
import { LineBreakView } from '../general/lineBreakView';
import { MagitCherryPickingState } from '../../models/magitCherryPickingState';
import { SectionHeaderView, Section } from '../general/sectionHeader';
import { Commit } from '../../typings/git';
import { CommitItemView } from '../commits/commitSectionView';
import { MagitRevertingState } from '../../models/magitRevertingState';
import { MagitCommitSummary } from '../../models/magitCommit';

export class RevertingSectionView extends View {
  isFoldable = true;

  get id() { return 'Reverting'; }

  constructor(revertingState: MagitRevertingState, log: Commit[]) {
    super();

    const doneCommits: Commit[] = [];

    for (const commit of log) {
      if (commit.hash === revertingState.originalHead.hash) {
        break;
      }
      doneCommits.push(commit);
    }

    this.subViews = [
      new SectionHeaderView(Section.Reverting),
      ...revertingState.upcomingCommits.map(commit => new CommitItemView(MagitCommitSummary.fromCommit(commit), 'revert')),
      new CommitItemView(MagitCommitSummary.fromCommit(revertingState.currentCommit), 'join'),
      ...doneCommits.map(commit => new CommitItemView(MagitCommitSummary.fromCommit(commit), 'done')),
      new CommitItemView(MagitCommitSummary.fromCommit(revertingState.originalHead), 'onto'),
      new LineBreakView()
    ];
  }
}