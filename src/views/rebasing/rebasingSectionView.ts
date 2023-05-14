import { View } from '../general/view';
import { UnclickableTextView } from '../general/textView';
import { LineBreakView } from '../general/lineBreakView';
import { CommitItemView } from '../commits/commitSectionView';
import { MagitRebasingState } from '../../models/magitRebasingState';
import { MagitCommitSummary } from '../../models/magitCommit';

export class RebasingSectionView extends View {
  isFoldable = true;

  get id() { return 'Rebasing'; }

  constructor(rebasingState: MagitRebasingState) {
    super();
    this.subViews = [
      new UnclickableTextView(`Rebasing ${rebasingState.origBranchName} onto ${rebasingState.onto.name}`),
      ...rebasingState.upcomingCommits.map(c => new CommitItemView(MagitCommitSummary.fromCommit(c), 'pick')),
      new CommitItemView(MagitCommitSummary.fromCommit(rebasingState.currentCommit), 'join'),
      ...rebasingState.doneCommits.map(c => new CommitItemView(MagitCommitSummary.fromCommit(c), 'done')),
      new CommitItemView(MagitCommitSummary.fromCommit(rebasingState.onto.commitDetails), 'onto'),
      new LineBreakView()
    ];
  }
}