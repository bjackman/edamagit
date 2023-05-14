import { View } from '../general/view';
import { Section, SectionHeaderView } from '../general/sectionHeader';
import { UpstreamRef, Ref } from '../../typings/git';
import { LineBreakView } from '../general/lineBreakView';
import { CommitItemView } from './commitSectionView';
import { MagitCommitSummary } from '../../models/magitCommit';

export class UnsourcedCommitSectionView extends View {
  isFoldable = true;

  get id() { return this.section.toString(); }

  constructor(private section: Section, upstream: UpstreamRef, commits: MagitCommitSummary[], refs: Ref[]) {
    super();
    this.subViews = [
      new SectionHeaderView(section, commits.length, `${upstream.remote}/${upstream.name}`),
      ...commits.map(commit => new CommitItemView(commit, undefined, refs)),
      new LineBreakView()
    ];
  }
}