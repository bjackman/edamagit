import { View } from '../general/view';
import { LineBreakView } from '../general/lineBreakView';
import { MagitCherryPickingState } from '../../models/magitCherryPickingState';
import { SectionHeaderView, Section } from '../general/sectionHeader';
import { Commit } from '../../typings/git';
import { CommitItemView } from '../commits/commitSectionView';
import { MagitCommitSummary } from '../../models/magitCommit';

export class CherryPickingSectionView extends View {
  isFoldable = true;

  get id() { return 'CherryPicking'; }

  constructor(cherryPickingState: MagitCherryPickingState, log: Commit[]) {
    super();

    const doneCommits: Commit[] = [];

    for (const commit of log) {
      if (commit.hash === cherryPickingState.originalHead.hash) {
        break;
      }
      doneCommits.push(commit);
    }

    this.subViews = [
      new SectionHeaderView(Section.CherryPicking),
      ...cherryPickingState.upcomingCommits.map(commit => new CommitItemView(MagitCommitSummary.fromCommit(commit), 'pick')),
      new CommitItemView(MagitCommitSummary.fromCommit(cherryPickingState.currentCommit), 'join'),
      ...doneCommits.map(commit => new CommitItemView(MagitCommitSummary.fromCommit(commit), 'done')),
      new CommitItemView(MagitCommitSummary.fromCommit(cherryPickingState.originalHead), 'onto'),
      new LineBreakView()
    ];
  }
}