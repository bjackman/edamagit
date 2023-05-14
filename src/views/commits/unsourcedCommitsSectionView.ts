import { View } from '../general/view';
import { Section, SectionHeaderView } from '../general/sectionHeader';
import { UpstreamRef, Ref } from '../../typings/git';
import { LineBreakView } from '../general/lineBreakView';
import { CommitItemView } from './commitSectionView';
import { MagitCommitSummary } from '../../models/magitCommit';

export class UnsourcedCommitSectionView extends View {
  isFoldable = true;

  static maxEntries = 256;

  get id() { return this.section.toString(); }

  constructor(private section: Section, upstream: UpstreamRef, commits: MagitCommitSummary[], refs: Ref[]) {
    super();
    let truncated = false;
    if (commits.length > UnsourcedCommitSectionView.maxEntries) {
      commits = commits.slice(0, UnsourcedCommitSectionView.maxEntries);
      truncated = true;
    }
    this.subViews = [
      new SectionHeaderView(section, commits.length, `${upstream.remote}/${upstream.name}`, truncated),
      ...commits.map(commit => new CommitItemView(commit, undefined, refs)),
      new LineBreakView()
    ];
  }
}